const validUrl = require('valid-url');

module.exports = {
    validURL: (str) =>{
      return validUrl.isUri(str);
    }
}