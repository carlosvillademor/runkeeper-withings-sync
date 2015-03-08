var expect = require('chai').expect,
    runkeeperWithingsSync = require('..');

describe('runkeeper-withings-sync', function() {
  it('should say hello', function(done) {
    expect(runkeeperWithingsSync()).to.equal('Hello, world');
    done();
  });
});
