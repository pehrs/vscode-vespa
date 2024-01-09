import assert = require('assert');
import { durationMs } from './utils';


describe('utils', function () {

  describe('calling durationMs() with a duration string "1m 1s"', function () {
    it('should return a duration of 61000 milliseconds', function () {
		const duration = durationMs("1m 1s");
		assert.equal(duration, 61000);
    });
  });

  describe('calling durationMs() with a duration string "1250"', function () {
    it('should return a duration of 1250 milliseconds', function () {
		const duration = durationMs("1250");
		assert.equal(duration, 1250);
    });
  });
});
