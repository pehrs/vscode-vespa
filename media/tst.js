
const { time, trace } = require("console");
const fs = require("fs");
const zipkin = require('zipkin');

let absoluteStartTs = 0;

function genId() {
	return "" + Math.random().toString(16).slice(2);
}

// Flatmap all children into a single seqence with relative timestamps.
function parseChildren(parentId, traceChild) {

	let result = [];

	let thisId = genId();
	if ("message" in traceChild) {
		let message = traceChild.message;
		const relativeTimestamp = traceChild.timestamp;
		// Assume string here
		if (relativeTimestamp !== undefined) {
			let myMsg = message;
			if (Array.isArray(message)) {
				myMsg = "dist-key: " + message[0]["distribution-key"];
			}
			result.push({
				id: thisId,
				relativeTimestamp: 1000 * relativeTimestamp,
				duration: 0,
				message: myMsg,
				parentId: parentId,
			});
		}
		if (Array.isArray(message)) {
			// Message array of traces
			for (const msgI in message) {
				const subMsg = message[msgI];
				const start_time = subMsg.start_time;
				const subTraces = subMsg.traces;
				const duration_ms = subMsg.duration_ms;
				if (subTraces !== undefined) {
					let previousTrace = undefined;
					for (const subTraceI in subTraces) {
						const subTrace = subTraces[subTraceI];
						const timestamp_ms = subTrace.timestamp_ms;
						const event = subTrace.event;
						if (event !== undefined) {
							let duration = 0;
							if (previousTrace !== undefined) {
								previousTrace.duration = (1000 * (relativeTimestamp + timestamp_ms)) - previousTrace.relativeTimestamp;
								duration = (1000 * duration_ms) - previousTrace.relativeTimestamp;
							}
							const newTrace = {
								id: genId(),
								relativeTimestamp: 1000 * (relativeTimestamp + timestamp_ms),
								duration: duration,
								message: event,
								parentId: thisId,
							};
							result.push(newTrace);
							previousTrace = newTrace;
						}
					}
				}
				if (start_time !== undefined) {
					// Parse start_time here!
					// "start_time": "2022-10-06 05:22:07.697 UTC"
					const ts = new Date(start_time.replace(" UTC", "+0000").replace(" ", "T"));
					absoluteStartTs = 1000 * (ts.getTime() - relativeTimestamp);
				}
			}
		}

	}

	if ("children" in traceChild) {
		const children = traceChild.children;
		for (const childI in children) {
			const child = children[childI];
			const subChildren = parseChildren(thisId, child);
			result = result.concat(subChildren);
		}
	}

	return result;
}

fs.readFile("./media/response-sample-2.json", "utf8", (err, jsonString) => {
	if (err) {
		console.log("File read failed:", err);
		return;
	}


	// console.log("File data:", jsonString);
	const json = JSON.parse(jsonString);
	// console.log("JSON\n", JSON.stringify(json, null, 2));
	if ("trace" in json) {
		const trace = json.trace;
		const rootId = genId();
		let traces = [{
			message: "root",
			id: rootId,
			relativeTimestamp: 0,
			duration: 0,
		}];
		let topMsg = "";
		if ("children" in trace) {
			const traceChildren = trace.children;
			// console.log("TRACE\n", JSON.stringify(traceChildren, null, 2));
			for (const traceChildI in traceChildren) {
				const traceChild = traceChildren[traceChildI];
				const traceChildMsg = traceChild["message"];
				const timestamp = traceChild["timestamp"];

				if (timestamp === undefined && traceChildMsg !== undefined) {
					topMsg += traceChildMsg + "\n";
				}

				if ("children" in traceChild) {
					const children = parseChildren(rootId, traceChild);
					traces = traces.concat(children);
				}
			}
		}
		console.log("absoluteStartTs: ", absoluteStartTs);
		console.log("TOP-MSG: ", topMsg);
		for (const traceI in traces) {
			const trace = traces[traceI];
			console.log("TRACE: ", trace);
		}
	}
});