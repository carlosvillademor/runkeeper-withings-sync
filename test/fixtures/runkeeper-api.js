'use strict';

var expect = require('chai').expect,
    runkeeper = require('../../app/runkeeper-api');

describe('runkeeper-api', function () {
  it('should retrieve weight feed', function (done) {
    expect(runkeeper.weightFeed().length).to.be.at.least(1);
    done();
  });
});
