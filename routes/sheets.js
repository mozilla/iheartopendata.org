var request = require("request");
var AWS = require("aws-sdk");
var sqs = new AWS.SQS({
  maxRetries: 15,
  region: process.env.SQS_QUEUE_REGION,
  accessKeyId: process.env.SQS_ACCESS_KEY,
  secretAccessKey: process.env.SQS_SECRET_ACCESS_KEY
});

var petitionRoutes = function(transaction, callback) {
  callback = callback || function() {};
  var formData = {
    "entry.825163439": transaction.firstName,
    "entry.129687116": transaction.lastName,
    "entry.329351653": transaction.email,
    "entry.1319525634": transaction.locale
  };

  if (!process.env.SQS_QUEUE_URL) {
    request({
      method: 'POST',
      url: "https://docs.google.com/a/mozillafoundation.org/forms/d/e/1FAIpQLSffbFtTu4qCC4AvO-dc_0DZqlWz6VVEpWBExrFJqL4t6JBk1A/formResponse",
      form: formData
    }, function(err) {
      callback(err);
    });
  } else {
    sqs.sendMessage({
      MessageBody: JSON.stringify({
        app: "iheartopendata.org",
        event_type: "opendataday-petition-signup",
        timestamp: (new Date()).toISOString(),
        data: formData
      }),
      QueueUrl: process.env.SQS_QUEUE_URL
    }, function(err) {
      callback(err);
    });
  }
};

module.exports = petitionRoutes;
