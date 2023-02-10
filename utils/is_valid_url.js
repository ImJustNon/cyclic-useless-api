const validUrl = require('valid-url');

module.exports = {
    validURL: (str) =>{
      // return validUrl.isUri(str);
      if(str.length) return true;
      else return false;
    }
}