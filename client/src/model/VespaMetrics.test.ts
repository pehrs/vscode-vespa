import { VespaV2Metrics } from './VespaMetrics';
import { metrics2ContentNodes } from './testFixtures/metricsFixtures';

import assert = require('assert');

describe('VespaHostXml', function () {
	describe('given a parsed services.xml from a single node cluster', function () {
		it('should return valid VespaServiceXml object', function () {
		});
	});

	describe('given a metric v2 response', () => {
		it('should return valid VespaV2Metrics object', function () {

			const metrics = VespaV2Metrics.parse(metrics2ContentNodes);

			console.log("metrics: ", JSON.stringify(metrics));
	
			// assert.equal(hostsAliases.hosts.size, 4);
		});

	});
});