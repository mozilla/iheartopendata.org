var signup = require('./signup');
var sheets = require('./sheets');
var boom = require('boom');

var routes = {
  'signup': function(request, reply) {
    var transaction = request.payload;
    const signup_service = Date.now();

    signup(transaction, function(err, payload) {
      if (err) {
        request.log(['error', 'signup'], {
          request_id: request.headers['x-request-id'],
          service: Date.now() - signup_service,
          code: err.code,
          type: err.type,
          param: err.param
        });

        return reply(boom.wrap(err, 500, 'Unable to complete Basket signup'));
      }

      request.log(['signup'], {
        request_id: request.headers['x-request-id'],
        service: Date.now() - signup_service
      });

      reply(payload).code(201);
    });
  },
  'sheets': function(request, reply) {
    var transaction = request.payload;
    const petition_service = Date.now();

    sheets(transaction, function(err, payload) {
      if (err) {
        request.log(['error', 'petition'], {
          request_id: request.headers['x-request-id'],
          service: Date.now() - petition_service,
          code: err.code,
          type: err.type,
          param: err.param
        });

        return reply(boom.wrap(err, 500, 'Unable to complete Sheets petition'));
      }

      request.log(['petition'], {
        request_id: request.headers['x-request-id'],
        service: Date.now() - petition_service
      });

      reply({}).code(201);
    });
  }
};

module.exports = routes;
