/*
*
*
*       FILL IN EACH UNIT TEST BELOW COMPLETELY
*       -----[Keep the tests in the same order!]----
*       (if additional are added, keep them at the very end!)
*/

var chai = require('chai');
var assert = chai.assert;
var ConvertHandler = require('../controllers/convertHandler.js');

var convertHandler = new ConvertHandler();

suite('Unit Tests', function(){
  
  suite('Function convertHandler.getNum(input)', function() {
    
    test('Whole number input', function(done) {
      let input = '32L';
      assert.equal(convertHandler.getNum(input),32);
      done();
    });
    
    test('Decimal Input', function(done) {
      let input = '3.2L';
      assert.approximately(convertHandler.getNum(input),3.2,0.0001);
      done();
    });
    
    test('Fractional Input', function(done) {
      let input = '3/5L';
      assert.approximately(convertHandler.getNum(input),0.6,0.0001);
      done();
    });
    
    test('Fractional Input with Decimal', function(done) {
      let input = '3.2/5.8L';
      assert.approximately(convertHandler.getNum(input),0.5517241379310345, 0.1);
      done();
    });
    
    test('Invalid Input (double fraction)', function(done) {
      let input = '3.2/5.8/1.2L';
      assert.isTrue(isNaN(convertHandler.getNum(input)));
      done();
    });
    
    test('No Numerical Input', function(done) {
      let input = 'L';
      assert.equal(convertHandler.getNum(input),1);
      done();
    });
  });
  
  suite('Function convertHandler.getUnit(input)', function() {
    
    test('For Each Valid Unit Inputs', function(done) {
      var input = ['gal','l','mi','km','lbs','kg','GAL','L','MI','KM','LBS','KG'];

      input.forEach(function(ele) {
        assert.include(input,convertHandler.getUnit(ele),`valid Unit input ${ele}`)
      });
      done();
    });
    
    test('Unknown Unit Input', function(done) {
      var units = ['gal','l','mi','km','lbs','kg','GAL','L','MI','KM','LBS','KG'];
      assert.notInclude(units,convertHandler.getUnit("123xal"),`Unknown Unit input`)
      done();
    });  
    
  });
  
  suite('Function convertHandler.getReturnUnit(initUnit)', function() {
    
    test('For Each Valid Unit Inputs', function(done) {
      var input = ['gal','l','mi','km','lbs','kg'];
      var expect = ['L','gal','km','mi','kg','lbs'];
      input.forEach(function(ele, i) {
        assert.equal(convertHandler.getReturnUnit(ele), expect[i]);
      });
      done();
    });
    
  });  
  
  suite('Function convertHandler.spellOutUnit(unit)', function() {
    
    test('For Each Valid Unit Inputs', function(done) {
      //see above example for hint
      var input = ['gal','l','mi','km','lbs','kg'];
      var expect = ['L','gal','km','mi','kg','lbs'];
      input.forEach(function(ele, i) {
        assert.equal(convertHandler.spellOutUnit(ele), expect[i]);
      });
      done();
    });
    
  });
  
  suite('Function convertHandler.convert(num, unit)', function() {
    
    test('Gal to L', function(done) {
      var input = [5, 'gal'];
      var expected = 18.9271;
      assert.approximately(convertHandler.convert(input[0],input[1]),expected,0.1); //0.1 tolerance
      done();
    });
    
    test('L to Gal', function(done) {
      var input = [5, 'L'];
      var expected = 1.3209;
      assert.approximately(convertHandler.convert(input[0],input[1]),expected,0.1); //0.1 tolerance
      done();
    });
    
    test('Mi to Km', function(done) {
      var input = [5, 'Mi'];
      var expected = 8.0467;
      assert.approximately(convertHandler.convert(input[0],input[1]),expected,0.1); //0.1 tolerance
      done();
    });
    
    test('Km to Mi', function(done) {
      var input = [5, 'Km'];
      var expected = 3.1069;
      assert.approximately(convertHandler.convert(input[0],input[1]),expected,0.1); //0.1 tolerance
      done();
    });

    test('Lbs to Kg', function(done) {
      var input = [5, 'Lbs'];
      var expected = 2.2680;
      assert.approximately(convertHandler.convert(input[0],input[1]),expected,0.1); //0.1 tolerance
      done();
    });
    
    test('Kg to Lbs', function(done) {
      var input = [5, 'Kg'];
      var expected = 11.0231;
      assert.approximately(convertHandler.convert(input[0],input[1]),expected,0.1); //0.1 tolerance
      done();
    });
    
  });

});