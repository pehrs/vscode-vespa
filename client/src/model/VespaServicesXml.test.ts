
import { VespaServicesXml } from './VespaServicesXml';
import { complexServiceXml, largeServiceXml, servicesXmlWith2ContentNodes, servicexXmlWith1Node } from './testFixtures/serviceXmlFixtures';

import { XMLParser } from 'fast-xml-parser';

import assert = require('assert');

describe('VespaServicesXml', function () {
	describe('given a parsed services.xml from a single node cluster', function () {
		it('should return valid VespaServiceXml object', function () {

			const servicesXml = VespaServicesXml.parse(servicexXmlWith1Node);
			assert.equal(servicesXml.adminConfig, undefined);
			assert.equal(servicesXml.containerConfigs[0].containerId, 'text_search');
			assert.equal(servicesXml.containerConfigs[0].nodes.length, 1);
			assert.equal(servicesXml.contentConfig.contentId, "msmarco");

			assert.equal(servicesXml.contentConfig.getAllContentNodes().length, 1);
		});
	});

	describe('given a parsed services.xml from a cluster with 2 content nodes', () => {
		it('should return VespaServiceXml object', function () {
			const servicesXml = VespaServicesXml.parse(servicesXmlWith2ContentNodes);
			// console.log("serviceXml: " + JSON.stringify(servicesXml));
			assert.equal(servicesXml.adminConfig.adminserver.hostalias, 'config0');
			assert.equal(servicesXml.containerConfigs[0].containerId, 'text_search');
			assert.equal(servicesXml.containerConfigs[0].nodes.length, 1);
			assert.equal(servicesXml.contentConfig.contentId, "msmarco");
			assert.equal(servicesXml.contentConfig.getAllContentNodes().length, 2);
		});
	});

	describe('given a complex services.xml', () => {
		it('should return VespaServiceXml object', function () {

			const parser = new XMLParser({
				ignoreAttributes: false,
				attributeNamePrefix: ""
			});

			const serviceXmlObj = parser.parse(complexServiceXml);

			// console.log("serviceXml: " + JSON.stringify(serviceXmlObj));

			const servicesXml = VespaServicesXml.parse(serviceXmlObj);

			assert.equal(servicesXml.adminConfig.adminserver.hostalias, 'config0');

			assert.equal(servicesXml.containerConfigs[0].containerId, 'feed');
			assert.equal(servicesXml.containerConfigs[0].nodes.length, 2);
			assert.equal(servicesXml.containerConfigs[0].documentApi, true);
			assert.equal(servicesXml.containerConfigs[0].searchApi, false);

			assert.equal(servicesXml.containerConfigs[1].containerId, 'query');
			assert.equal(servicesXml.containerConfigs[1].nodes.length, 2);
			assert.equal(servicesXml.containerConfigs[1].documentApi, false);
			assert.equal(servicesXml.containerConfigs[1].searchApi, true);

			assert.equal(servicesXml.contentConfig.contentId, "music");
			assert.equal(servicesXml.contentConfig.getAllContentNodes().length, 3);
		});
	});

	describe('given a large services.xml with content groups', () => {
		it('should return VespaServiceXml object', function () {

			const servicesXml = VespaServicesXml.parseXml(largeServiceXml);

			assert.equal(servicesXml.adminConfig.adminserver.hostalias, 'configa-8wst');

			assert.equal(servicesXml.containerConfigs[0].containerId, 'query');
			assert.equal(servicesXml.containerConfigs[0].nodes.length, 30);
			assert.equal(servicesXml.containerConfigs[0].documentApi, false);
			assert.equal(servicesXml.containerConfigs[0].searchApi, true);

			assert.equal(servicesXml.containerConfigs[1].containerId, 'feed');
			assert.equal(servicesXml.containerConfigs[1].nodes.length, 2);
			assert.equal(servicesXml.containerConfigs[1].documentApi, true);
			assert.equal(servicesXml.containerConfigs[1].searchApi, false);

			assert.equal(servicesXml.contentConfig.contentId, "content");
			assert.equal(servicesXml.contentConfig.nodes, undefined);
			assert.equal(servicesXml.contentConfig.groupConfig.groups.length, 32);
			assert.equal(servicesXml.contentConfig.getAllContentNodes().length, 128);
		});
	});
});