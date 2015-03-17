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
    api_domain : "api.runkeeper.com",
    redirect_uri: config.auth_redirect_uri
};

var runkeeper = require('runkeeper-js'),
    client = new runkeeper.HealthGraph(options);

var server = app.listen(process.env.PORT || 5000, function() {
  var host = server.address().address
  var port = server.address().port
  console.log('Example app listening at http://%s:%s', host, port)
});

app.get('/authorizationCode', function(req, res) {
  var auth_url = buildUrlParameters({
    client_id: options.client_id,
    response_type: 'code',
    redirect_uri: options.redirect_uri
  }, options.auth_url);

  res.redirect(auth_url);

  function buildUrlParameters(parameters, host) {
    var urlParameters = [];
    _.each(parameters, function (value, key) {
        if (value) urlParameters.push(key + '=' + encodeURIComponent(value));
    });
    return (host || "") + '?' + urlParameters.join('&');
  }

});

app.get('/newToken', function(req, res) {
  client.getNewToken(req.query.code, function(err, access_token) {
      if(err) { console.log('Error while retrieving new token' + err); return false; }
      client.access_token = access_token;
      res.send('OK');
  });

});

app.get('/profile', function(req, res) {
  client.profile(function(err, reply) {
      if(err) { console.log('Error while accesing to profile info' + err); }
      res.send(reply);
  });
});

app.get('/weight', function(req, res) {
  client.apiCall('GET', 'application/vnd.com.runkeeper.NewWeightSetFeed+json', '/weight', function(err, weightFeed){
    console.log('weightFeed', weightFeed);
  });
});

exports.weightFeed = function weightFeed () {
  console.log('authorization_code', authorization_code);
  return [1];
};
