
import { VespaServicesXml } from './VespaServicesXml';
import { servicexXmlWith1Node } from './testFixtures/serviceXmlFixtures';

import { XMLParser } from 'fast-xml-parser';


console.log("Service XML Tests!!!");

// test('given a parsed services.xml from a single node cluster produces the VespaServiceXml object', () => {

// 	const servicesXml = VespaServicesXml.parse(servicexXmlWith1Node);
// 	expect(servicesXml.adminConfig).toBe(undefined);
// 	expect(servicesXml.containerConfigs[0].containerId).toBe('text_search');
// 	expect(servicesXml.containerConfigs[0].nodes.length).toBe(1);
// 	expect(servicesXml.contentConfig.contentId).toBe("msmarco");

// 	expect(servicesXml.contentConfig.getAllContentNodes().length).toBe(1);

// });

// test('given a parsed services.xml from a cluster with 2 content nodes produces the VespaServiceXml object', () => {

// 	const servicesXml = VespaServicesXml.parse(servicesXmlWith2ContentNodes);
// 	// console.log("serviceXml: " + JSON.stringify(servicesXml));
// 	expect(servicesXml.adminConfig.adminserver.hostalias).toBe('config0');
// 	expect(servicesXml.containerConfigs[0].containerId).toBe('text_search');
// 	expect(servicesXml.containerConfigs[0].nodes.length).toBe(1);
// 	expect(servicesXml.contentConfig.contentId).toBe("msmarco");
// 	expect(servicesXml.contentConfig.getAllContentNodes().length).toBe(2);

// });


// test('given a complex services.xml produce the VespaServiceXml object', () => {

// 	const parser = new XMLParser({
// 		ignoreAttributes: false,
// 		attributeNamePrefix: ""
// 	});

// 	const serviceXmlObj = parser.parse(complexServiceXml);

// 	// console.log("serviceXml: " + JSON.stringify(serviceXmlObj));

// 	const servicesXml = VespaServicesXml.parse(serviceXmlObj);


// 	expect(servicesXml.adminConfig.adminserver.hostalias).toBe('config0');

// 	expect(servicesXml.containerConfigs[0].containerId).toBe('feed');
// 	expect(servicesXml.containerConfigs[0].nodes.length).toBe(2);
// 	expect(servicesXml.containerConfigs[0].documentApi).toBe(true);
// 	expect(servicesXml.containerConfigs[0].searchApi).toBe(false);

// 	expect(servicesXml.containerConfigs[1].containerId).toBe('query');
// 	expect(servicesXml.containerConfigs[1].nodes.length).toBe(2);
// 	expect(servicesXml.containerConfigs[1].documentApi).toBe(false);
// 	expect(servicesXml.containerConfigs[1].searchApi).toBe(true);

// 	expect(servicesXml.contentConfig.contentId).toBe("music");
// 	expect(servicesXml.contentConfig.getAllContentNodes().length).toBe(3);

// });


// test('given a large services.xml with content groups produce the VespaServiceXml object', () => {

// 	const servicesXml = VespaServicesXml.parseXml(largeServiceXml);

// 	expect(servicesXml.adminConfig.adminserver.hostalias).toBe('configa-8wst');

// 	expect(servicesXml.containerConfigs[0].containerId).toBe('query');
// 	expect(servicesXml.containerConfigs[0].nodes.length).toBe(30);
// 	expect(servicesXml.containerConfigs[0].documentApi).toBe(false);
// 	expect(servicesXml.containerConfigs[0].searchApi).toBe(true);

// 	expect(servicesXml.containerConfigs[1].containerId).toBe('feed');
// 	expect(servicesXml.containerConfigs[1].nodes.length).toBe(2);
// 	expect(servicesXml.containerConfigs[1].documentApi).toBe(true);
// 	expect(servicesXml.containerConfigs[1].searchApi).toBe(false);

// 	expect(servicesXml.contentConfig.contentId).toBe("content");
// 	expect(servicesXml.contentConfig.nodes).toBe(undefined);
// 	expect(servicesXml.contentConfig.groupConfig.groups.length).toBe(32);
// 	expect(servicesXml.contentConfig.getAllContentNodes().length).toBe(128);

// });