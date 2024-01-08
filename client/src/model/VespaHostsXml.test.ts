import { VespaHostsXml } from './VespaHostsXml';
import { hostsXml } from './testFixtures/hostsXmlFixtures';

// test('given a hosts.xml the VespaHostsXml object', () => {

// 	const hostsAliases = VespaHostsXml.parseXml(hostsXml);

// 	expect(hostsAliases.hosts.size).toBe(4);

// 	const aliases = hostsAliases.getAliasesForName("vespa-cfg-0.vespa-cfg.default.svc.cluster.local");
// 	expect(aliases).toEqual(['config0', 'container0']);
// });