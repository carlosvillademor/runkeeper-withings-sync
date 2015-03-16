'use strict';
var config = require('./' + (process.env.NODE_ENV || 'development') + '.json');
var request = require('request');
var express = require('express');
var _ = require('lodash');
var app = express();

var options = {
    client_id : "317b9bc279ac43a5bd0ec87e1a7b2f2f",
    client_secret : "e30eaa44f2c247dbbbd8e96c5f4df40e",
    auth_url : "https://runkeeper.com/apps/authorize",
    access_token_url : "https://runkeeper.com/apps/token",
    api_domain : "api.runkeeper.com"
};

var runkeeper = require('runkeeper-js'),
    client = new runkeeper.HealthGraph(options);

var server = app.listen(process.env.PORT || 5000, function() {
  var host = server.address().address
  var port = server.address().port
  console.log('Example app listening at http://%s:%s', host, port)
});

app.get('/newToken', function(req, res) {
  console.log('req.query.code', req.query.code)

  client.getNewToken(req.query.code, function(err, access_token) {
      if(err) { console.log(err); return false; }
      client.access_token = access_token;
      console.log('client.access_token', client.access_token);
      client.profile(function(err, reply) {
          if(err) { console.log(err); }
          console.log(reply);
      });
  });

});

app.get('/authorizationCode', function(req, res) {
  var auth_url = buildUrlParameters({
    client_id: options.client_id,
    response_type: 'code',
    redirect_uri: config.auth_redirect_uri
  }, options.auth_url);
  request(auth_url, function (error, response, body) {
    console.log('response.statusCode', response.statusCode);
    if (!error && response.statusCode == 200) {
      res.send(body);
    }
  });

  function buildUrlParameters(parameters, host) {
    var url = '';
    _.each(parameters, function (key, value) {
        if (value) url += key + '=' + encodeURIComponent(value) + '&';
    });
    return (host || "") + url.slice(0, -1);
  }

});

exports.weightFeed = function weightFeed () {
  console.log('authorization_code', authorization_code);
  return [1];
};
