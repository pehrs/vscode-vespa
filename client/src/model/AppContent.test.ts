import { AppContent } from './AppContent';
import { VespaAppId } from './VespaAppId';
import { VespaStatus } from './VespaStatus';


describe('AppContent', function () {
	describe('given localhost cluster', function () {
		it('should return valid list of files', function () {

			// FIXME: This needs to be in a integration test where we start a vespa cluster to test :-)

			// const configEndpoint = "http://localhost:19071";
			// const appContent = new AppContent();
			// appContent.fetchAppDir(configEndpoint, "")
			// 	.then(content => {
			// 		console.log("content: ", content);

			// 		content.map(f => {
			// 			if (f.endsWith("/")) {
			// 				appContent.fetchAppDir(configEndpoint, f)
			// 					.then(content => {
			// 						console.log(f + ", content: ", content);
			// 					});
			// 			} else {
			// 				console.log("FILE: " + f);
			// 			}
			// 		});
			// 	});
		});
	});
});