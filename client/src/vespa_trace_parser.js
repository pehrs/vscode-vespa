/* --------------------------------------------------------------------------------------------
 * Copyright (c) Matti Pehrs. All rights reserved.
 * Licensed under the MIT License. See LICENSE in the project root for license information.
 * ------------------------------------------------------------------------------------------ */

const genRanHex = size => [...Array(size)].map(() => Math.floor(Math.random() * 16).toString(16)).join('');

function genId() {
  // return "" + Math.random().toString(16);
  return genRanHex(16);
}


class ZipkinEndpoint {
  constructor(serviceName) {
    this.serviceName = serviceName;
    this.ipv4 = undefined;
    this.port = undefined;
  }
}

class ZipkinSpan {
  constructor(traceId, name) {
    this.traceId = traceId;
    this.id = genId();

    this.parentId = undefined;
    this.name = name; // no default
    this.kind = "CLIENT"; // no default
    this.timestamp = undefined; // microseconds
    this.duration = 0; // microseconds
    this.localEndpoint = undefined; // no default
    this.remoteEndpoint = undefined; // no default
    // this.annotations = [];
    this.tags = {};
    // this.debug = false;
    // this.shared = false;
  }
}

function toMs(start_time) {
  // "start_time": "2022-10-06 05:22:07.697 UTC"
  return new Date(start_time.replace(" UTC", "+0000").replace(" ", "T")).getTime();
}

function parseChildren(parentSpan, children) {
  if (children !== undefined) {
    return children.flatMap((child, childIndex) => {
      return parseTraceChild(parentSpan, child, children, childIndex);
    });
  }
  return [];
}

function parseThread(parentSpan, thread, index) {
  const span = new ZipkinSpan(parentSpan.traceId, `thread-${index}`);
  span.parentId = parentSpan.id;
  span.relative_timestamp = 0;
  let result = [span];

  const traces = thread.traces;
  if (traces !== undefined) {
    result = result.concat(traces.flatMap((trace, traceIndex) => parseProtonTrace(span, trace, traces, traceIndex)));
  }

  return result;
}

function parseProtonTrace(parentSpan, trace, traces, traceIndex) {
  const timestamp_ms = trace.timestamp_ms;
  const event = trace.event;

  const span = new ZipkinSpan(parentSpan.traceId, event);
  span.parentId = parentSpan.id;
  span.timestamp_ms = timestamp_ms; // Relative to super-parent absolute_timestamp
  span.kind = "CLIENT";
  span.localEndpoint = new ZipkinEndpoint("proton");

  const tag = trace.tag;
  if (tag !== undefined) {
    span.name = tag;
  }
  span.tags = {
    id: span.id,
    parentId: parentSpan.id,
    timestamp_ms: timestamp_ms,
    event: event,
    tag: tag,
    // trace_index: traceIndex,
    // traces_length: traces.length,
  };

  if (traceIndex < (traces.length - 1)) {
    span.duration = Math.round(1000.0 * (traces[traceIndex + 1].timestamp_ms - timestamp_ms));
    // span.tags.next_timestamp_ms = traces[traceIndex + 1].timestamp_ms;
  } else {
    span.duration = 1;
  }

  let result = [span];

  const threads = trace.threads;
  if (threads !== undefined) {
    span.tags.threadsLen = threads.length;
    result = result.concat(threads.flatMap((thread, index) => parseThread(span, thread, index)));
  }

  return result;
}

function parseSubMsg(parentSpan, subMsg) {

  const start_time = subMsg.start_time;
  const distribution_key = subMsg["distribution-key"];
  const duration_ms = subMsg.duration_ms; // Float of MS

  const span = new ZipkinSpan(parentSpan.traceId, `distribution-key: ${distribution_key}`);
  span.parentId = parentSpan.id;
  span.absolute_timestamp = toMs(start_time); // absolute!
  span.kind = "CLIENT";
  span.duration = Math.round(1000.0 * duration_ms);
  span.tags = {
    start_time: start_time,
    absolute_timestamp: span.absolute_timestamp,
    duration_ms: duration_ms,
    distribution_key: distribution_key,
  };
  span.localEndpoint = new ZipkinEndpoint("proton");

  let result = [span];

  const traces = subMsg.traces;
  if (traces !== undefined) {
    result = result.concat(traces.flatMap((trace, traceIndex) => parseProtonTrace(span, trace, traces, traceIndex)));
  }

  return result;
}

function findDuration(children, i) {
  const org_i = i;
  i = i + 1;
  while (i < children.length) {
    // if (children[i].hasOwnProperty('timestamp')) {
    if ('timestamp' in children[i]) {
      return children[i]['timestamp'] * 1000;
    }
    i++;
  }
  return children[org_i]['timestamp'] * 1000;
}

function parseTraceChild(parentSpan, child, children, childIndex) {
  const message = child.message;

  const span = new ZipkinSpan(parentSpan.traceId, message);
  span.parentId = parentSpan.id;
  span.relative_timestamp = child.timestamp;
  if (span.relative_timestamp === undefined) {
    span.relative_timestamp = 0;
  }
  if (child.timestamp !== undefined) {
    span.duration = findDuration(children, childIndex) - (1000 * span.relative_timestamp);
  }

  span.kind = "CLIENT";
  span.localEndpoint = new ZipkinEndpoint("container");

  let result = [span];

  if (Array.isArray(message)) {
    // Sum message child
    span.name = "(anonymous)";

    span.kind = "CLIENT";
    span.localEndpoint = new ZipkinEndpoint("proton");

    result = result.concat(message.flatMap(subMsg => {
      return parseSubMsg(span, subMsg);
    }));

  } else {
    // Regular message

    if (span.name === undefined) {
      span.name = "undefined";
    }

    span.tags = {
      message: span.name,
    };
    if (span.name !== undefined) {
      if (span.name.length > 128) {
        span.name = ("" + span.name).replace("\n", " ").substring(0, 128);
      } else {
        span.name = ("" + span.name).replace("\n", " ");
      }
    }

    const children = child["children"];
    if (children !== undefined) {

      // Get duration for last child
      const duration =
        (children[children.length - 1]['timestamp'] - children[0]['timestamp']) * 1000;
      if (isNaN(duration) == false && duration >= 0) {
        span.duration = duration;
      }

      result = result.concat(parseChildren(span, children));
    }

  }
  return result;
}


function parseTraceRoot(traceRoot, totalDuration) {
  const root = new ZipkinSpan(genId(), "/search/");
  root.relative_timestamp = 0;
  root.kind = "CLIENT";
  root.localEndpoint = new ZipkinEndpoint("request");
  root.duration = totalDuration;

  if ("children" in traceRoot) {
    const children = traceRoot.children;
    const sub = children.flatMap((child, childIndex) => {
      return parseTraceChild(root, child, children, childIndex);
    });
    return [root].concat(sub);
  }
  return [];
}

function getZipkinSpan(spans, spanId) {
  return spans.find(span => span.id === spanId);
}

function getAbsoluteTimestamp(spans, parentId) {
  const parent = getZipkinSpan(spans, parentId);
  if (parent !== undefined) {
    const absolute_timestamp = parent.absolute_timestamp;
    if (absolute_timestamp !== undefined) {
      return absolute_timestamp;
    } else {
      return getAbsoluteTimestamp(spans, parent.parentId);
    }
  }
  return 0;
}


function getTopSpans(traceChildren) {
  for (let trace of traceChildren) {
    if ("children" in trace) {
      return trace['children'];
    }
  }
}

function findTotalDuration(spans) {
  let i = spans.length - 1;
  while (i >= 0) {
    // if (spans[i].hasOwnProperty('timestamp')) {
    if ("timestamp" in spans[i]) {
      return spans[i]['timestamp'] * 1000;
    }
    i--;
  }
  return 0;
}

export function vespaResponse2Zipkin(vespaResponse) {
  if ("trace" in vespaResponse) {
    const traceRoot = vespaResponse.trace;

    const topSpans = getTopSpans(vespaResponse.trace.children);
    const totalDuration = findTotalDuration(topSpans);

    const spans = parseTraceRoot(traceRoot, totalDuration);

    let start_ts = 0;

    // Post process spans with absolute_timestamp
    spans.forEach(span => {
      const absolute_timestamp = span.absolute_timestamp;
      if (absolute_timestamp !== undefined) {
        span.timestamp = Math.round(1000.0 * absolute_timestamp);
        span.tags.absolute_timestamp = absolute_timestamp;
        span.tags.timestamp = span.timestamp;

        const parent = getZipkinSpan(spans, span.parentId);
        const relative_timestamp = parent.relative_timestamp;
        start_ts = span.timestamp - (1000.0 * relative_timestamp);
      }
    });
    // Post process proton spans with timestamps relative to super-parent absolute_timestamp
    spans.forEach(span => {
      const timestamp_ms = span.timestamp_ms;
      if (timestamp_ms !== undefined) {
        const absolute_timestamp = getAbsoluteTimestamp(spans, span.parentId);
        span.timestamp = Math.round(1000.0 * (absolute_timestamp + timestamp_ms));
        span.tags.absolute_timestamp = absolute_timestamp;
        span.tags.duration = span.duration;
        span.tags.timestamp = span.timestamp;
        span.tags.timestamp_ms = timestamp_ms;
      }
    });
    // Post-process and set timestamp
    spans.forEach(span => {
      const timestamp = span.timestamp;
      if (timestamp === undefined) {
        const relative_timestamp = span.relative_timestamp;
        if (relative_timestamp !== undefined) {
          span.timestamp = start_ts + Math.round(1000.0 * relative_timestamp);
          span.tags.start_ts = start_ts;
          span.tags.relative_timestamp = relative_timestamp;
          span.tags.timestamp = span.timestamp;
        }
      }
      // Clean unused data
      span.absolute_timestamp = undefined;
      span.relative_timestamp = undefined;
      span.timestamp_ms = undefined;
    });

    return spans;
  }
  return [];
}
