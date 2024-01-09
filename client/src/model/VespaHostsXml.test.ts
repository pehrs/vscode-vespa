import { VespaHostsXml } from './VespaHostsXml';
import { hostsXml } from './testFixtures/hostsXmlFixtures';
import assert = require('assert');


describe('VespaHostXml', function () {
  describe('given a hosts.xml', function () {
    it('should return valid VespaHostsXml object', function () {
		console.log('given a hosts.xml the VespaHostsXml object');

		const hostsAliases = VespaHostsXml.parseXml(hostsXml);
	
		assert.equal(hostsAliases.hosts.size, 4);
	
		const aliases = hostsAliases.getAliasesForName("vespa-cfg-0.vespa-cfg.default.svc.cluster.local");
		assert.deepEqual(aliases, ['config0', 'container0']);
    });
  });
});
