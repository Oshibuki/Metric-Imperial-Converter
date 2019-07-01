/*
*
*
*       Complete the handler logic below
*       
*       
*/

function ConvertHandler() {
  
  const regExp = /^(((\d+)(\.\d+)?)(\/((\d+)(\.\d+)?))*)?(\w+)$/g;
  
  this.getNum = function(input) {
    var result;
    if(input.split("/").length >2){
      return NaN;
    }
    
    if(regExp.test(input)){
      regExp.lastIndex=0;
      let groups = regExp.exec(input);
      regExp.lastIndex=0;
      let denominator = groups[6],numerator = groups[2];
      denominator = parseFloat(denominator);
      numerator = parseFloat(numerator);

      if(denominator){
        if(denominator!=0){
          result = Math.round(numerator/denominator*10000)/10000
        }else{
          throw "denominator can not be zero!"
        }
      }else{
        if(numerator){
          result = numerator;
        }else{
          result = 1;
        }
      }
    }
    
    return result;
  };
  
  this.getUnit = function(input) {
    var result="invalid";
    var units = ['gal','l','mi','km','lbs','kg','GAL','L','MI','KM','LBS','KG'];
    let unit;

    if(regExp.test(input)){
      regExp.lastIndex=0;
      let groups = regExp.exec(input);
      regExp.lastIndex=0;
      unit = groups[groups.length-1];
    }

    if(units.indexOf(unit)!==-1){
      result = unit;
    }
    return result;
  };
  
  this.getReturnUnit = function(initUnit) {
    var input = ['gal','l','mi','km','lbs','kg'];
    var expect = ['L','gal','km','mi','kg','lbs'];
    var result;
    initUnit = initUnit.toLowerCase();
    if(input.indexOf(initUnit)!==-1){
      result = expect[input.indexOf(initUnit)]
    }else{
      result = ""
    }
    
    return result;
  };

  this.spellOutUnit = function(unit) {
    var input = ['gal','l','mi','km','lbs','kg'];
    var expect = ['L','gal','km','mi','kg','lbs'];
    var result;
    unit = unit.toLowerCase();
    if(input.indexOf(unit)!==-1){
      result = expect[input.indexOf(unit)]
    }else{
      result = ""
    }

    return result;
  };
  
  this.convert = function(initNum, initUnit) {
    const galToL = 3.78541;
    const lbsToKg = 0.453592;
    const miToKm = 1.60934;

    const conversion = {
      'gal':galToL,
      'l': 1/galToL,
      'mi':miToKm,
      'km':1/miToKm,
      'lbs':lbsToKg,
      'kg':1/lbsToKg
    }

    var result= Math.round(conversion[initUnit.toLowerCase()]*initNum*10000)/10000;
    
    return result;
  };
  
  this.getString = function(initNum, initUnit, returnNum, returnUnit) {
    var result;
    result = `${initNum} ${initUnit} converts to ${returnNum} ${returnUnit}`
    return result;
  };
  
}

module.exports = ConvertHandler;
