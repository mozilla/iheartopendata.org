var request = require("request");

var petitionRoutes = function(transaction, callback) {
  var formData = {
    "entry.825163439": transaction.firstName,
    "entry.129687116": transaction.lastName,
    "entry.329351653": transaction.email,
    "entry.581717539": transaction.country,
    "entry.1319525634": transaction.locale
  };
  request({
    method: 'POST',
    url: "https://docs.google.com/a/mozillafoundation.org/forms/d/e/1FAIpQLSffbFtTu4qCC4AvO-dc_0DZqlWz6VVEpWBExrFJqL4t6JBk1A/formResponse",
    form: formData
  }, function(err, payload) {
    if (err) {
      callback(err);
    } else {
      callback(null);
    }
});
};

module.exports = petitionRoutes;
