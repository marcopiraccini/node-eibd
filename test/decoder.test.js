'use strict';

var assert = require('assert'),
    Decoder = require('../lib/decoder.js');

var enc = null;

describe('Decoder', function() {

  before(function() {
    enc = new Decoder();
  });
  describe('DPT1', function() {
    it('should decode DPT1 value 1', function() {
      var data = 65;
      enc.decode(8, data, function(err, type, value) {
        assert.equal(err, null);
        assert.equal(type, 'DPT1');
        assert.equal(value, 1);
      });
    }),
    it('should decode DPT1 value 0', function() {
      var data = 64;
      enc.decode(8, data, function(err, type, value) {
        assert.equal(err, null);
        assert.equal(type, 'DPT1');
        assert.equal(value, 0);
      });
    });
  });

  describe('DPT5', function() {
    it('should decode DPT5 value', function() {
      var buf = new Buffer(1);
      buf.writeUInt8(150, 0);
      enc.decode(9, buf, function(err, type, value) {
        assert.equal(err, null);
        assert.equal(type, 'DPT5');
        assert.equal(value, 150);
      });
    }),
    it('should throw error if buffer wrong lenght', function() {
      var buf = new Buffer(2);
      buf.writeUInt8(150, 0);
      buf.writeUInt8(151, 1);
      enc.decode(9, buf, function(err) {
        assert.equal(err.message, 'Invalid data len for DPT5');
      });
    });
  });

  describe('DPT9', function() {
    it('should decode DPT9 float value - exponent4', function() {
      var buf = new Buffer(2);
      buf.writeUInt8(0xA3, 0);
      buf.writeUInt8(0xB5, 1);
      enc.decode(10, buf, function(err, type, value) {
        assert.equal(err, null);
        assert.equal(type, 'DPT9');
        assert.equal(Math.round(value * 100) / 100, -175.84);
      });
    });
    
    it('should decode DPT9 float value - exponent4', function() {
      var buf = new Buffer(2);
      buf.writeUInt8(0xA5, 0);
      buf.writeUInt8(0x8D, 1);
      enc.decode(10, buf, function(err, type, value) {
        assert.equal(err, null);
        assert.equal(type, 'DPT9');
        assert.equal(Math.round(value * 100) / 100, -100.32);
      });
    });
    
    it('should decode DPT9 float value - exponent4', function() {
      var buf = new Buffer(2);
      buf.writeUInt8(0xA3, 0);
      buf.writeUInt8(0x21, 1);
      enc.decode(10, buf, function(err, type, value) {
        assert.equal(err, null);
        assert.equal(type, 'DPT9');
        assert.equal(Math.round(value * 100) / 100, -199.52);
      });
    });
    
     it('should decode DPT9 float value - exponent6', function() {
      var buf = new Buffer(2);
      buf.writeUInt8(0xB6, 0);
      buf.writeUInt8(0xC7, 1);
      enc.decode(10, buf, function(err, type, value) {
        assert.equal(err, null);
        assert.equal(type, 'DPT9');
        assert.equal(Math.round(value * 100) / 100, -200.32);
      });
    });
    
    it('should decode DPT9 float value - exponent2', function() {
      var buf = new Buffer(2);
      buf.writeUInt8(0x97, 0);
      buf.writeUInt8(0x81, 1);
      enc.decode(10, buf, function(err, type, value) {
        assert.equal(err, null);
        assert.equal(type, 'DPT9');
        assert.equal(Math.round(value * 100) / 100, -5.08);
      });
    });
    
  });
});
