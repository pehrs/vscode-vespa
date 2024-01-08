export const metrics2ContentNodes = {
	"nodes": [
		{
			"hostname": "vespa-cfg-0.vespa-cfg.default.svc.cluster.local",
			"role": "hosts/vespa-cfg-0.vespa-cfg.default.svc.cluster.local",
			"services": [
				{
					"name": "vespa.container",
					"timestamp": 1704539861,
					"status": {
						"code": "up",
						"description": "Data collected successfully"
					},
					"metrics": [
						{
							"values": {
								"memory_virt": 4142055424,
								"memory_rss": 2349907968,
								"cpu": 1.8830122591944,
								"cpu_util": 0.0784588441331
							},
							"dimensions": {
								"serviceId": "container"
							}
						},
						{
							"values": {
								"http.status.2xx.rate": 0
							},
							"dimensions": {
								"httpMethod": "POST",
								"requestType": "read",
								"protocol": "http1",
								"statusCode": "200",
								"serviceId": "container"
							}
						},
						{
							"values": {
								"http.status.2xx.rate": 0.0333333333333
							},
							"dimensions": {
								"httpMethod": "GET",
								"requestType": "monitoring",
								"protocol": "http1",
								"statusCode": "200",
								"serviceId": "container"
							}
						},
						{
							"values": {
								"http.status.2xx.rate": 0
							},
							"dimensions": {
								"httpMethod": "POST",
								"requestType": "write",
								"protocol": "http2",
								"statusCode": "200",
								"serviceId": "container"
							}
						},
						{
							"values": {
								"http.status.2xx.rate": 0
							},
							"dimensions": {
								"httpMethod": "GET",
								"requestType": "read",
								"protocol": "http1",
								"statusCode": "200",
								"serviceId": "container"
							}
						},
						{
							"values": {
								"jdisc.gc.ms.average": 0,
								"jdisc.gc.ms.max": 0
							},
							"dimensions": {
								"gcName": "G1OldGeneration",
								"serviceId": "container"
							}
						},
						{
							"values": {
								"hits_per_query.average": 10,
								"hits_per_query.sum": 0,
								"hits_per_query.count": 0,
								"hits_per_query.max": 10,
								"queries.rate": 0,
								"query_latency.average": 69,
								"query_latency.sum": 0,
								"query_latency.count": 0,
								"query_latency.max": 69,
								"totalhits_per_query.average": 10465,
								"totalhits_per_query.sum": 0,
								"totalhits_per_query.count": 0,
								"totalhits_per_query.max": 10465
							},
							"dimensions": {
								"chain": "vespa",
								"serviceId": "container"
							}
						},
						{
							"values": {
								"serverActiveThreads.average": 0,
								"jdisc.thread_pool.work_queue.capacity.max": 500,
								"jdisc.thread_pool.work_queue.size.sum": 0,
								"jdisc.thread_pool.work_queue.size.count": 600,
								"jdisc.thread_pool.work_queue.size.max": 0,
								"jdisc.thread_pool.work_queue.size.min": 0,
								"jdisc.thread_pool.active_threads.sum": 0,
								"jdisc.thread_pool.active_threads.count": 600,
								"jdisc.thread_pool.active_threads.max": 0,
								"jdisc.thread_pool.active_threads.min": 0,
								"jdisc.thread_pool.size.max": 96
							},
							"dimensions": {
								"threadpool": "feedapi-handler",
								"serviceId": "container"
							}
						},
						{
							"values": {
								"mem.heap.free.average": 383768726.6666667
							},
							"dimensions": {
								"serviceId": "container"
							}
						},
						{
							"values": {
								"docproc.documents.sum": 0
							},
							"dimensions": {
								"docproc": "com.yahoo.docprocs.indexing.IndexingProcessor@indexing",
								"chain": "indexing",
								"serviceId": "container"
							}
						},
						{
							"values": {
								"feed.operations.rate": 0,
								"feed.latency.sum": 0,
								"feed.latency.count": 0
							},
							"dimensions": {
								"api": "documentV1",
								"status": "OK",
								"operation": "PUT",
								"serviceId": "container"
							}
						},
						{
							"values": {
								"serverActiveThreads.average": 0,
								"jdisc.thread_pool.work_queue.capacity.max": 2400,
								"jdisc.thread_pool.work_queue.size.sum": 0,
								"jdisc.thread_pool.work_queue.size.count": 600,
								"jdisc.thread_pool.work_queue.size.max": 0,
								"jdisc.thread_pool.work_queue.size.min": 0,
								"jdisc.thread_pool.active_threads.sum": 0,
								"jdisc.thread_pool.active_threads.count": 600,
								"jdisc.thread_pool.active_threads.max": 0,
								"jdisc.thread_pool.active_threads.min": 0,
								"jdisc.thread_pool.size.max": 48
							},
							"dimensions": {
								"threadpool": "default-pool",
								"serviceId": "container"
							}
						},
						{
							"values": {
								"feed.operations.rate": 0,
								"feed.latency.sum": 0,
								"feed.latency.count": 0
							},
							"dimensions": {
								"api": "documentV1",
								"status": "SERVER_ERROR",
								"operation": "PUT",
								"serviceId": "container"
							}
						},
						{
							"values": {
								"serverActiveThreads.average": 0,
								"jdisc.thread_pool.work_queue.capacity.max": 1920,
								"jdisc.thread_pool.work_queue.size.sum": 0,
								"jdisc.thread_pool.work_queue.size.count": 600,
								"jdisc.thread_pool.work_queue.size.max": 0,
								"jdisc.thread_pool.work_queue.size.min": 0,
								"jdisc.thread_pool.active_threads.sum": 0,
								"jdisc.thread_pool.active_threads.count": 600,
								"jdisc.thread_pool.active_threads.max": 0,
								"jdisc.thread_pool.active_threads.min": 0,
								"jdisc.thread_pool.size.max": 48
							},
							"dimensions": {
								"threadpool": "default-handler-common",
								"serviceId": "container"
							}
						},
						{
							"values": {
								"http.status.5xx.rate": 0
							},
							"dimensions": {
								"httpMethod": "POST",
								"requestType": "write",
								"protocol": "http2",
								"statusCode": "507",
								"serviceId": "container"
							}
						},
						{
							"values": {
								"jdisc.gc.ms.average": 0,
								"jdisc.gc.ms.max": 0
							},
							"dimensions": {
								"gcName": "G1YoungGeneration",
								"serviceId": "container"
							}
						},
						{
							"values": {
								"serverActiveThreads.average": 0,
								"jdisc.thread_pool.work_queue.size.sum": 0,
								"jdisc.thread_pool.work_queue.size.count": 600,
								"jdisc.thread_pool.work_queue.size.max": 0,
								"jdisc.thread_pool.work_queue.size.min": 0,
								"jdisc.thread_pool.work_queue.capacity.max": 1920,
								"jdisc.thread_pool.active_threads.sum": 0,
								"jdisc.thread_pool.active_threads.count": 600,
								"jdisc.thread_pool.active_threads.max": 0,
								"jdisc.thread_pool.active_threads.min": 0,
								"jdisc.thread_pool.size.max": 48
							},
							"dimensions": {
								"threadpool": "search-handler",
								"serviceId": "container"
							}
						}
					]
				},
				{
					"name": "vespa.configserver",
					"timestamp": 1704539861,
					"status": {
						"code": "up",
						"description": "Data collected successfully"
					},
					"metrics": [
						{
							"values": {
								"memory_virt": 0,
								"memory_rss": 0,
								"cpu": 0,
								"cpu_util": 0
							},
							"dimensions": {
								"serviceId": "configserver"
							}
						},
						{
							"values": {
								"http.status.2xx.rate": 0
							},
							"dimensions": {
								"httpMethod": "POST",
								"requestType": "write",
								"protocol": "http1",
								"statusCode": "200",
								"serviceId": "configserver"
							}
						},
						{
							"values": {
								"http.status.2xx.rate": 0.1333333333333
							},
							"dimensions": {
								"httpMethod": "GET",
								"requestType": "monitoring",
								"protocol": "http1",
								"statusCode": "200",
								"serviceId": "configserver"
							}
						},
						{
							"values": {
								"jdisc.gc.ms.average": 0,
								"jdisc.gc.ms.max": 0
							},
							"dimensions": {
								"gcName": "G1OldGeneration",
								"serviceId": "configserver"
							}
						},
						{
							"values": {
								"mem.heap.free.average": 153330376
							},
							"dimensions": {
								"serviceId": "configserver"
							}
						},
						{
							"values": {
								"http.status.4xx.rate": 0
							},
							"dimensions": {
								"httpMethod": "POST",
								"requestType": "write",
								"protocol": "http1",
								"statusCode": "400",
								"serviceId": "configserver"
							}
						},
						{
							"values": {
								"serverActiveThreads.average": 0,
								"jdisc.thread_pool.work_queue.capacity.max": 1920,
								"jdisc.thread_pool.work_queue.size.sum": 0,
								"jdisc.thread_pool.work_queue.size.count": 600,
								"jdisc.thread_pool.work_queue.size.max": 0,
								"jdisc.thread_pool.work_queue.size.min": 0,
								"jdisc.thread_pool.active_threads.sum": 0,
								"jdisc.thread_pool.active_threads.count": 600,
								"jdisc.thread_pool.active_threads.max": 0,
								"jdisc.thread_pool.active_threads.min": 0,
								"jdisc.thread_pool.size.max": 48
							},
							"dimensions": {
								"threadpool": "default-handler-common",
								"serviceId": "configserver"
							}
						},
						{
							"values": {
								"jdisc.gc.ms.average": 0,
								"jdisc.gc.ms.max": 0
							},
							"dimensions": {
								"gcName": "G1YoungGeneration",
								"serviceId": "configserver"
							}
						},
						{
							"values": {
								"http.status.2xx.rate": 0
							},
							"dimensions": {
								"httpMethod": "GET",
								"requestType": "read",
								"protocol": "http1",
								"statusCode": "200",
								"serviceId": "configserver"
							}
						},
						{
							"values": {
								"serverActiveThreads.average": 0,
								"jdisc.thread_pool.work_queue.capacity.max": 2400,
								"jdisc.thread_pool.work_queue.size.sum": 0,
								"jdisc.thread_pool.work_queue.size.count": 600,
								"jdisc.thread_pool.work_queue.size.max": 0,
								"jdisc.thread_pool.work_queue.size.min": 0,
								"jdisc.thread_pool.active_threads.sum": 0,
								"jdisc.thread_pool.active_threads.count": 600,
								"jdisc.thread_pool.active_threads.max": 0,
								"jdisc.thread_pool.active_threads.min": 0,
								"jdisc.thread_pool.size.max": 48
							},
							"dimensions": {
								"threadpool": "default-pool",
								"serviceId": "configserver"
							}
						}
					]
				},
				{
					"name": "vespa.logserver",
					"timestamp": 1704539861,
					"status": {
						"code": "up",
						"description": "Data collected successfully"
					},
					"metrics": [
						{
							"values": {
								"memory_virt": 932712448,
								"memory_rss": 86872064,
								"cpu": 0.0672504378284,
								"cpu_util": 0.0028021015762
							},
							"dimensions": {
								"serviceId": "logserver"
							}
						},
						{
							"values": {},
							"dimensions": {
								"serviceId": "logserver"
							}
						}
					]
				},
				{
					"name": "vespa.slobrok",
					"timestamp": 1704539861,
					"status": {
						"code": "up",
						"description": "Data collected successfully"
					},
					"metrics": [
						{
							"values": {
								"memory_virt": 205053952,
								"memory_rss": 16752640,
								"cpu": 0.2858143607706,
								"cpu_util": 0.0119089316988
							},
							"dimensions": {
								"serviceId": "slobrok"
							}
						},
						{
							"values": {},
							"dimensions": {
								"serviceId": "slobrok"
							}
						}
					]
				},
				{
					"name": "vespa.container-clustercontroller",
					"timestamp": 1704539861,
					"status": {
						"code": "up",
						"description": "Data collected successfully"
					},
					"metrics": [
						{
							"values": {
								"memory_virt": 758206464,
								"memory_rss": 199569408,
								"cpu": 1.2777583187391,
								"cpu_util": 0.0532399299475
							},
							"dimensions": {
								"serviceId": "container-clustercontroller"
							}
						},
						{
							"values": {
								"jdisc.gc.ms.average": 0,
								"jdisc.gc.ms.max": 0
							},
							"dimensions": {
								"gcName": "MarkSweepCompact",
								"serviceId": "container-clustercontroller"
							}
						},
						{
							"values": {
								"cluster-controller.maintenance.count.last": 0,
								"cluster-controller.maintenance.count.max": 0,
								"cluster-controller.down.count.last": 0,
								"cluster-controller.down.count.max": 0,
								"cluster-controller.up.count.last": 2,
								"cluster-controller.up.count.max": 2
							},
							"dimensions": {
								"node-type": "distributor",
								"cluster": "msmarco",
								"controller-index": "0",
								"serviceId": "container-clustercontroller",
								"clusterId": "msmarco"
							}
						},
						{
							"values": {
								"serverActiveThreads.average": 0,
								"jdisc.thread_pool.work_queue.capacity.max": 50,
								"jdisc.thread_pool.work_queue.size.sum": 0,
								"jdisc.thread_pool.work_queue.size.count": 600,
								"jdisc.thread_pool.work_queue.size.max": 0,
								"jdisc.thread_pool.work_queue.size.min": 0,
								"jdisc.thread_pool.active_threads.sum": 0,
								"jdisc.thread_pool.active_threads.count": 600,
								"jdisc.thread_pool.active_threads.max": 0,
								"jdisc.thread_pool.active_threads.min": 0,
								"jdisc.thread_pool.size.max": 1
							},
							"dimensions": {
								"threadpool": "default-pool",
								"serviceId": "container-clustercontroller"
							}
						},
						{
							"values": {
								"cluster-controller.maintenance.count.last": 0,
								"cluster-controller.maintenance.count.max": 0,
								"cluster-controller.down.count.last": 0,
								"cluster-controller.down.count.max": 0,
								"cluster-controller.up.count.last": 2,
								"cluster-controller.up.count.max": 2
							},
							"dimensions": {
								"node-type": "storage",
								"cluster": "msmarco",
								"controller-index": "0",
								"serviceId": "container-clustercontroller",
								"clusterId": "msmarco"
							}
						},
						{
							"values": {
								"http.status.2xx.rate": 0
							},
							"dimensions": {
								"httpMethod": "GET",
								"requestType": "read",
								"protocol": "http1",
								"statusCode": "200",
								"serviceId": "container-clustercontroller"
							}
						},
						{
							"values": {
								"mem.heap.free.average": 17777993.333333332
							},
							"dimensions": {
								"serviceId": "container-clustercontroller"
							}
						},
						{
							"values": {
								"cluster-controller.resource_usage.nodes_above_limit.last": 0,
								"cluster-controller.resource_usage.nodes_above_limit.max": 0,
								"cluster-controller.resource_usage.max_memory_utilization.last": 0.34456593019,
								"cluster-controller.resource_usage.max_memory_utilization.max": 0.34456593019,
								"cluster-controller.resource_usage.max_disk_utilization.last": 0.8532679554415,
								"cluster-controller.resource_usage.max_disk_utilization.max": 0.8532679554415
							},
							"dimensions": {
								"cluster": "msmarco",
								"controller-index": "0",
								"serviceId": "container-clustercontroller",
								"clusterId": "msmarco"
							}
						},
						{
							"values": {
								"http.status.2xx.rate": 0.0333333333333
							},
							"dimensions": {
								"httpMethod": "GET",
								"requestType": "monitoring",
								"protocol": "http1",
								"statusCode": "200",
								"serviceId": "container-clustercontroller"
							}
						},
						{
							"values": {
								"jdisc.gc.ms.average": 3.3333333333333,
								"jdisc.gc.ms.max": 4
							},
							"dimensions": {
								"gcName": "Copy",
								"serviceId": "container-clustercontroller"
							}
						},
						{
							"values": {
								"serverActiveThreads.average": 0,
								"jdisc.thread_pool.work_queue.capacity.max": 650,
								"jdisc.thread_pool.work_queue.size.sum": 0,
								"jdisc.thread_pool.work_queue.size.count": 600,
								"jdisc.thread_pool.work_queue.size.max": 0,
								"jdisc.thread_pool.work_queue.size.min": 0,
								"jdisc.thread_pool.active_threads.sum": 0,
								"jdisc.thread_pool.active_threads.count": 600,
								"jdisc.thread_pool.active_threads.max": 0,
								"jdisc.thread_pool.active_threads.min": 0,
								"jdisc.thread_pool.size.max": 8
							},
							"dimensions": {
								"threadpool": "default-handler-common",
								"serviceId": "container-clustercontroller"
							}
						},
						{
							"values": {
								"cluster-controller.is-master.last": 1,
								"cluster-controller.is-master.max": 1
							},
							"dimensions": {
								"controller-index": "0",
								"serviceId": "container-clustercontroller",
								"clusterId": "msmarco"
							}
						}
					]
				},
				{
					"name": "vespa.metricsproxy-container",
					"timestamp": 1704539861,
					"status": {
						"code": "up",
						"description": "Data collected successfully"
					},
					"metrics": [
						{
							"values": {
								"memory_virt": 1028186112,
								"memory_rss": 256004096,
								"cpu": 1.5803852889667,
								"cpu_util": 0.0658493870403
							},
							"dimensions": {
								"serviceId": "metricsproxy-container"
							}
						},
						{
							"values": {
								"serverActiveThreads.average": 0,
								"jdisc.thread_pool.work_queue.capacity.max": 50,
								"jdisc.thread_pool.work_queue.size.sum": 0,
								"jdisc.thread_pool.work_queue.size.count": 599,
								"jdisc.thread_pool.work_queue.size.max": 0,
								"jdisc.thread_pool.work_queue.size.min": 0,
								"jdisc.thread_pool.active_threads.sum": 0,
								"jdisc.thread_pool.active_threads.count": 599,
								"jdisc.thread_pool.active_threads.max": 0,
								"jdisc.thread_pool.active_threads.min": 0,
								"jdisc.thread_pool.size.max": 1
							},
							"dimensions": {
								"threadpool": "default-pool",
								"serviceId": "metricsproxy-container"
							}
						},
						{
							"values": {
								"jdisc.gc.ms.average": 2.5,
								"jdisc.gc.ms.max": 5
							},
							"dimensions": {
								"gcName": "G1YoungGeneration",
								"serviceId": "metricsproxy-container"
							}
						},
						{
							"values": {
								"http.status.2xx.rate": 0.0333333333333
							},
							"dimensions": {
								"httpMethod": "GET",
								"requestType": "read",
								"protocol": "http1",
								"statusCode": "200",
								"serviceId": "metricsproxy-container"
							}
						},
						{
							"values": {
								"jdisc.gc.ms.average": 0,
								"jdisc.gc.ms.max": 0
							},
							"dimensions": {
								"gcName": "G1OldGeneration",
								"serviceId": "metricsproxy-container"
							}
						},
						{
							"values": {
								"mem.heap.free.average": 36884784
							},
							"dimensions": {
								"serviceId": "metricsproxy-container"
							}
						},
						{
							"values": {
								"http.status.2xx.rate": 0.0333333333333
							},
							"dimensions": {
								"httpMethod": "GET",
								"requestType": "monitoring",
								"protocol": "http1",
								"statusCode": "200",
								"serviceId": "metricsproxy-container"
							}
						},
						{
							"values": {
								"serverActiveThreads.average": 0,
								"jdisc.thread_pool.work_queue.capacity.max": 650,
								"jdisc.thread_pool.work_queue.size.sum": 0,
								"jdisc.thread_pool.work_queue.size.count": 600,
								"jdisc.thread_pool.work_queue.size.max": 0,
								"jdisc.thread_pool.work_queue.size.min": 0,
								"jdisc.thread_pool.active_threads.sum": 0,
								"jdisc.thread_pool.active_threads.count": 600,
								"jdisc.thread_pool.active_threads.max": 0,
								"jdisc.thread_pool.active_threads.min": 0,
								"jdisc.thread_pool.size.max": 8
							},
							"dimensions": {
								"threadpool": "default-handler-common",
								"serviceId": "metricsproxy-container"
							}
						}
					]
				},
				{
					"name": "vespa.config-sentinel",
					"timestamp": 1704539861,
					"status": {
						"code": "up",
						"description": "Data collected successfully"
					},
					"metrics": [
						{
							"values": {
								"memory_virt": 0,
								"memory_rss": 0,
								"cpu": 0,
								"cpu_util": 0
							},
							"dimensions": {
								"serviceId": "config-sentinel"
							}
						},
						{
							"values": {
								"sentinel.totalRestarts.sum": 0,
								"sentinel.totalRestarts.max": 0,
								"sentinel.totalRestarts.last": 0
							},
							"dimensions": {
								"serviceId": "config-sentinel"
							}
						}
					]
				},
				{
					"name": "vespa.logd",
					"timestamp": 1704539861,
					"status": {
						"code": "up",
						"description": "Data collected successfully"
					},
					"metrics": [
						{
							"values": {
								"memory_virt": 193961984,
								"memory_rss": 18214912,
								"cpu": 0.1345008756567,
								"cpu_util": 0.0056042031524
							},
							"dimensions": {
								"serviceId": "logd"
							}
						},
						{
							"values": {},
							"dimensions": {
								"serviceId": "logd"
							}
						}
					]
				}
			]
		},
		{
			"hostname": "vespa-c-0.vespa-c.default.svc.cluster.local",
			"role": "hosts/vespa-c-0.vespa-c.default.svc.cluster.local",
			"services": [
				{
					"name": "vespa.searchnode",
					"timestamp": 1704539863,
					"status": {
						"code": "up",
						"description": "Data collected successfully"
					},
					"metrics": [
						{
							"values": {
								"memory_virt": 2917376000,
								"memory_rss": 328847360,
								"cpu": 1.7486093791596,
								"cpu_util": 0.0728587241317
							},
							"dimensions": {
								"serviceId": "searchnode"
							}
						},
						{
							"values": {
								"content.proton.documentdb.matching.rank_profile.rerank_time.average": 0,
								"content.proton.documentdb.matching.rank_profile.rerank_time.sum": 0,
								"content.proton.documentdb.matching.rank_profile.rerank_time.count": 0,
								"content.proton.documentdb.matching.rank_profile.rerank_time.max": 0,
								"content.proton.documentdb.matching.rank_profile.query_setup_time.average": 0,
								"content.proton.documentdb.matching.rank_profile.query_setup_time.sum": 0,
								"content.proton.documentdb.matching.rank_profile.query_setup_time.count": 0,
								"content.proton.documentdb.matching.rank_profile.query_setup_time.max": 0,
								"content.proton.documentdb.matching.rank_profile.query_latency.average": 0,
								"content.proton.documentdb.matching.rank_profile.query_latency.sum": 0,
								"content.proton.documentdb.matching.rank_profile.query_latency.count": 0,
								"content.proton.documentdb.matching.rank_profile.query_latency.max": 0
							},
							"dimensions": {
								"documenttype": "msmarco",
								"rankProfile": "gse_title_body_all",
								"serviceId": "searchnode"
							}
						},
						{
							"values": {
								"content.proton.documentdb.matching.rank_profile.rerank_time.average": 0,
								"content.proton.documentdb.matching.rank_profile.rerank_time.sum": 0,
								"content.proton.documentdb.matching.rank_profile.rerank_time.count": 0,
								"content.proton.documentdb.matching.rank_profile.rerank_time.max": 0,
								"content.proton.documentdb.matching.rank_profile.query_setup_time.average": 0,
								"content.proton.documentdb.matching.rank_profile.query_setup_time.sum": 0,
								"content.proton.documentdb.matching.rank_profile.query_setup_time.count": 0,
								"content.proton.documentdb.matching.rank_profile.query_setup_time.max": 0,
								"content.proton.documentdb.matching.rank_profile.query_latency.average": 0,
								"content.proton.documentdb.matching.rank_profile.query_latency.sum": 0,
								"content.proton.documentdb.matching.rank_profile.query_latency.count": 0,
								"content.proton.documentdb.matching.rank_profile.query_latency.max": 0
							},
							"dimensions": {
								"documenttype": "msmarco",
								"rankProfile": "bm25_bert_title_body_all",
								"serviceId": "searchnode"
							}
						},
						{
							"values": {
								"content.proton.documentdb.matching.rank_profile.rerank_time.average": 0,
								"content.proton.documentdb.matching.rank_profile.rerank_time.sum": 0,
								"content.proton.documentdb.matching.rank_profile.rerank_time.count": 0,
								"content.proton.documentdb.matching.rank_profile.rerank_time.max": 0,
								"content.proton.documentdb.matching.rank_profile.query_setup_time.average": 0,
								"content.proton.documentdb.matching.rank_profile.query_setup_time.sum": 0,
								"content.proton.documentdb.matching.rank_profile.query_setup_time.count": 0,
								"content.proton.documentdb.matching.rank_profile.query_setup_time.max": 0,
								"content.proton.documentdb.matching.rank_profile.query_latency.average": 0,
								"content.proton.documentdb.matching.rank_profile.query_latency.sum": 0,
								"content.proton.documentdb.matching.rank_profile.query_latency.count": 0,
								"content.proton.documentdb.matching.rank_profile.query_latency.max": 0
							},
							"dimensions": {
								"documenttype": "msmarco",
								"rankProfile": "bm25",
								"serviceId": "searchnode"
							}
						},
						{
							"values": {
								"content.proton.documentdb.matching.rank_profile.rerank_time.average": 0,
								"content.proton.documentdb.matching.rank_profile.rerank_time.sum": 0,
								"content.proton.documentdb.matching.rank_profile.rerank_time.count": 0,
								"content.proton.documentdb.matching.rank_profile.rerank_time.max": 0,
								"content.proton.documentdb.matching.rank_profile.query_setup_time.average": 0,
								"content.proton.documentdb.matching.rank_profile.query_setup_time.sum": 0,
								"content.proton.documentdb.matching.rank_profile.query_setup_time.count": 0,
								"content.proton.documentdb.matching.rank_profile.query_setup_time.max": 0,
								"content.proton.documentdb.matching.rank_profile.query_latency.average": 0,
								"content.proton.documentdb.matching.rank_profile.query_latency.sum": 0,
								"content.proton.documentdb.matching.rank_profile.query_latency.count": 0,
								"content.proton.documentdb.matching.rank_profile.query_latency.max": 0
							},
							"dimensions": {
								"documenttype": "msmarco",
								"rankProfile": "bm25_word2vec_title_body_all",
								"serviceId": "searchnode"
							}
						},
						{
							"values": {
								"content.proton.documentdb.matching.rank_profile.rerank_time.average": 0,
								"content.proton.documentdb.matching.rank_profile.rerank_time.sum": 0,
								"content.proton.documentdb.matching.rank_profile.rerank_time.count": 0,
								"content.proton.documentdb.matching.rank_profile.rerank_time.max": 0,
								"content.proton.documentdb.matching.rank_profile.query_setup_time.average": 0,
								"content.proton.documentdb.matching.rank_profile.query_setup_time.sum": 0,
								"content.proton.documentdb.matching.rank_profile.query_setup_time.count": 0,
								"content.proton.documentdb.matching.rank_profile.query_setup_time.max": 0,
								"content.proton.documentdb.matching.rank_profile.query_latency.average": 0,
								"content.proton.documentdb.matching.rank_profile.query_latency.sum": 0,
								"content.proton.documentdb.matching.rank_profile.query_latency.count": 0,
								"content.proton.documentdb.matching.rank_profile.query_latency.max": 0
							},
							"dimensions": {
								"documenttype": "msmarco",
								"rankProfile": "bert_title_body_all",
								"serviceId": "searchnode"
							}
						},
						{
							"values": {
								"content.proton.documentdb.matching.rank_profile.rerank_time.average": 0,
								"content.proton.documentdb.matching.rank_profile.rerank_time.sum": 0,
								"content.proton.documentdb.matching.rank_profile.rerank_time.count": 0,
								"content.proton.documentdb.matching.rank_profile.rerank_time.max": 0,
								"content.proton.documentdb.matching.rank_profile.query_setup_time.average": 0,
								"content.proton.documentdb.matching.rank_profile.query_setup_time.sum": 0,
								"content.proton.documentdb.matching.rank_profile.query_setup_time.count": 0,
								"content.proton.documentdb.matching.rank_profile.query_setup_time.max": 0,
								"content.proton.documentdb.matching.rank_profile.query_latency.average": 0,
								"content.proton.documentdb.matching.rank_profile.query_latency.sum": 0,
								"content.proton.documentdb.matching.rank_profile.query_latency.count": 0,
								"content.proton.documentdb.matching.rank_profile.query_latency.max": 0
							},
							"dimensions": {
								"documenttype": "msmarco",
								"rankProfile": "collect_rank_features_embeddings",
								"serviceId": "searchnode"
							}
						},
						{
							"values": {
								"content.proton.documentdb.matching.rank_profile.rerank_time.average": 0,
								"content.proton.documentdb.matching.rank_profile.rerank_time.sum": 0,
								"content.proton.documentdb.matching.rank_profile.rerank_time.count": 0,
								"content.proton.documentdb.matching.rank_profile.rerank_time.max": 0,
								"content.proton.documentdb.matching.rank_profile.query_setup_time.average": 0,
								"content.proton.documentdb.matching.rank_profile.query_setup_time.sum": 0,
								"content.proton.documentdb.matching.rank_profile.query_setup_time.count": 0,
								"content.proton.documentdb.matching.rank_profile.query_setup_time.max": 0,
								"content.proton.documentdb.matching.rank_profile.query_latency.average": 0,
								"content.proton.documentdb.matching.rank_profile.query_latency.sum": 0,
								"content.proton.documentdb.matching.rank_profile.query_latency.count": 0,
								"content.proton.documentdb.matching.rank_profile.query_latency.max": 0
							},
							"dimensions": {
								"documenttype": "msmarco",
								"rankProfile": "default",
								"serviceId": "searchnode"
							}
						},
						{
							"values": {
								"content.proton.documentdb.matching.rank_profile.rerank_time.average": 0,
								"content.proton.documentdb.matching.rank_profile.rerank_time.sum": 0,
								"content.proton.documentdb.matching.rank_profile.rerank_time.count": 0,
								"content.proton.documentdb.matching.rank_profile.rerank_time.max": 0,
								"content.proton.documentdb.matching.rank_profile.query_setup_time.average": 0,
								"content.proton.documentdb.matching.rank_profile.query_setup_time.sum": 0,
								"content.proton.documentdb.matching.rank_profile.query_setup_time.count": 0,
								"content.proton.documentdb.matching.rank_profile.query_setup_time.max": 0,
								"content.proton.documentdb.matching.rank_profile.query_latency.average": 0,
								"content.proton.documentdb.matching.rank_profile.query_latency.sum": 0,
								"content.proton.documentdb.matching.rank_profile.query_latency.count": 0,
								"content.proton.documentdb.matching.rank_profile.query_latency.max": 0
							},
							"dimensions": {
								"documenttype": "msmarco",
								"rankProfile": "unranked",
								"serviceId": "searchnode"
							}
						},
						{
							"values": {
								"content.proton.documentdb.matching.rank_profile.rerank_time.average": 0,
								"content.proton.documentdb.matching.rank_profile.rerank_time.sum": 0,
								"content.proton.documentdb.matching.rank_profile.rerank_time.count": 0,
								"content.proton.documentdb.matching.rank_profile.rerank_time.max": 0,
								"content.proton.documentdb.matching.rank_profile.query_setup_time.average": 0,
								"content.proton.documentdb.matching.rank_profile.query_setup_time.sum": 0,
								"content.proton.documentdb.matching.rank_profile.query_setup_time.count": 0,
								"content.proton.documentdb.matching.rank_profile.query_setup_time.max": 0,
								"content.proton.documentdb.matching.rank_profile.query_latency.average": 0,
								"content.proton.documentdb.matching.rank_profile.query_latency.sum": 0,
								"content.proton.documentdb.matching.rank_profile.query_latency.count": 0,
								"content.proton.documentdb.matching.rank_profile.query_latency.max": 0
							},
							"dimensions": {
								"documenttype": "msmarco",
								"rankProfile": "collect_rank_features",
								"serviceId": "searchnode"
							}
						},
						{
							"values": {
								"content.proton.documentdb.matching.rank_profile.rerank_time.average": 0,
								"content.proton.documentdb.matching.rank_profile.rerank_time.sum": 0,
								"content.proton.documentdb.matching.rank_profile.rerank_time.count": 0,
								"content.proton.documentdb.matching.rank_profile.rerank_time.max": 0,
								"content.proton.documentdb.matching.rank_profile.query_setup_time.average": 0,
								"content.proton.documentdb.matching.rank_profile.query_setup_time.sum": 0,
								"content.proton.documentdb.matching.rank_profile.query_setup_time.count": 0,
								"content.proton.documentdb.matching.rank_profile.query_setup_time.max": 0,
								"content.proton.documentdb.matching.rank_profile.query_latency.average": 0,
								"content.proton.documentdb.matching.rank_profile.query_latency.sum": 0,
								"content.proton.documentdb.matching.rank_profile.query_latency.count": 0,
								"content.proton.documentdb.matching.rank_profile.query_latency.max": 0
							},
							"dimensions": {
								"documenttype": "msmarco",
								"rankProfile": "bm25_gse_title_body_all",
								"serviceId": "searchnode"
							}
						},
						{
							"values": {
								"content.proton.resource_usage.disk.average": 0.7594084866186,
								"content.proton.resource_usage.memory.average": 0.1618688023841,
								"content.proton.resource_usage.feeding_blocked.max": 0,
								"content.proton.resource_usage.feeding_blocked.last": 0,
								"content.proton.search_protocol.query.latency.average": 0,
								"content.proton.search_protocol.query.latency.sum": 0,
								"content.proton.search_protocol.query.latency.count": 0,
								"content.proton.search_protocol.query.latency.max": 0,
								"content.proton.search_protocol.docsum.latency.average": 0,
								"content.proton.search_protocol.docsum.latency.sum": 0,
								"content.proton.search_protocol.docsum.latency.count": 0,
								"content.proton.search_protocol.docsum.latency.max": 0,
								"content.proton.search_protocol.docsum.requested_documents.rate": 0,
								"vds.bouncer.clock_skew_aborts.count": 0,
								"vds.filestor.allthreads.put.count.rate": 0,
								"vds.filestor.allthreads.remove.count.rate": 0,
								"vds.filestor.allthreads.update.count.rate": 0
							},
							"dimensions": {
								"serviceId": "searchnode"
							}
						},
						{
							"values": {
								"content.proton.documentdb.matching.docs_matched.rate": 0,
								"content.proton.documentdb.matching.docs_reranked.rate": 0,
								"content.proton.documentdb.documents.active.max": 48652,
								"content.proton.documentdb.documents.active.last": 48652,
								"content.proton.documentdb.documents.ready.max": 97506,
								"content.proton.documentdb.documents.ready.last": 97506,
								"content.proton.documentdb.documents.total.max": 97506,
								"content.proton.documentdb.documents.total.last": 97506,
								"content.proton.documentdb.memory_usage.allocated_bytes.last": 106863704,
								"content.proton.documentdb.disk_usage.last": 1554781135,
								"content.proton.transactionlog.disk_usage.last": 1071475735
							},
							"dimensions": {
								"documenttype": "msmarco",
								"serviceId": "searchnode"
							}
						},
						{
							"values": {
								"content.proton.documentdb.matching.rank_profile.rerank_time.average": 0,
								"content.proton.documentdb.matching.rank_profile.rerank_time.sum": 0,
								"content.proton.documentdb.matching.rank_profile.rerank_time.count": 0,
								"content.proton.documentdb.matching.rank_profile.rerank_time.max": 0,
								"content.proton.documentdb.matching.rank_profile.query_setup_time.average": 0,
								"content.proton.documentdb.matching.rank_profile.query_setup_time.sum": 0,
								"content.proton.documentdb.matching.rank_profile.query_setup_time.count": 0,
								"content.proton.documentdb.matching.rank_profile.query_setup_time.max": 0,
								"content.proton.documentdb.matching.rank_profile.query_latency.average": 0,
								"content.proton.documentdb.matching.rank_profile.query_latency.sum": 0,
								"content.proton.documentdb.matching.rank_profile.query_latency.count": 0,
								"content.proton.documentdb.matching.rank_profile.query_latency.max": 0
							},
							"dimensions": {
								"documenttype": "msmarco",
								"rankProfile": "listwise_linear_bm25",
								"serviceId": "searchnode"
							}
						},
						{
							"values": {
								"content.proton.documentdb.matching.rank_profile.rerank_time.average": 0,
								"content.proton.documentdb.matching.rank_profile.rerank_time.sum": 0,
								"content.proton.documentdb.matching.rank_profile.rerank_time.count": 0,
								"content.proton.documentdb.matching.rank_profile.rerank_time.max": 0,
								"content.proton.documentdb.matching.rank_profile.query_setup_time.average": 0,
								"content.proton.documentdb.matching.rank_profile.query_setup_time.sum": 0,
								"content.proton.documentdb.matching.rank_profile.query_setup_time.count": 0,
								"content.proton.documentdb.matching.rank_profile.query_setup_time.max": 0,
								"content.proton.documentdb.matching.rank_profile.query_latency.average": 0,
								"content.proton.documentdb.matching.rank_profile.query_latency.sum": 0,
								"content.proton.documentdb.matching.rank_profile.query_latency.count": 0,
								"content.proton.documentdb.matching.rank_profile.query_latency.max": 0
							},
							"dimensions": {
								"documenttype": "msmarco",
								"rankProfile": "listwise_linear_bm25_gse_title_body_or",
								"serviceId": "searchnode"
							}
						},
						{
							"values": {
								"content.proton.documentdb.matching.rank_profile.rerank_time.average": 0,
								"content.proton.documentdb.matching.rank_profile.rerank_time.sum": 0,
								"content.proton.documentdb.matching.rank_profile.rerank_time.count": 0,
								"content.proton.documentdb.matching.rank_profile.rerank_time.max": 0,
								"content.proton.documentdb.matching.rank_profile.query_setup_time.average": 0,
								"content.proton.documentdb.matching.rank_profile.query_setup_time.sum": 0,
								"content.proton.documentdb.matching.rank_profile.query_setup_time.count": 0,
								"content.proton.documentdb.matching.rank_profile.query_setup_time.max": 0,
								"content.proton.documentdb.matching.rank_profile.query_latency.average": 0,
								"content.proton.documentdb.matching.rank_profile.query_latency.sum": 0,
								"content.proton.documentdb.matching.rank_profile.query_latency.count": 0,
								"content.proton.documentdb.matching.rank_profile.query_latency.max": 0
							},
							"dimensions": {
								"documenttype": "msmarco",
								"rankProfile": "word2vec_title_body_all",
								"serviceId": "searchnode"
							}
						},
						{
							"values": {
								"content.proton.documentdb.matching.rank_profile.rerank_time.average": 0,
								"content.proton.documentdb.matching.rank_profile.rerank_time.sum": 0,
								"content.proton.documentdb.matching.rank_profile.rerank_time.count": 0,
								"content.proton.documentdb.matching.rank_profile.rerank_time.max": 0,
								"content.proton.documentdb.matching.rank_profile.query_setup_time.average": 0,
								"content.proton.documentdb.matching.rank_profile.query_setup_time.sum": 0,
								"content.proton.documentdb.matching.rank_profile.query_setup_time.count": 0,
								"content.proton.documentdb.matching.rank_profile.query_setup_time.max": 0,
								"content.proton.documentdb.matching.rank_profile.query_latency.average": 0,
								"content.proton.documentdb.matching.rank_profile.query_latency.sum": 0,
								"content.proton.documentdb.matching.rank_profile.query_latency.count": 0,
								"content.proton.documentdb.matching.rank_profile.query_latency.max": 0
							},
							"dimensions": {
								"documenttype": "msmarco",
								"rankProfile": "pointwise_linear_bm25",
								"serviceId": "searchnode"
							}
						},
						{
							"values": {
								"content.proton.documentdb.matching.rank_profile.rerank_time.average": 0,
								"content.proton.documentdb.matching.rank_profile.rerank_time.sum": 0,
								"content.proton.documentdb.matching.rank_profile.rerank_time.count": 0,
								"content.proton.documentdb.matching.rank_profile.rerank_time.max": 0,
								"content.proton.documentdb.matching.rank_profile.query_setup_time.average": 0,
								"content.proton.documentdb.matching.rank_profile.query_setup_time.sum": 0,
								"content.proton.documentdb.matching.rank_profile.query_setup_time.count": 0,
								"content.proton.documentdb.matching.rank_profile.query_setup_time.max": 0,
								"content.proton.documentdb.matching.rank_profile.query_latency.average": 0,
								"content.proton.documentdb.matching.rank_profile.query_latency.sum": 0,
								"content.proton.documentdb.matching.rank_profile.query_latency.count": 0,
								"content.proton.documentdb.matching.rank_profile.query_latency.max": 0
							},
							"dimensions": {
								"documenttype": "msmarco",
								"rankProfile": "listwise_bm25_bert_title_body_all",
								"serviceId": "searchnode"
							}
						},
						{
							"values": {
								"content.proton.documentdb.matching.rank_profile.rerank_time.average": 0,
								"content.proton.documentdb.matching.rank_profile.rerank_time.sum": 0,
								"content.proton.documentdb.matching.rank_profile.rerank_time.count": 0,
								"content.proton.documentdb.matching.rank_profile.rerank_time.max": 0,
								"content.proton.documentdb.matching.rank_profile.query_setup_time.average": 0,
								"content.proton.documentdb.matching.rank_profile.query_setup_time.sum": 0,
								"content.proton.documentdb.matching.rank_profile.query_setup_time.count": 0,
								"content.proton.documentdb.matching.rank_profile.query_setup_time.max": 0,
								"content.proton.documentdb.matching.rank_profile.query_latency.average": 0,
								"content.proton.documentdb.matching.rank_profile.query_latency.sum": 0,
								"content.proton.documentdb.matching.rank_profile.query_latency.count": 0,
								"content.proton.documentdb.matching.rank_profile.query_latency.max": 0
							},
							"dimensions": {
								"documenttype": "msmarco",
								"rankProfile": "listwise_linear_bm25_gse_title_body_and",
								"serviceId": "searchnode"
							}
						}
					]
				},
				{
					"name": "vespa.distributor",
					"timestamp": 1704539863,
					"status": {
						"code": "up",
						"description": "Data collected successfully"
					},
					"metrics": [
						{
							"values": {
								"memory_virt": 612950016,
								"memory_rss": 93556736,
								"cpu": 5.0776926202519,
								"cpu_util": 0.2115705258438
							},
							"dimensions": {
								"serviceId": "distributor"
							}
						},
						{
							"values": {
								"vds.bouncer.clock_skew_aborts.count": 0,
								"vds.distributor.docsstored.average": 48652
							},
							"dimensions": {
								"serviceId": "distributor"
							}
						}
					]
				},
				{
					"name": "vespa.metricsproxy-container",
					"timestamp": 1704539863,
					"status": {
						"code": "up",
						"description": "Data collected successfully"
					},
					"metrics": [
						{
							"values": {
								"memory_virt": 1023488000,
								"memory_rss": 179773440,
								"cpu": 1.5972874136554,
								"cpu_util": 0.0665536422356
							},
							"dimensions": {
								"serviceId": "metricsproxy-container"
							}
						},
						{
							"values": {
								"serverActiveThreads.average": 0.0016666666667,
								"jdisc.thread_pool.work_queue.capacity.max": 50,
								"jdisc.thread_pool.work_queue.size.sum": 0,
								"jdisc.thread_pool.work_queue.size.count": 600,
								"jdisc.thread_pool.work_queue.size.max": 0,
								"jdisc.thread_pool.work_queue.size.min": 0,
								"jdisc.thread_pool.active_threads.sum": 1,
								"jdisc.thread_pool.active_threads.count": 600,
								"jdisc.thread_pool.active_threads.max": 1,
								"jdisc.thread_pool.active_threads.min": 0,
								"jdisc.thread_pool.size.max": 1
							},
							"dimensions": {
								"threadpool": "default-pool",
								"serviceId": "metricsproxy-container"
							}
						},
						{
							"values": {
								"jdisc.gc.ms.average": 5.5,
								"jdisc.gc.ms.max": 11
							},
							"dimensions": {
								"gcName": "G1YoungGeneration",
								"serviceId": "metricsproxy-container"
							}
						},
						{
							"values": {
								"http.status.2xx.rate": 0.0333333333333
							},
							"dimensions": {
								"requestType": "read",
								"httpMethod": "GET",
								"statusCode": "200",
								"protocol": "http1",
								"serviceId": "metricsproxy-container"
							}
						},
						{
							"values": {
								"jdisc.gc.ms.average": 0,
								"jdisc.gc.ms.max": 0
							},
							"dimensions": {
								"gcName": "G1OldGeneration",
								"serviceId": "metricsproxy-container"
							}
						},
						{
							"values": {
								"mem.heap.free.average": 46316464
							},
							"dimensions": {
								"serviceId": "metricsproxy-container"
							}
						},
						{
							"values": {
								"http.status.2xx.rate": 0.0333333333333
							},
							"dimensions": {
								"requestType": "monitoring",
								"httpMethod": "GET",
								"statusCode": "200",
								"protocol": "http1",
								"serviceId": "metricsproxy-container"
							}
						},
						{
							"values": {
								"serverActiveThreads.average": 0,
								"jdisc.thread_pool.work_queue.capacity.max": 650,
								"jdisc.thread_pool.work_queue.size.sum": 0,
								"jdisc.thread_pool.work_queue.size.count": 600,
								"jdisc.thread_pool.work_queue.size.max": 0,
								"jdisc.thread_pool.work_queue.size.min": 0,
								"jdisc.thread_pool.active_threads.sum": 0,
								"jdisc.thread_pool.active_threads.count": 600,
								"jdisc.thread_pool.active_threads.max": 0,
								"jdisc.thread_pool.active_threads.min": 0,
								"jdisc.thread_pool.size.max": 8
							},
							"dimensions": {
								"threadpool": "default-handler-common",
								"serviceId": "metricsproxy-container"
							}
						}
					]
				},
				{
					"name": "vespa.config-sentinel",
					"timestamp": 1704539863,
					"status": {
						"code": "up",
						"description": "Data collected successfully"
					},
					"metrics": [
						{
							"values": {
								"memory_virt": 0,
								"memory_rss": 0,
								"cpu": 0,
								"cpu_util": 0
							},
							"dimensions": {
								"serviceId": "config-sentinel"
							}
						},
						{
							"values": {
								"sentinel.totalRestarts.sum": 0,
								"sentinel.totalRestarts.max": 0,
								"sentinel.totalRestarts.last": 0
							},
							"dimensions": {
								"serviceId": "config-sentinel"
							}
						}
					]
				},
				{
					"name": "vespa.logd",
					"timestamp": 1704539863,
					"status": {
						"code": "up",
						"description": "Data collected successfully"
					},
					"metrics": [
						{
							"values": {
								"memory_virt": 198336512,
								"memory_rss": 14815232,
								"cpu": 0.1513219655042,
								"cpu_util": 0.006305081896
							},
							"dimensions": {
								"serviceId": "logd"
							}
						},
						{
							"values": {},
							"dimensions": {
								"serviceId": "logd"
							}
						}
					]
				}
			]
		},
		{
			"hostname": "vespa-c-1.vespa-c.default.svc.cluster.local",
			"role": "hosts/vespa-c-1.vespa-c.default.svc.cluster.local",
			"services": [
				{
					"name": "vespa.searchnode",
					"timestamp": 1704539861,
					"status": {
						"code": "up",
						"description": "Data collected successfully"
					},
					"metrics": [
						{
							"values": {
								"memory_virt": 3585892352,
								"memory_rss": 413523968,
								"cpu": 1.6809665557696,
								"cpu_util": 0.0700402731571
							},
							"dimensions": {
								"serviceId": "searchnode"
							}
						},
						{
							"values": {
								"content.proton.documentdb.matching.rank_profile.rerank_time.average": 0,
								"content.proton.documentdb.matching.rank_profile.rerank_time.sum": 0,
								"content.proton.documentdb.matching.rank_profile.rerank_time.count": 0,
								"content.proton.documentdb.matching.rank_profile.rerank_time.max": 0,
								"content.proton.documentdb.matching.rank_profile.query_setup_time.average": 0,
								"content.proton.documentdb.matching.rank_profile.query_setup_time.sum": 0,
								"content.proton.documentdb.matching.rank_profile.query_setup_time.count": 0,
								"content.proton.documentdb.matching.rank_profile.query_setup_time.max": 0,
								"content.proton.documentdb.matching.rank_profile.query_latency.average": 0,
								"content.proton.documentdb.matching.rank_profile.query_latency.sum": 0,
								"content.proton.documentdb.matching.rank_profile.query_latency.count": 0,
								"content.proton.documentdb.matching.rank_profile.query_latency.max": 0
							},
							"dimensions": {
								"documenttype": "msmarco",
								"rankProfile": "gse_title_body_all",
								"serviceId": "searchnode"
							}
						},
						{
							"values": {
								"content.proton.documentdb.matching.rank_profile.rerank_time.average": 0,
								"content.proton.documentdb.matching.rank_profile.rerank_time.sum": 0,
								"content.proton.documentdb.matching.rank_profile.rerank_time.count": 0,
								"content.proton.documentdb.matching.rank_profile.rerank_time.max": 0,
								"content.proton.documentdb.matching.rank_profile.query_setup_time.average": 0,
								"content.proton.documentdb.matching.rank_profile.query_setup_time.sum": 0,
								"content.proton.documentdb.matching.rank_profile.query_setup_time.count": 0,
								"content.proton.documentdb.matching.rank_profile.query_setup_time.max": 0,
								"content.proton.documentdb.matching.rank_profile.query_latency.average": 0,
								"content.proton.documentdb.matching.rank_profile.query_latency.sum": 0,
								"content.proton.documentdb.matching.rank_profile.query_latency.count": 0,
								"content.proton.documentdb.matching.rank_profile.query_latency.max": 0
							},
							"dimensions": {
								"documenttype": "msmarco",
								"rankProfile": "bm25_bert_title_body_all",
								"serviceId": "searchnode"
							}
						},
						{
							"values": {
								"content.proton.documentdb.matching.rank_profile.rerank_time.average": 0,
								"content.proton.documentdb.matching.rank_profile.rerank_time.sum": 0,
								"content.proton.documentdb.matching.rank_profile.rerank_time.count": 0,
								"content.proton.documentdb.matching.rank_profile.rerank_time.max": 0,
								"content.proton.documentdb.matching.rank_profile.query_setup_time.average": 0,
								"content.proton.documentdb.matching.rank_profile.query_setup_time.sum": 0,
								"content.proton.documentdb.matching.rank_profile.query_setup_time.count": 0,
								"content.proton.documentdb.matching.rank_profile.query_setup_time.max": 0,
								"content.proton.documentdb.matching.rank_profile.query_latency.average": 0,
								"content.proton.documentdb.matching.rank_profile.query_latency.sum": 0,
								"content.proton.documentdb.matching.rank_profile.query_latency.count": 0,
								"content.proton.documentdb.matching.rank_profile.query_latency.max": 0
							},
							"dimensions": {
								"documenttype": "msmarco",
								"rankProfile": "bm25",
								"serviceId": "searchnode"
							}
						},
						{
							"values": {
								"content.proton.documentdb.matching.rank_profile.rerank_time.average": 0,
								"content.proton.documentdb.matching.rank_profile.rerank_time.sum": 0,
								"content.proton.documentdb.matching.rank_profile.rerank_time.count": 0,
								"content.proton.documentdb.matching.rank_profile.rerank_time.max": 0,
								"content.proton.documentdb.matching.rank_profile.query_setup_time.average": 0,
								"content.proton.documentdb.matching.rank_profile.query_setup_time.sum": 0,
								"content.proton.documentdb.matching.rank_profile.query_setup_time.count": 0,
								"content.proton.documentdb.matching.rank_profile.query_setup_time.max": 0,
								"content.proton.documentdb.matching.rank_profile.query_latency.average": 0,
								"content.proton.documentdb.matching.rank_profile.query_latency.sum": 0,
								"content.proton.documentdb.matching.rank_profile.query_latency.count": 0,
								"content.proton.documentdb.matching.rank_profile.query_latency.max": 0
							},
							"dimensions": {
								"documenttype": "msmarco",
								"rankProfile": "bm25_word2vec_title_body_all",
								"serviceId": "searchnode"
							}
						},
						{
							"values": {
								"content.proton.documentdb.matching.rank_profile.rerank_time.average": 0,
								"content.proton.documentdb.matching.rank_profile.rerank_time.sum": 0,
								"content.proton.documentdb.matching.rank_profile.rerank_time.count": 0,
								"content.proton.documentdb.matching.rank_profile.rerank_time.max": 0,
								"content.proton.documentdb.matching.rank_profile.query_setup_time.average": 0,
								"content.proton.documentdb.matching.rank_profile.query_setup_time.sum": 0,
								"content.proton.documentdb.matching.rank_profile.query_setup_time.count": 0,
								"content.proton.documentdb.matching.rank_profile.query_setup_time.max": 0,
								"content.proton.documentdb.matching.rank_profile.query_latency.average": 0,
								"content.proton.documentdb.matching.rank_profile.query_latency.sum": 0,
								"content.proton.documentdb.matching.rank_profile.query_latency.count": 0,
								"content.proton.documentdb.matching.rank_profile.query_latency.max": 0
							},
							"dimensions": {
								"documenttype": "msmarco",
								"rankProfile": "bert_title_body_all",
								"serviceId": "searchnode"
							}
						},
						{
							"values": {
								"content.proton.documentdb.matching.rank_profile.rerank_time.average": 0,
								"content.proton.documentdb.matching.rank_profile.rerank_time.sum": 0,
								"content.proton.documentdb.matching.rank_profile.rerank_time.count": 0,
								"content.proton.documentdb.matching.rank_profile.rerank_time.max": 0,
								"content.proton.documentdb.matching.rank_profile.query_setup_time.average": 0,
								"content.proton.documentdb.matching.rank_profile.query_setup_time.sum": 0,
								"content.proton.documentdb.matching.rank_profile.query_setup_time.count": 0,
								"content.proton.documentdb.matching.rank_profile.query_setup_time.max": 0,
								"content.proton.documentdb.matching.rank_profile.query_latency.average": 0,
								"content.proton.documentdb.matching.rank_profile.query_latency.sum": 0,
								"content.proton.documentdb.matching.rank_profile.query_latency.count": 0,
								"content.proton.documentdb.matching.rank_profile.query_latency.max": 0
							},
							"dimensions": {
								"documenttype": "msmarco",
								"rankProfile": "collect_rank_features_embeddings",
								"serviceId": "searchnode"
							}
						},
						{
							"values": {
								"content.proton.documentdb.matching.rank_profile.rerank_time.average": 0,
								"content.proton.documentdb.matching.rank_profile.rerank_time.sum": 0,
								"content.proton.documentdb.matching.rank_profile.rerank_time.count": 0,
								"content.proton.documentdb.matching.rank_profile.rerank_time.max": 0,
								"content.proton.documentdb.matching.rank_profile.query_setup_time.average": 0,
								"content.proton.documentdb.matching.rank_profile.query_setup_time.sum": 0,
								"content.proton.documentdb.matching.rank_profile.query_setup_time.count": 0,
								"content.proton.documentdb.matching.rank_profile.query_setup_time.max": 0,
								"content.proton.documentdb.matching.rank_profile.query_latency.average": 0,
								"content.proton.documentdb.matching.rank_profile.query_latency.sum": 0,
								"content.proton.documentdb.matching.rank_profile.query_latency.count": 0,
								"content.proton.documentdb.matching.rank_profile.query_latency.max": 0
							},
							"dimensions": {
								"documenttype": "msmarco",
								"rankProfile": "default",
								"serviceId": "searchnode"
							}
						},
						{
							"values": {
								"content.proton.documentdb.matching.rank_profile.rerank_time.average": 0,
								"content.proton.documentdb.matching.rank_profile.rerank_time.sum": 0,
								"content.proton.documentdb.matching.rank_profile.rerank_time.count": 0,
								"content.proton.documentdb.matching.rank_profile.rerank_time.max": 0,
								"content.proton.documentdb.matching.rank_profile.query_setup_time.average": 0,
								"content.proton.documentdb.matching.rank_profile.query_setup_time.sum": 0,
								"content.proton.documentdb.matching.rank_profile.query_setup_time.count": 0,
								"content.proton.documentdb.matching.rank_profile.query_setup_time.max": 0,
								"content.proton.documentdb.matching.rank_profile.query_latency.average": 0,
								"content.proton.documentdb.matching.rank_profile.query_latency.sum": 0,
								"content.proton.documentdb.matching.rank_profile.query_latency.count": 0,
								"content.proton.documentdb.matching.rank_profile.query_latency.max": 0
							},
							"dimensions": {
								"documenttype": "msmarco",
								"rankProfile": "unranked",
								"serviceId": "searchnode"
							}
						},
						{
							"values": {
								"content.proton.documentdb.matching.rank_profile.rerank_time.average": 0,
								"content.proton.documentdb.matching.rank_profile.rerank_time.sum": 0,
								"content.proton.documentdb.matching.rank_profile.rerank_time.count": 0,
								"content.proton.documentdb.matching.rank_profile.rerank_time.max": 0,
								"content.proton.documentdb.matching.rank_profile.query_setup_time.average": 0,
								"content.proton.documentdb.matching.rank_profile.query_setup_time.sum": 0,
								"content.proton.documentdb.matching.rank_profile.query_setup_time.count": 0,
								"content.proton.documentdb.matching.rank_profile.query_setup_time.max": 0,
								"content.proton.documentdb.matching.rank_profile.query_latency.average": 0,
								"content.proton.documentdb.matching.rank_profile.query_latency.sum": 0,
								"content.proton.documentdb.matching.rank_profile.query_latency.count": 0,
								"content.proton.documentdb.matching.rank_profile.query_latency.max": 0
							},
							"dimensions": {
								"documenttype": "msmarco",
								"rankProfile": "collect_rank_features",
								"serviceId": "searchnode"
							}
						},
						{
							"values": {
								"content.proton.documentdb.matching.rank_profile.rerank_time.average": 0,
								"content.proton.documentdb.matching.rank_profile.rerank_time.sum": 0,
								"content.proton.documentdb.matching.rank_profile.rerank_time.count": 0,
								"content.proton.documentdb.matching.rank_profile.rerank_time.max": 0,
								"content.proton.documentdb.matching.rank_profile.query_setup_time.average": 0,
								"content.proton.documentdb.matching.rank_profile.query_setup_time.sum": 0,
								"content.proton.documentdb.matching.rank_profile.query_setup_time.count": 0,
								"content.proton.documentdb.matching.rank_profile.query_setup_time.max": 0,
								"content.proton.documentdb.matching.rank_profile.query_latency.average": 0,
								"content.proton.documentdb.matching.rank_profile.query_latency.sum": 0,
								"content.proton.documentdb.matching.rank_profile.query_latency.count": 0,
								"content.proton.documentdb.matching.rank_profile.query_latency.max": 0
							},
							"dimensions": {
								"documenttype": "msmarco",
								"rankProfile": "bm25_gse_title_body_all",
								"serviceId": "searchnode"
							}
						},
						{
							"values": {
								"content.proton.resource_usage.disk.average": 0.7594085061429,
								"content.proton.resource_usage.memory.average": 0.2722070848501,
								"content.proton.resource_usage.feeding_blocked.max": 0,
								"content.proton.resource_usage.feeding_blocked.last": 0,
								"content.proton.search_protocol.query.latency.average": 0,
								"content.proton.search_protocol.query.latency.sum": 0,
								"content.proton.search_protocol.query.latency.count": 0,
								"content.proton.search_protocol.query.latency.max": 0,
								"content.proton.search_protocol.docsum.latency.average": 0,
								"content.proton.search_protocol.docsum.latency.sum": 0,
								"content.proton.search_protocol.docsum.latency.count": 0,
								"content.proton.search_protocol.docsum.latency.max": 0,
								"content.proton.search_protocol.docsum.requested_documents.rate": 0,
								"vds.bouncer.clock_skew_aborts.count": 0,
								"vds.filestor.allthreads.put.count.rate": 0,
								"vds.filestor.allthreads.remove.count.rate": 0,
								"vds.filestor.allthreads.update.count.rate": 0
							},
							"dimensions": {
								"serviceId": "searchnode"
							}
						},
						{
							"values": {
								"content.proton.documentdb.matching.docs_matched.rate": 0,
								"content.proton.documentdb.matching.docs_reranked.rate": 0,
								"content.proton.documentdb.documents.active.max": 48854,
								"content.proton.documentdb.documents.active.last": 48854,
								"content.proton.documentdb.documents.ready.max": 97506,
								"content.proton.documentdb.documents.ready.last": 97506,
								"content.proton.documentdb.documents.total.max": 97506,
								"content.proton.documentdb.documents.total.last": 97506,
								"content.proton.documentdb.memory_usage.allocated_bytes.last": 220574840,
								"content.proton.documentdb.disk_usage.last": 1572924731,
								"content.proton.transactionlog.disk_usage.last": 1071336430
							},
							"dimensions": {
								"documenttype": "msmarco",
								"serviceId": "searchnode"
							}
						},
						{
							"values": {
								"content.proton.documentdb.matching.rank_profile.rerank_time.average": 0,
								"content.proton.documentdb.matching.rank_profile.rerank_time.sum": 0,
								"content.proton.documentdb.matching.rank_profile.rerank_time.count": 0,
								"content.proton.documentdb.matching.rank_profile.rerank_time.max": 0,
								"content.proton.documentdb.matching.rank_profile.query_setup_time.average": 0,
								"content.proton.documentdb.matching.rank_profile.query_setup_time.sum": 0,
								"content.proton.documentdb.matching.rank_profile.query_setup_time.count": 0,
								"content.proton.documentdb.matching.rank_profile.query_setup_time.max": 0,
								"content.proton.documentdb.matching.rank_profile.query_latency.average": 0,
								"content.proton.documentdb.matching.rank_profile.query_latency.sum": 0,
								"content.proton.documentdb.matching.rank_profile.query_latency.count": 0,
								"content.proton.documentdb.matching.rank_profile.query_latency.max": 0
							},
							"dimensions": {
								"documenttype": "msmarco",
								"rankProfile": "listwise_linear_bm25",
								"serviceId": "searchnode"
							}
						},
						{
							"values": {
								"content.proton.documentdb.matching.rank_profile.rerank_time.average": 0,
								"content.proton.documentdb.matching.rank_profile.rerank_time.sum": 0,
								"content.proton.documentdb.matching.rank_profile.rerank_time.count": 0,
								"content.proton.documentdb.matching.rank_profile.rerank_time.max": 0,
								"content.proton.documentdb.matching.rank_profile.query_setup_time.average": 0,
								"content.proton.documentdb.matching.rank_profile.query_setup_time.sum": 0,
								"content.proton.documentdb.matching.rank_profile.query_setup_time.count": 0,
								"content.proton.documentdb.matching.rank_profile.query_setup_time.max": 0,
								"content.proton.documentdb.matching.rank_profile.query_latency.average": 0,
								"content.proton.documentdb.matching.rank_profile.query_latency.sum": 0,
								"content.proton.documentdb.matching.rank_profile.query_latency.count": 0,
								"content.proton.documentdb.matching.rank_profile.query_latency.max": 0
							},
							"dimensions": {
								"documenttype": "msmarco",
								"rankProfile": "listwise_linear_bm25_gse_title_body_or",
								"serviceId": "searchnode"
							}
						},
						{
							"values": {
								"content.proton.documentdb.matching.rank_profile.rerank_time.average": 0,
								"content.proton.documentdb.matching.rank_profile.rerank_time.sum": 0,
								"content.proton.documentdb.matching.rank_profile.rerank_time.count": 0,
								"content.proton.documentdb.matching.rank_profile.rerank_time.max": 0,
								"content.proton.documentdb.matching.rank_profile.query_setup_time.average": 0,
								"content.proton.documentdb.matching.rank_profile.query_setup_time.sum": 0,
								"content.proton.documentdb.matching.rank_profile.query_setup_time.count": 0,
								"content.proton.documentdb.matching.rank_profile.query_setup_time.max": 0,
								"content.proton.documentdb.matching.rank_profile.query_latency.average": 0,
								"content.proton.documentdb.matching.rank_profile.query_latency.sum": 0,
								"content.proton.documentdb.matching.rank_profile.query_latency.count": 0,
								"content.proton.documentdb.matching.rank_profile.query_latency.max": 0
							},
							"dimensions": {
								"documenttype": "msmarco",
								"rankProfile": "word2vec_title_body_all",
								"serviceId": "searchnode"
							}
						},
						{
							"values": {
								"content.proton.documentdb.matching.rank_profile.rerank_time.average": 0,
								"content.proton.documentdb.matching.rank_profile.rerank_time.sum": 0,
								"content.proton.documentdb.matching.rank_profile.rerank_time.count": 0,
								"content.proton.documentdb.matching.rank_profile.rerank_time.max": 0,
								"content.proton.documentdb.matching.rank_profile.query_setup_time.average": 0,
								"content.proton.documentdb.matching.rank_profile.query_setup_time.sum": 0,
								"content.proton.documentdb.matching.rank_profile.query_setup_time.count": 0,
								"content.proton.documentdb.matching.rank_profile.query_setup_time.max": 0,
								"content.proton.documentdb.matching.rank_profile.query_latency.average": 0,
								"content.proton.documentdb.matching.rank_profile.query_latency.sum": 0,
								"content.proton.documentdb.matching.rank_profile.query_latency.count": 0,
								"content.proton.documentdb.matching.rank_profile.query_latency.max": 0
							},
							"dimensions": {
								"documenttype": "msmarco",
								"rankProfile": "pointwise_linear_bm25",
								"serviceId": "searchnode"
							}
						},
						{
							"values": {
								"content.proton.documentdb.matching.rank_profile.rerank_time.average": 0,
								"content.proton.documentdb.matching.rank_profile.rerank_time.sum": 0,
								"content.proton.documentdb.matching.rank_profile.rerank_time.count": 0,
								"content.proton.documentdb.matching.rank_profile.rerank_time.max": 0,
								"content.proton.documentdb.matching.rank_profile.query_setup_time.average": 0,
								"content.proton.documentdb.matching.rank_profile.query_setup_time.sum": 0,
								"content.proton.documentdb.matching.rank_profile.query_setup_time.count": 0,
								"content.proton.documentdb.matching.rank_profile.query_setup_time.max": 0,
								"content.proton.documentdb.matching.rank_profile.query_latency.average": 0,
								"content.proton.documentdb.matching.rank_profile.query_latency.sum": 0,
								"content.proton.documentdb.matching.rank_profile.query_latency.count": 0,
								"content.proton.documentdb.matching.rank_profile.query_latency.max": 0
							},
							"dimensions": {
								"documenttype": "msmarco",
								"rankProfile": "listwise_bm25_bert_title_body_all",
								"serviceId": "searchnode"
							}
						},
						{
							"values": {
								"content.proton.documentdb.matching.rank_profile.rerank_time.average": 0,
								"content.proton.documentdb.matching.rank_profile.rerank_time.sum": 0,
								"content.proton.documentdb.matching.rank_profile.rerank_time.count": 0,
								"content.proton.documentdb.matching.rank_profile.rerank_time.max": 0,
								"content.proton.documentdb.matching.rank_profile.query_setup_time.average": 0,
								"content.proton.documentdb.matching.rank_profile.query_setup_time.sum": 0,
								"content.proton.documentdb.matching.rank_profile.query_setup_time.count": 0,
								"content.proton.documentdb.matching.rank_profile.query_setup_time.max": 0,
								"content.proton.documentdb.matching.rank_profile.query_latency.average": 0,
								"content.proton.documentdb.matching.rank_profile.query_latency.sum": 0,
								"content.proton.documentdb.matching.rank_profile.query_latency.count": 0,
								"content.proton.documentdb.matching.rank_profile.query_latency.max": 0
							},
							"dimensions": {
								"documenttype": "msmarco",
								"rankProfile": "listwise_linear_bm25_gse_title_body_and",
								"serviceId": "searchnode"
							}
						}
					]
				},
				{
					"name": "vespa.distributor",
					"timestamp": 1704539861,
					"status": {
						"code": "up",
						"description": "Data collected successfully"
					},
					"metrics": [
						{
							"values": {
								"memory_virt": 608755712,
								"memory_rss": 124448768,
								"cpu": 5.026090001751,
								"cpu_util": 0.2094204167396
							},
							"dimensions": {
								"serviceId": "distributor"
							}
						},
						{
							"values": {
								"vds.bouncer.clock_skew_aborts.count": 0,
								"vds.distributor.docsstored.average": 48854
							},
							"dimensions": {
								"serviceId": "distributor"
							}
						}
					]
				},
				{
					"name": "vespa.metricsproxy-container",
					"timestamp": 1704539861,
					"status": {
						"code": "up",
						"description": "Data collected successfully"
					},
					"metrics": [
						{
							"values": {
								"memory_virt": 1051901952,
								"memory_rss": 199241728,
								"cpu": 1.546489231308,
								"cpu_util": 0.0644370513045
							},
							"dimensions": {
								"serviceId": "metricsproxy-container"
							}
						},
						{
							"values": {
								"serverActiveThreads.average": 0,
								"jdisc.thread_pool.work_queue.capacity.max": 50,
								"jdisc.thread_pool.work_queue.size.sum": 0,
								"jdisc.thread_pool.work_queue.size.count": 599,
								"jdisc.thread_pool.work_queue.size.max": 0,
								"jdisc.thread_pool.work_queue.size.min": 0,
								"jdisc.thread_pool.active_threads.sum": 0,
								"jdisc.thread_pool.active_threads.count": 599,
								"jdisc.thread_pool.active_threads.max": 0,
								"jdisc.thread_pool.active_threads.min": 0,
								"jdisc.thread_pool.size.max": 1
							},
							"dimensions": {
								"threadpool": "default-pool",
								"serviceId": "metricsproxy-container"
							}
						},
						{
							"values": {
								"jdisc.gc.ms.average": 4.5,
								"jdisc.gc.ms.max": 9
							},
							"dimensions": {
								"gcName": "G1YoungGeneration",
								"serviceId": "metricsproxy-container"
							}
						},
						{
							"values": {
								"http.status.2xx.rate": 0.0333333333333
							},
							"dimensions": {
								"httpMethod": "GET",
								"requestType": "read",
								"protocol": "http1",
								"statusCode": "200",
								"serviceId": "metricsproxy-container"
							}
						},
						{
							"values": {
								"jdisc.gc.ms.average": 0,
								"jdisc.gc.ms.max": 0
							},
							"dimensions": {
								"gcName": "G1OldGeneration",
								"serviceId": "metricsproxy-container"
							}
						},
						{
							"values": {
								"mem.heap.free.average": 81204145.33333333
							},
							"dimensions": {
								"serviceId": "metricsproxy-container"
							}
						},
						{
							"values": {
								"http.status.2xx.rate": 0.0333333333333
							},
							"dimensions": {
								"httpMethod": "GET",
								"requestType": "monitoring",
								"protocol": "http1",
								"statusCode": "200",
								"serviceId": "metricsproxy-container"
							}
						},
						{
							"values": {
								"serverActiveThreads.average": 0,
								"jdisc.thread_pool.work_queue.capacity.max": 650,
								"jdisc.thread_pool.work_queue.size.sum": 0,
								"jdisc.thread_pool.work_queue.size.count": 600,
								"jdisc.thread_pool.work_queue.size.max": 0,
								"jdisc.thread_pool.work_queue.size.min": 0,
								"jdisc.thread_pool.active_threads.sum": 0,
								"jdisc.thread_pool.active_threads.count": 600,
								"jdisc.thread_pool.active_threads.max": 0,
								"jdisc.thread_pool.active_threads.min": 0,
								"jdisc.thread_pool.size.max": 8
							},
							"dimensions": {
								"threadpool": "default-handler-common",
								"serviceId": "metricsproxy-container"
							}
						}
					]
				},
				{
					"name": "vespa.config-sentinel",
					"timestamp": 1704539861,
					"status": {
						"code": "up",
						"description": "Data collected successfully"
					},
					"metrics": [
						{
							"values": {
								"memory_virt": 0,
								"memory_rss": 0,
								"cpu": 0,
								"cpu_util": 0
							},
							"dimensions": {
								"serviceId": "config-sentinel"
							}
						},
						{
							"values": {
								"sentinel.totalRestarts.sum": 600,
								"sentinel.totalRestarts.max": 1,
								"sentinel.totalRestarts.last": 1
							},
							"dimensions": {
								"serviceId": "config-sentinel"
							}
						}
					]
				},
				{
					"name": "vespa.logd",
					"timestamp": 1704539861,
					"status": {
						"code": "up",
						"description": "Data collected successfully"
					},
					"metrics": [
						{
							"values": {
								"memory_virt": 198340608,
								"memory_rss": 14909440,
								"cpu": 0.1344773244616,
								"cpu_util": 0.0056032218526
							},
							"dimensions": {
								"serviceId": "logd"
							}
						},
						{
							"values": {},
							"dimensions": {
								"serviceId": "logd"
							}
						}
					]
				}
			]
		}
	]
};

export const metrics2Node = {
	"nodes": [
		{
			"hostname": "vespa-msmarco",
			"role": "hosts/vespa-msmarco",
			"services": [
				{
					"name": "vespa.container",
					"timestamp": 1704449677,
					"status": {
						"code": "up",
						"description": "Data collected successfully"
					},
					"metrics": [
						{
							"values": {
								"memory_virt": 3995074560,
								"memory_rss": 1643892736,
								"cpu": 1.3583956397177,
								"cpu_util": 0.0565998183216
							},
							"dimensions": {
								"serviceId": "container"
							}
						},
						{
							"values": {
								"http.status.2xx.rate": 0
							},
							"dimensions": {
								"httpMethod": "POST",
								"requestType": "read",
								"protocol": "http1",
								"statusCode": "200",
								"serviceId": "container"
							}
						},
						{
							"values": {
								"http.status.2xx.rate": 0.0333333333333
							},
							"dimensions": {
								"httpMethod": "GET",
								"requestType": "monitoring",
								"protocol": "http1",
								"statusCode": "200",
								"serviceId": "container"
							}
						},
						{
							"values": {
								"http.status.2xx.rate": 0
							},
							"dimensions": {
								"httpMethod": "GET",
								"requestType": "read",
								"protocol": "http1",
								"statusCode": "200",
								"serviceId": "container"
							}
						},
						{
							"values": {
								"jdisc.gc.ms.average": 0,
								"jdisc.gc.ms.max": 0
							},
							"dimensions": {
								"gcName": "G1OldGeneration",
								"serviceId": "container"
							}
						},
						{
							"values": {
								"hits_per_query.average": 10,
								"hits_per_query.sum": 0,
								"hits_per_query.count": 0,
								"hits_per_query.max": 10,
								"queries.rate": 0,
								"query_latency.average": 9,
								"query_latency.sum": 0,
								"query_latency.count": 0,
								"query_latency.max": 9,
								"totalhits_per_query.average": 99621,
								"totalhits_per_query.sum": 0,
								"totalhits_per_query.count": 0,
								"totalhits_per_query.max": 99621
							},
							"dimensions": {
								"chain": "vespa",
								"serviceId": "container"
							}
						},
						{
							"values": {
								"serverActiveThreads.average": 0,
								"jdisc.thread_pool.work_queue.capacity.max": 500,
								"jdisc.thread_pool.work_queue.size.sum": 0,
								"jdisc.thread_pool.work_queue.size.count": 600,
								"jdisc.thread_pool.work_queue.size.max": 0,
								"jdisc.thread_pool.work_queue.size.min": 0,
								"jdisc.thread_pool.active_threads.sum": 0,
								"jdisc.thread_pool.active_threads.count": 600,
								"jdisc.thread_pool.active_threads.max": 0,
								"jdisc.thread_pool.active_threads.min": 0,
								"jdisc.thread_pool.size.max": 96
							},
							"dimensions": {
								"threadpool": "feedapi-handler",
								"serviceId": "container"
							}
						},
						{
							"values": {
								"http.status.4xx.rate": 0
							},
							"dimensions": {
								"httpMethod": "GET",
								"requestType": "read",
								"protocol": "http1",
								"statusCode": "404",
								"serviceId": "container"
							}
						},
						{
							"values": {
								"mem.heap.free.average": 743975388
							},
							"dimensions": {
								"serviceId": "container"
							}
						},
						{
							"values": {
								"http.status.4xx.rate": 0
							},
							"dimensions": {
								"httpMethod": "POST",
								"requestType": "write",
								"protocol": "http1",
								"statusCode": "404",
								"serviceId": "container"
							}
						},
						{
							"values": {
								"serverActiveThreads.average": 0,
								"jdisc.thread_pool.work_queue.capacity.max": 2400,
								"jdisc.thread_pool.work_queue.size.sum": 0,
								"jdisc.thread_pool.work_queue.size.count": 600,
								"jdisc.thread_pool.work_queue.size.max": 0,
								"jdisc.thread_pool.work_queue.size.min": 0,
								"jdisc.thread_pool.active_threads.sum": 0,
								"jdisc.thread_pool.active_threads.count": 600,
								"jdisc.thread_pool.active_threads.max": 0,
								"jdisc.thread_pool.active_threads.min": 0,
								"jdisc.thread_pool.size.max": 48
							},
							"dimensions": {
								"threadpool": "default-pool",
								"serviceId": "container"
							}
						},
						{
							"values": {
								"serverActiveThreads.average": 0,
								"jdisc.thread_pool.work_queue.capacity.max": 1920,
								"jdisc.thread_pool.work_queue.size.sum": 0,
								"jdisc.thread_pool.work_queue.size.count": 600,
								"jdisc.thread_pool.work_queue.size.max": 0,
								"jdisc.thread_pool.work_queue.size.min": 0,
								"jdisc.thread_pool.active_threads.sum": 0,
								"jdisc.thread_pool.active_threads.count": 600,
								"jdisc.thread_pool.active_threads.max": 0,
								"jdisc.thread_pool.active_threads.min": 0,
								"jdisc.thread_pool.size.max": 48
							},
							"dimensions": {
								"threadpool": "default-handler-common",
								"serviceId": "container"
							}
						},
						{
							"values": {
								"jdisc.gc.ms.average": 0,
								"jdisc.gc.ms.max": 0
							},
							"dimensions": {
								"gcName": "G1YoungGeneration",
								"serviceId": "container"
							}
						},
						{
							"values": {
								"serverActiveThreads.average": 0,
								"jdisc.thread_pool.work_queue.size.sum": 0,
								"jdisc.thread_pool.work_queue.size.count": 600,
								"jdisc.thread_pool.work_queue.size.max": 0,
								"jdisc.thread_pool.work_queue.size.min": 0,
								"jdisc.thread_pool.work_queue.capacity.max": 1920,
								"jdisc.thread_pool.active_threads.sum": 0,
								"jdisc.thread_pool.active_threads.count": 600,
								"jdisc.thread_pool.active_threads.max": 0,
								"jdisc.thread_pool.active_threads.min": 0,
								"jdisc.thread_pool.size.max": 48
							},
							"dimensions": {
								"threadpool": "search-handler",
								"serviceId": "container"
							}
						}
					]
				},
				{
					"name": "vespa.configserver",
					"timestamp": 1704449677,
					"status": {
						"code": "up",
						"description": "Data collected successfully"
					},
					"metrics": [
						{
							"values": {
								"memory_virt": 0,
								"memory_rss": 0,
								"cpu": 0,
								"cpu_util": 0
							},
							"dimensions": {
								"serviceId": "configserver"
							}
						},
						{
							"values": {
								"http.status.2xx.rate": 0.05
							},
							"dimensions": {
								"httpMethod": "GET",
								"requestType": "monitoring",
								"protocol": "http1",
								"statusCode": "200",
								"serviceId": "configserver"
							}
						},
						{
							"values": {
								"jdisc.gc.ms.average": 0,
								"jdisc.gc.ms.max": 0
							},
							"dimensions": {
								"gcName": "G1OldGeneration",
								"serviceId": "configserver"
							}
						},
						{
							"values": {
								"mem.heap.free.average": 75112829.33333333
							},
							"dimensions": {
								"serviceId": "configserver"
							}
						},
						{
							"values": {
								"http.status.4xx.rate": 0.0166666666667
							},
							"dimensions": {
								"httpMethod": "GET",
								"requestType": "read",
								"protocol": "http1",
								"statusCode": "404",
								"serviceId": "configserver"
							}
						},
						{
							"values": {
								"serverActiveThreads.average": 0,
								"jdisc.thread_pool.work_queue.capacity.max": 1920,
								"jdisc.thread_pool.work_queue.size.sum": 0,
								"jdisc.thread_pool.work_queue.size.count": 600,
								"jdisc.thread_pool.work_queue.size.max": 0,
								"jdisc.thread_pool.work_queue.size.min": 0,
								"jdisc.thread_pool.active_threads.sum": 0,
								"jdisc.thread_pool.active_threads.count": 600,
								"jdisc.thread_pool.active_threads.max": 0,
								"jdisc.thread_pool.active_threads.min": 0,
								"jdisc.thread_pool.size.max": 48
							},
							"dimensions": {
								"threadpool": "default-handler-common",
								"serviceId": "configserver"
							}
						},
						{
							"values": {
								"jdisc.gc.ms.average": 0,
								"jdisc.gc.ms.max": 0
							},
							"dimensions": {
								"gcName": "G1YoungGeneration",
								"serviceId": "configserver"
							}
						},
						{
							"values": {
								"http.status.2xx.rate": 0.0666666666667
							},
							"dimensions": {
								"httpMethod": "GET",
								"requestType": "read",
								"protocol": "http1",
								"statusCode": "200",
								"serviceId": "configserver"
							}
						},
						{
							"values": {
								"serverActiveThreads.average": 0,
								"jdisc.thread_pool.work_queue.capacity.max": 2400,
								"jdisc.thread_pool.work_queue.size.sum": 0,
								"jdisc.thread_pool.work_queue.size.count": 600,
								"jdisc.thread_pool.work_queue.size.max": 0,
								"jdisc.thread_pool.work_queue.size.min": 0,
								"jdisc.thread_pool.active_threads.sum": 0,
								"jdisc.thread_pool.active_threads.count": 600,
								"jdisc.thread_pool.active_threads.max": 0,
								"jdisc.thread_pool.active_threads.min": 0,
								"jdisc.thread_pool.size.max": 48
							},
							"dimensions": {
								"threadpool": "default-pool",
								"serviceId": "configserver"
							}
						}
					]
				},
				{
					"name": "vespa.logserver",
					"timestamp": 1704449677,
					"status": {
						"code": "up",
						"description": "Data collected successfully"
					},
					"metrics": [
						{
							"values": {
								"memory_virt": 937922560,
								"memory_rss": 110960640,
								"cpu": 0.1006218992383,
								"cpu_util": 0.0041925791349
							},
							"dimensions": {
								"serviceId": "logserver"
							}
						},
						{
							"values": {},
							"dimensions": {
								"serviceId": "logserver"
							}
						}
					]
				},
				{
					"name": "vespa.searchnode",
					"timestamp": 1704449677,
					"status": {
						"code": "up",
						"description": "Data collected successfully"
					},
					"metrics": [
						{
							"values": {
								"memory_virt": 3748167680,
								"memory_rss": 388005888,
								"cpu": 1.3919362727971,
								"cpu_util": 0.0579973446999
							},
							"dimensions": {
								"serviceId": "searchnode"
							}
						},
						{
							"values": {
								"content.proton.documentdb.matching.rank_profile.rerank_time.average": 0,
								"content.proton.documentdb.matching.rank_profile.rerank_time.sum": 0,
								"content.proton.documentdb.matching.rank_profile.rerank_time.count": 0,
								"content.proton.documentdb.matching.rank_profile.rerank_time.max": 0,
								"content.proton.documentdb.matching.rank_profile.query_setup_time.average": 0,
								"content.proton.documentdb.matching.rank_profile.query_setup_time.sum": 0,
								"content.proton.documentdb.matching.rank_profile.query_setup_time.count": 0,
								"content.proton.documentdb.matching.rank_profile.query_setup_time.max": 0,
								"content.proton.documentdb.matching.rank_profile.query_latency.average": 0,
								"content.proton.documentdb.matching.rank_profile.query_latency.sum": 0,
								"content.proton.documentdb.matching.rank_profile.query_latency.count": 0,
								"content.proton.documentdb.matching.rank_profile.query_latency.max": 0
							},
							"dimensions": {
								"documenttype": "msmarco",
								"rankProfile": "gse_title_body_all",
								"serviceId": "searchnode"
							}
						},
						{
							"values": {
								"content.proton.documentdb.matching.rank_profile.rerank_time.average": 0,
								"content.proton.documentdb.matching.rank_profile.rerank_time.sum": 0,
								"content.proton.documentdb.matching.rank_profile.rerank_time.count": 0,
								"content.proton.documentdb.matching.rank_profile.rerank_time.max": 0,
								"content.proton.documentdb.matching.rank_profile.query_setup_time.average": 0,
								"content.proton.documentdb.matching.rank_profile.query_setup_time.sum": 0,
								"content.proton.documentdb.matching.rank_profile.query_setup_time.count": 0,
								"content.proton.documentdb.matching.rank_profile.query_setup_time.max": 0,
								"content.proton.documentdb.matching.rank_profile.query_latency.average": 0,
								"content.proton.documentdb.matching.rank_profile.query_latency.sum": 0,
								"content.proton.documentdb.matching.rank_profile.query_latency.count": 0,
								"content.proton.documentdb.matching.rank_profile.query_latency.max": 0
							},
							"dimensions": {
								"documenttype": "msmarco",
								"rankProfile": "bm25_bert_title_body_all",
								"serviceId": "searchnode"
							}
						},
						{
							"values": {
								"content.proton.documentdb.matching.rank_profile.rerank_time.average": 0,
								"content.proton.documentdb.matching.rank_profile.rerank_time.sum": 0,
								"content.proton.documentdb.matching.rank_profile.rerank_time.count": 0,
								"content.proton.documentdb.matching.rank_profile.rerank_time.max": 0,
								"content.proton.documentdb.matching.rank_profile.query_setup_time.average": 0,
								"content.proton.documentdb.matching.rank_profile.query_setup_time.sum": 0,
								"content.proton.documentdb.matching.rank_profile.query_setup_time.count": 0,
								"content.proton.documentdb.matching.rank_profile.query_setup_time.max": 0,
								"content.proton.documentdb.matching.rank_profile.query_latency.average": 0,
								"content.proton.documentdb.matching.rank_profile.query_latency.sum": 0,
								"content.proton.documentdb.matching.rank_profile.query_latency.count": 0,
								"content.proton.documentdb.matching.rank_profile.query_latency.max": 0
							},
							"dimensions": {
								"documenttype": "msmarco",
								"rankProfile": "bm25",
								"serviceId": "searchnode"
							}
						},
						{
							"values": {
								"content.proton.documentdb.matching.rank_profile.rerank_time.average": 0,
								"content.proton.documentdb.matching.rank_profile.rerank_time.sum": 0,
								"content.proton.documentdb.matching.rank_profile.rerank_time.count": 0,
								"content.proton.documentdb.matching.rank_profile.rerank_time.max": 0,
								"content.proton.documentdb.matching.rank_profile.query_setup_time.average": 0,
								"content.proton.documentdb.matching.rank_profile.query_setup_time.sum": 0,
								"content.proton.documentdb.matching.rank_profile.query_setup_time.count": 0,
								"content.proton.documentdb.matching.rank_profile.query_setup_time.max": 0,
								"content.proton.documentdb.matching.rank_profile.query_latency.average": 0,
								"content.proton.documentdb.matching.rank_profile.query_latency.sum": 0,
								"content.proton.documentdb.matching.rank_profile.query_latency.count": 0,
								"content.proton.documentdb.matching.rank_profile.query_latency.max": 0
							},
							"dimensions": {
								"documenttype": "msmarco",
								"rankProfile": "bm25_word2vec_title_body_all",
								"serviceId": "searchnode"
							}
						},
						{
							"values": {
								"content.proton.documentdb.matching.rank_profile.rerank_time.average": 0,
								"content.proton.documentdb.matching.rank_profile.rerank_time.sum": 0,
								"content.proton.documentdb.matching.rank_profile.rerank_time.count": 0,
								"content.proton.documentdb.matching.rank_profile.rerank_time.max": 0,
								"content.proton.documentdb.matching.rank_profile.query_setup_time.average": 0,
								"content.proton.documentdb.matching.rank_profile.query_setup_time.sum": 0,
								"content.proton.documentdb.matching.rank_profile.query_setup_time.count": 0,
								"content.proton.documentdb.matching.rank_profile.query_setup_time.max": 0,
								"content.proton.documentdb.matching.rank_profile.query_latency.average": 0,
								"content.proton.documentdb.matching.rank_profile.query_latency.sum": 0,
								"content.proton.documentdb.matching.rank_profile.query_latency.count": 0,
								"content.proton.documentdb.matching.rank_profile.query_latency.max": 0
							},
							"dimensions": {
								"documenttype": "msmarco",
								"rankProfile": "bert_title_body_all",
								"serviceId": "searchnode"
							}
						},
						{
							"values": {
								"content.proton.documentdb.matching.rank_profile.rerank_time.average": 0,
								"content.proton.documentdb.matching.rank_profile.rerank_time.sum": 0,
								"content.proton.documentdb.matching.rank_profile.rerank_time.count": 0,
								"content.proton.documentdb.matching.rank_profile.rerank_time.max": 0,
								"content.proton.documentdb.matching.rank_profile.query_setup_time.average": 0,
								"content.proton.documentdb.matching.rank_profile.query_setup_time.sum": 0,
								"content.proton.documentdb.matching.rank_profile.query_setup_time.count": 0,
								"content.proton.documentdb.matching.rank_profile.query_setup_time.max": 0,
								"content.proton.documentdb.matching.rank_profile.query_latency.average": 0,
								"content.proton.documentdb.matching.rank_profile.query_latency.sum": 0,
								"content.proton.documentdb.matching.rank_profile.query_latency.count": 0,
								"content.proton.documentdb.matching.rank_profile.query_latency.max": 0
							},
							"dimensions": {
								"documenttype": "msmarco",
								"rankProfile": "collect_rank_features_embeddings",
								"serviceId": "searchnode"
							}
						},
						{
							"values": {
								"content.proton.documentdb.matching.rank_profile.rerank_time.average": 0,
								"content.proton.documentdb.matching.rank_profile.rerank_time.sum": 0,
								"content.proton.documentdb.matching.rank_profile.rerank_time.count": 0,
								"content.proton.documentdb.matching.rank_profile.rerank_time.max": 0,
								"content.proton.documentdb.matching.rank_profile.query_setup_time.average": 0,
								"content.proton.documentdb.matching.rank_profile.query_setup_time.sum": 0,
								"content.proton.documentdb.matching.rank_profile.query_setup_time.count": 0,
								"content.proton.documentdb.matching.rank_profile.query_setup_time.max": 0,
								"content.proton.documentdb.matching.rank_profile.query_latency.average": 0,
								"content.proton.documentdb.matching.rank_profile.query_latency.sum": 0,
								"content.proton.documentdb.matching.rank_profile.query_latency.count": 0,
								"content.proton.documentdb.matching.rank_profile.query_latency.max": 0
							},
							"dimensions": {
								"documenttype": "msmarco",
								"rankProfile": "default",
								"serviceId": "searchnode"
							}
						},
						{
							"values": {
								"content.proton.documentdb.matching.rank_profile.rerank_time.average": 0,
								"content.proton.documentdb.matching.rank_profile.rerank_time.sum": 0,
								"content.proton.documentdb.matching.rank_profile.rerank_time.count": 0,
								"content.proton.documentdb.matching.rank_profile.rerank_time.max": 0,
								"content.proton.documentdb.matching.rank_profile.query_setup_time.average": 0,
								"content.proton.documentdb.matching.rank_profile.query_setup_time.sum": 0,
								"content.proton.documentdb.matching.rank_profile.query_setup_time.count": 0,
								"content.proton.documentdb.matching.rank_profile.query_setup_time.max": 0,
								"content.proton.documentdb.matching.rank_profile.query_latency.average": 0,
								"content.proton.documentdb.matching.rank_profile.query_latency.sum": 0,
								"content.proton.documentdb.matching.rank_profile.query_latency.count": 0,
								"content.proton.documentdb.matching.rank_profile.query_latency.max": 0
							},
							"dimensions": {
								"documenttype": "msmarco",
								"rankProfile": "unranked",
								"serviceId": "searchnode"
							}
						},
						{
							"values": {
								"content.proton.documentdb.matching.rank_profile.rerank_time.average": 0,
								"content.proton.documentdb.matching.rank_profile.rerank_time.sum": 0,
								"content.proton.documentdb.matching.rank_profile.rerank_time.count": 0,
								"content.proton.documentdb.matching.rank_profile.rerank_time.max": 0,
								"content.proton.documentdb.matching.rank_profile.query_setup_time.average": 0,
								"content.proton.documentdb.matching.rank_profile.query_setup_time.sum": 0,
								"content.proton.documentdb.matching.rank_profile.query_setup_time.count": 0,
								"content.proton.documentdb.matching.rank_profile.query_setup_time.max": 0,
								"content.proton.documentdb.matching.rank_profile.query_latency.average": 0,
								"content.proton.documentdb.matching.rank_profile.query_latency.sum": 0,
								"content.proton.documentdb.matching.rank_profile.query_latency.count": 0,
								"content.proton.documentdb.matching.rank_profile.query_latency.max": 0
							},
							"dimensions": {
								"documenttype": "msmarco",
								"rankProfile": "collect_rank_features",
								"serviceId": "searchnode"
							}
						},
						{
							"values": {
								"content.proton.documentdb.matching.rank_profile.rerank_time.average": 0,
								"content.proton.documentdb.matching.rank_profile.rerank_time.sum": 0,
								"content.proton.documentdb.matching.rank_profile.rerank_time.count": 0,
								"content.proton.documentdb.matching.rank_profile.rerank_time.max": 0,
								"content.proton.documentdb.matching.rank_profile.query_setup_time.average": 0,
								"content.proton.documentdb.matching.rank_profile.query_setup_time.sum": 0,
								"content.proton.documentdb.matching.rank_profile.query_setup_time.count": 0,
								"content.proton.documentdb.matching.rank_profile.query_setup_time.max": 0,
								"content.proton.documentdb.matching.rank_profile.query_latency.average": 0,
								"content.proton.documentdb.matching.rank_profile.query_latency.sum": 0,
								"content.proton.documentdb.matching.rank_profile.query_latency.count": 0,
								"content.proton.documentdb.matching.rank_profile.query_latency.max": 0
							},
							"dimensions": {
								"documenttype": "msmarco",
								"rankProfile": "bm25_gse_title_body_all",
								"serviceId": "searchnode"
							}
						},
						{
							"values": {
								"content.proton.resource_usage.disk.average": 0.7437728046231,
								"content.proton.resource_usage.memory.average": 0.022410228538,
								"content.proton.resource_usage.feeding_blocked.max": 0,
								"content.proton.resource_usage.feeding_blocked.last": 0,
								"content.proton.search_protocol.query.latency.average": 0,
								"content.proton.search_protocol.query.latency.sum": 0,
								"content.proton.search_protocol.query.latency.count": 0,
								"content.proton.search_protocol.query.latency.max": 0,
								"content.proton.search_protocol.docsum.latency.average": 0,
								"content.proton.search_protocol.docsum.latency.sum": 0,
								"content.proton.search_protocol.docsum.latency.count": 0,
								"content.proton.search_protocol.docsum.latency.max": 0,
								"content.proton.search_protocol.docsum.requested_documents.rate": 0,
								"vds.bouncer.clock_skew_aborts.count": 0,
								"vds.filestor.allthreads.put.count.rate": 0,
								"vds.filestor.allthreads.remove.count.rate": 0,
								"vds.filestor.allthreads.update.count.rate": 0
							},
							"dimensions": {
								"serviceId": "searchnode"
							}
						},
						{
							"values": {
								"content.proton.documentdb.matching.docs_matched.rate": 0,
								"content.proton.documentdb.matching.docs_reranked.rate": 0,
								"content.proton.documentdb.documents.active.max": 99621,
								"content.proton.documentdb.documents.active.last": 99621,
								"content.proton.documentdb.documents.ready.max": 99621,
								"content.proton.documentdb.documents.ready.last": 99621,
								"content.proton.documentdb.documents.total.max": 99621,
								"content.proton.documentdb.documents.total.last": 99621,
								"content.proton.documentdb.memory_usage.allocated_bytes.last": 32683114,
								"content.proton.documentdb.disk_usage.last": 1615806776,
								"content.proton.transactionlog.disk_usage.last": 41108192
							},
							"dimensions": {
								"documenttype": "msmarco",
								"serviceId": "searchnode"
							}
						},
						{
							"values": {
								"content.proton.documentdb.matching.rank_profile.rerank_time.average": 0,
								"content.proton.documentdb.matching.rank_profile.rerank_time.sum": 0,
								"content.proton.documentdb.matching.rank_profile.rerank_time.count": 0,
								"content.proton.documentdb.matching.rank_profile.rerank_time.max": 0,
								"content.proton.documentdb.matching.rank_profile.query_setup_time.average": 0,
								"content.proton.documentdb.matching.rank_profile.query_setup_time.sum": 0,
								"content.proton.documentdb.matching.rank_profile.query_setup_time.count": 0,
								"content.proton.documentdb.matching.rank_profile.query_setup_time.max": 0,
								"content.proton.documentdb.matching.rank_profile.query_latency.average": 0,
								"content.proton.documentdb.matching.rank_profile.query_latency.sum": 0,
								"content.proton.documentdb.matching.rank_profile.query_latency.count": 0,
								"content.proton.documentdb.matching.rank_profile.query_latency.max": 0
							},
							"dimensions": {
								"documenttype": "msmarco",
								"rankProfile": "listwise_linear_bm25",
								"serviceId": "searchnode"
							}
						},
						{
							"values": {
								"content.proton.documentdb.matching.rank_profile.rerank_time.average": 0,
								"content.proton.documentdb.matching.rank_profile.rerank_time.sum": 0,
								"content.proton.documentdb.matching.rank_profile.rerank_time.count": 0,
								"content.proton.documentdb.matching.rank_profile.rerank_time.max": 0,
								"content.proton.documentdb.matching.rank_profile.query_setup_time.average": 0,
								"content.proton.documentdb.matching.rank_profile.query_setup_time.sum": 0,
								"content.proton.documentdb.matching.rank_profile.query_setup_time.count": 0,
								"content.proton.documentdb.matching.rank_profile.query_setup_time.max": 0,
								"content.proton.documentdb.matching.rank_profile.query_latency.average": 0,
								"content.proton.documentdb.matching.rank_profile.query_latency.sum": 0,
								"content.proton.documentdb.matching.rank_profile.query_latency.count": 0,
								"content.proton.documentdb.matching.rank_profile.query_latency.max": 0
							},
							"dimensions": {
								"documenttype": "msmarco",
								"rankProfile": "listwise_linear_bm25_gse_title_body_or",
								"serviceId": "searchnode"
							}
						},
						{
							"values": {
								"content.proton.documentdb.matching.rank_profile.rerank_time.average": 0,
								"content.proton.documentdb.matching.rank_profile.rerank_time.sum": 0,
								"content.proton.documentdb.matching.rank_profile.rerank_time.count": 0,
								"content.proton.documentdb.matching.rank_profile.rerank_time.max": 0,
								"content.proton.documentdb.matching.rank_profile.query_setup_time.average": 0,
								"content.proton.documentdb.matching.rank_profile.query_setup_time.sum": 0,
								"content.proton.documentdb.matching.rank_profile.query_setup_time.count": 0,
								"content.proton.documentdb.matching.rank_profile.query_setup_time.max": 0,
								"content.proton.documentdb.matching.rank_profile.query_latency.average": 0,
								"content.proton.documentdb.matching.rank_profile.query_latency.sum": 0,
								"content.proton.documentdb.matching.rank_profile.query_latency.count": 0,
								"content.proton.documentdb.matching.rank_profile.query_latency.max": 0
							},
							"dimensions": {
								"documenttype": "msmarco",
								"rankProfile": "word2vec_title_body_all",
								"serviceId": "searchnode"
							}
						},
						{
							"values": {
								"content.proton.documentdb.matching.rank_profile.rerank_time.average": 0,
								"content.proton.documentdb.matching.rank_profile.rerank_time.sum": 0,
								"content.proton.documentdb.matching.rank_profile.rerank_time.count": 0,
								"content.proton.documentdb.matching.rank_profile.rerank_time.max": 0,
								"content.proton.documentdb.matching.rank_profile.query_setup_time.average": 0,
								"content.proton.documentdb.matching.rank_profile.query_setup_time.sum": 0,
								"content.proton.documentdb.matching.rank_profile.query_setup_time.count": 0,
								"content.proton.documentdb.matching.rank_profile.query_setup_time.max": 0,
								"content.proton.documentdb.matching.rank_profile.query_latency.average": 0,
								"content.proton.documentdb.matching.rank_profile.query_latency.sum": 0,
								"content.proton.documentdb.matching.rank_profile.query_latency.count": 0,
								"content.proton.documentdb.matching.rank_profile.query_latency.max": 0
							},
							"dimensions": {
								"documenttype": "msmarco",
								"rankProfile": "pointwise_linear_bm25",
								"serviceId": "searchnode"
							}
						},
						{
							"values": {
								"content.proton.documentdb.matching.rank_profile.rerank_time.average": 0,
								"content.proton.documentdb.matching.rank_profile.rerank_time.sum": 0,
								"content.proton.documentdb.matching.rank_profile.rerank_time.count": 0,
								"content.proton.documentdb.matching.rank_profile.rerank_time.max": 0,
								"content.proton.documentdb.matching.rank_profile.query_setup_time.average": 0,
								"content.proton.documentdb.matching.rank_profile.query_setup_time.sum": 0,
								"content.proton.documentdb.matching.rank_profile.query_setup_time.count": 0,
								"content.proton.documentdb.matching.rank_profile.query_setup_time.max": 0,
								"content.proton.documentdb.matching.rank_profile.query_latency.average": 0,
								"content.proton.documentdb.matching.rank_profile.query_latency.sum": 0,
								"content.proton.documentdb.matching.rank_profile.query_latency.count": 0,
								"content.proton.documentdb.matching.rank_profile.query_latency.max": 0
							},
							"dimensions": {
								"documenttype": "msmarco",
								"rankProfile": "listwise_bm25_bert_title_body_all",
								"serviceId": "searchnode"
							}
						},
						{
							"values": {
								"content.proton.documentdb.matching.rank_profile.rerank_time.average": 0,
								"content.proton.documentdb.matching.rank_profile.rerank_time.sum": 0,
								"content.proton.documentdb.matching.rank_profile.rerank_time.count": 0,
								"content.proton.documentdb.matching.rank_profile.rerank_time.max": 0,
								"content.proton.documentdb.matching.rank_profile.query_setup_time.average": 0,
								"content.proton.documentdb.matching.rank_profile.query_setup_time.sum": 0,
								"content.proton.documentdb.matching.rank_profile.query_setup_time.count": 0,
								"content.proton.documentdb.matching.rank_profile.query_setup_time.max": 0,
								"content.proton.documentdb.matching.rank_profile.query_latency.average": 0,
								"content.proton.documentdb.matching.rank_profile.query_latency.sum": 0,
								"content.proton.documentdb.matching.rank_profile.query_latency.count": 0,
								"content.proton.documentdb.matching.rank_profile.query_latency.max": 0
							},
							"dimensions": {
								"documenttype": "msmarco",
								"rankProfile": "listwise_linear_bm25_gse_title_body_and",
								"serviceId": "searchnode"
							}
						}
					]
				},
				{
					"name": "vespa.distributor",
					"timestamp": 1704449677,
					"status": {
						"code": "up",
						"description": "Data collected successfully"
					},
					"metrics": [
						{
							"values": {
								"memory_virt": 572960768,
								"memory_rss": 136019968,
								"cpu": 4.9807840122982,
								"cpu_util": 0.2075326671791
							},
							"dimensions": {
								"serviceId": "distributor"
							}
						},
						{
							"values": {
								"vds.bouncer.clock_skew_aborts.count": 0,
								"vds.distributor.docsstored.average": 99621
							},
							"dimensions": {
								"serviceId": "distributor"
							}
						}
					]
				},
				{
					"name": "vespa.container-clustercontroller",
					"timestamp": 1704449677,
					"status": {
						"code": "up",
						"description": "Data collected successfully"
					},
					"metrics": [
						{
							"values": {
								"memory_virt": 822845440,
								"memory_rss": 215052288,
								"cpu": 1.0733002585424,
								"cpu_util": 0.0447208441059
							},
							"dimensions": {
								"serviceId": "container-clustercontroller"
							}
						},
						{
							"values": {
								"jdisc.gc.ms.average": 0,
								"jdisc.gc.ms.max": 0
							},
							"dimensions": {
								"gcName": "MarkSweepCompact",
								"serviceId": "container-clustercontroller"
							}
						},
						{
							"values": {
								"cluster-controller.maintenance.count.last": 0,
								"cluster-controller.maintenance.count.max": 0,
								"cluster-controller.down.count.last": 0,
								"cluster-controller.down.count.max": 0,
								"cluster-controller.up.count.last": 1,
								"cluster-controller.up.count.max": 1
							},
							"dimensions": {
								"node-type": "distributor",
								"cluster": "msmarco",
								"controller-index": "0",
								"serviceId": "container-clustercontroller",
								"clusterId": "msmarco"
							}
						},
						{
							"values": {
								"serverActiveThreads.average": 0,
								"jdisc.thread_pool.work_queue.capacity.max": 50,
								"jdisc.thread_pool.work_queue.size.sum": 0,
								"jdisc.thread_pool.work_queue.size.count": 600,
								"jdisc.thread_pool.work_queue.size.max": 0,
								"jdisc.thread_pool.work_queue.size.min": 0,
								"jdisc.thread_pool.active_threads.sum": 0,
								"jdisc.thread_pool.active_threads.count": 600,
								"jdisc.thread_pool.active_threads.max": 0,
								"jdisc.thread_pool.active_threads.min": 0,
								"jdisc.thread_pool.size.max": 1
							},
							"dimensions": {
								"threadpool": "default-pool",
								"serviceId": "container-clustercontroller"
							}
						},
						{
							"values": {
								"cluster-controller.maintenance.count.last": 0,
								"cluster-controller.maintenance.count.max": 0,
								"cluster-controller.down.count.last": 0,
								"cluster-controller.down.count.max": 0,
								"cluster-controller.up.count.last": 1,
								"cluster-controller.up.count.max": 1
							},
							"dimensions": {
								"node-type": "storage",
								"cluster": "msmarco",
								"controller-index": "0",
								"serviceId": "container-clustercontroller",
								"clusterId": "msmarco"
							}
						},
						{
							"values": {
								"mem.heap.free.average": 10675669.333333334
							},
							"dimensions": {
								"serviceId": "container-clustercontroller"
							}
						},
						{
							"values": {
								"cluster-controller.resource_usage.nodes_above_limit.last": 0,
								"cluster-controller.resource_usage.nodes_above_limit.max": 0,
								"cluster-controller.resource_usage.max_memory_utilization.last": 0.0280127856725,
								"cluster-controller.resource_usage.max_memory_utilization.max": 0.0280127856725,
								"cluster-controller.resource_usage.max_disk_utilization.last": 0.9916970230904,
								"cluster-controller.resource_usage.max_disk_utilization.max": 0.9916970230904
							},
							"dimensions": {
								"cluster": "msmarco",
								"controller-index": "0",
								"serviceId": "container-clustercontroller",
								"clusterId": "msmarco"
							}
						},
						{
							"values": {
								"http.status.2xx.rate": 0.0333333333333
							},
							"dimensions": {
								"httpMethod": "GET",
								"requestType": "monitoring",
								"protocol": "http1",
								"statusCode": "200",
								"serviceId": "container-clustercontroller"
							}
						},
						{
							"values": {
								"jdisc.gc.ms.average": 4.1666666666667,
								"jdisc.gc.ms.max": 7
							},
							"dimensions": {
								"gcName": "Copy",
								"serviceId": "container-clustercontroller"
							}
						},
						{
							"values": {
								"serverActiveThreads.average": 0,
								"jdisc.thread_pool.work_queue.capacity.max": 650,
								"jdisc.thread_pool.work_queue.size.sum": 0,
								"jdisc.thread_pool.work_queue.size.count": 600,
								"jdisc.thread_pool.work_queue.size.max": 0,
								"jdisc.thread_pool.work_queue.size.min": 0,
								"jdisc.thread_pool.active_threads.sum": 0,
								"jdisc.thread_pool.active_threads.count": 600,
								"jdisc.thread_pool.active_threads.max": 0,
								"jdisc.thread_pool.active_threads.min": 0,
								"jdisc.thread_pool.size.max": 8
							},
							"dimensions": {
								"threadpool": "default-handler-common",
								"serviceId": "container-clustercontroller"
							}
						},
						{
							"values": {
								"cluster-controller.is-master.last": 1,
								"cluster-controller.is-master.max": 1
							},
							"dimensions": {
								"controller-index": "0",
								"serviceId": "container-clustercontroller",
								"clusterId": "msmarco"
							}
						}
					]
				},
				{
					"name": "vespa.slobrok",
					"timestamp": 1704449677,
					"status": {
						"code": "up",
						"description": "Data collected successfully"
					},
					"metrics": [
						{
							"values": {
								"memory_virt": 200503296,
								"memory_rss": 16330752,
								"cpu": 0.2515547480959,
								"cpu_util": 0.0104814478373
							},
							"dimensions": {
								"serviceId": "slobrok"
							}
						},
						{
							"values": {},
							"dimensions": {
								"serviceId": "slobrok"
							}
						}
					]
				},
				{
					"name": "vespa.metricsproxy-container",
					"timestamp": 1704449677,
					"status": {
						"code": "up",
						"description": "Data collected successfully"
					},
					"metrics": [
						{
							"values": {
								"memory_virt": 1019035648,
								"memory_rss": 292249600,
								"cpu": 1.7944238697505,
								"cpu_util": 0.0747676612396
							},
							"dimensions": {
								"serviceId": "metricsproxy-container"
							}
						},
						{
							"values": {
								"serverActiveThreads.average": 0.0033388981636,
								"jdisc.thread_pool.work_queue.capacity.max": 50,
								"jdisc.thread_pool.work_queue.size.sum": 0,
								"jdisc.thread_pool.work_queue.size.count": 599,
								"jdisc.thread_pool.work_queue.size.max": 0,
								"jdisc.thread_pool.work_queue.size.min": 0,
								"jdisc.thread_pool.active_threads.sum": 2,
								"jdisc.thread_pool.active_threads.count": 599,
								"jdisc.thread_pool.active_threads.max": 1,
								"jdisc.thread_pool.active_threads.min": 0,
								"jdisc.thread_pool.size.max": 1
							},
							"dimensions": {
								"threadpool": "default-pool",
								"serviceId": "metricsproxy-container"
							}
						},
						{
							"values": {
								"jdisc.gc.ms.average": 1,
								"jdisc.gc.ms.max": 6
							},
							"dimensions": {
								"gcName": "G1YoungGeneration",
								"serviceId": "metricsproxy-container"
							}
						},
						{
							"values": {
								"http.status.2xx.rate": 0.05
							},
							"dimensions": {
								"httpMethod": "GET",
								"requestType": "read",
								"protocol": "http1",
								"statusCode": "200",
								"serviceId": "metricsproxy-container"
							}
						},
						{
							"values": {
								"jdisc.gc.ms.average": 0,
								"jdisc.gc.ms.max": 0
							},
							"dimensions": {
								"gcName": "G1OldGeneration",
								"serviceId": "metricsproxy-container"
							}
						},
						{
							"values": {
								"mem.heap.free.average": 57707506.666666664
							},
							"dimensions": {
								"serviceId": "metricsproxy-container"
							}
						},
						{
							"values": {
								"http.status.2xx.rate": 0.0333333333333
							},
							"dimensions": {
								"httpMethod": "GET",
								"requestType": "monitoring",
								"protocol": "http1",
								"statusCode": "200",
								"serviceId": "metricsproxy-container"
							}
						},
						{
							"values": {
								"serverActiveThreads.average": 0,
								"jdisc.thread_pool.work_queue.capacity.max": 650,
								"jdisc.thread_pool.work_queue.size.sum": 0,
								"jdisc.thread_pool.work_queue.size.count": 599,
								"jdisc.thread_pool.work_queue.size.max": 0,
								"jdisc.thread_pool.work_queue.size.min": 0,
								"jdisc.thread_pool.active_threads.sum": 0,
								"jdisc.thread_pool.active_threads.count": 599,
								"jdisc.thread_pool.active_threads.max": 0,
								"jdisc.thread_pool.active_threads.min": 0,
								"jdisc.thread_pool.size.max": 8
							},
							"dimensions": {
								"threadpool": "default-handler-common",
								"serviceId": "metricsproxy-container"
							}
						}
					]
				},
				{
					"name": "vespa.config-sentinel",
					"timestamp": 1704449677,
					"status": {
						"code": "up",
						"description": "Data collected successfully"
					},
					"metrics": [
						{
							"values": {
								"memory_virt": 0,
								"memory_rss": 0,
								"cpu": 0,
								"cpu_util": 0
							},
							"dimensions": {
								"serviceId": "config-sentinel"
							}
						},
						{
							"values": {
								"sentinel.totalRestarts.sum": 0,
								"sentinel.totalRestarts.max": 0,
								"sentinel.totalRestarts.last": 0
							},
							"dimensions": {
								"serviceId": "config-sentinel"
							}
						}
					]
				},
				{
					"name": "vespa.logd",
					"timestamp": 1704449677,
					"status": {
						"code": "up",
						"description": "Data collected successfully"
					},
					"metrics": [
						{
							"values": {
								"memory_virt": 193908736,
								"memory_rss": 18178048,
								"cpu": 0.1173922157781,
								"cpu_util": 0.0048913423241
							},
							"dimensions": {
								"serviceId": "logd"
							}
						},
						{
							"values": {},
							"dimensions": {
								"serviceId": "logd"
							}
						}
					]
				}
			]
		}
	]
};