var hatchet = require("hatchet");
var request = require("request");

var petitionRoutes = function(transaction, callback) {
  callback = callback || function() {};
  var formData = {
    "entry.825163439": transaction.firstName,
    "entry.129687116": transaction.lastName,
    "entry.329351653": transaction.email,
    "entry.1319525634": transaction.locale
  };

  hatchet.send("opendataday-petition-signup", formData, function(err) {
    callback(err);
  });
};

module.exports = petitionRoutes;
