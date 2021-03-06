/*
 * Parser String Helper tests
 */
var assert = require('assert')

var atokParser = require('..')
var options = {}

describe('helpers.string()', function () {
  describe('with false', function () {
      function myParser () {
        atok.string(false)
      }
      var Parser = atokParser.createParser(myParser, 'options')
      var p = new Parser(options)

      it('should ignore it', function (done) {
        function handler (token, idx, type) {
          done( new Error('Should not trigger') )
        }

        p.on('error', done)
        p.on('data', handler)
        p.write('a~b$c ')
        done()
      })
    })

  var Parser = atokParser.createParserFromFile('./parsers/stringHelperParser.js', 'options')

  describe('with a full string', function () {
    var p = new Parser()

    it('should parse the input data', function (done) {
      var matches = 0
      function handler (token, idx, type) {
        switch (type) {
          case 'string':
            assert.equal(token, 'abc')
            done()
          break
          default:
            done( new Error('Unknown type: ' + type) )
        }
      }

      p.on('error', done)
      p.on('data', handler)
      p.write('"abc"')
    })
  })

  describe('with a full string and an escaped quote', function () {
    var p = new Parser()

    it('should parse the input data', function (done) {
      var matches = 0
      function handler (token, idx, type) {
        switch (type) {
          case 'string':
            assert.equal(token, 'a\\"bc')
            done()
          break
          default:
            done( new Error('Unknown type: ' + type) )
        }
      }

      p.on('error', done)
      p.on('data', handler)
      p.write('"a\\"bc"')
    })
  })

  describe('with a full string and an escaped quote with a non standard escape char', function () {
    var p = new Parser({ esc: "~" })

    it('should parse the input data', function (done) {
      var matches = 0
      function handler (token, idx, type) {
        switch (type) {
          case 'string':
            assert.equal(token, 'a~"bc')
            done()
          break
          default:
            done( new Error('Unknown type: ' + type) )
        }
      }

      p.on('error', done)
      p.on('data', handler)
      p.write('"a~"bc"')
    })
  })

  describe('with a split up string', function () {
    var p = new Parser()

    it('should parse the input data', function (done) {
      var matches = 0
      function handler (token, idx, type) {
        switch (type) {
          case 'string':
            assert.equal(token, 'abc')
            done()
          break
          default:
            done( new Error('Unknown type: ' + type) )
        }
      }

      p.on('error', done)
      p.on('data', handler)
      p.write('"ab')
      p.write('c"')
    })
  })

  describe('with a single quoted string', function () {
    var p = new Parser({ start: "'" })

    it('should parse the input data', function (done) {
      var matches = 0
      function handler (token, idx, type) {
        switch (type) {
          case 'string':
            assert.equal(token, 'abc')
            done()
          break
          default:
            done( new Error('Unknown type: ' + type) )
        }
      }

      p.on('error', done)
      p.on('data', handler)
      p.write("'ab")
      p.write("c'")
    })
  })

  describe('with different delimiters string', function () {
    var p = new Parser({ start: '<', end: '>' })

    it('should parse the input data', function (done) {
      var matches = 0
      function handler (token, idx, type) {
        switch (type) {
          case 'string':
            assert.equal(token, 'abc')
            done()
          break
          default:
            done( new Error('Unknown type: ' + type) )
        }
      }

      p.on('error', done)
      p.on('data', handler)
      p.write("<abc>")
    })
  })
})