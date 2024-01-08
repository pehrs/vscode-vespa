

export const servicexXmlWith1Node: any = {
	"?xml": {
		"version": "1.0",
		"encoding": "UTF-8"
	},
	"services": {
		"container": {
			"document-api": "",
			"search": {
				"config": {
					"tag": {
						"bold": {
							"open": "<strong>",
							"close": "</strong>"
						},
						"separator": "..."
					},
					"name": "container.qr-searchers"
				}
			},
			"document-processing": "",
			"component": {
				"id": "com.yahoo.language.simple.SimpleLinguistics"
			},
			"handler": {
				"binding": [
					"http://*/site/*",
					"http://*/site"
				],
				"config": {
					"vespaHostName": "localhost",
					"vespaHostPort": 8080,
					"name": "ai.vespa.example.text_search.site.site-handler"
				},
				"id": "ai.vespa.example.text_search.site.SiteHandler",
				"bundle": "text-search"
			},
			"nodes": {
				"node": {
					"hostalias": "node1"
				}
			},
			"id": "text_search",
			"version": "1.0"
		},
		"content": {
			"config": {
				"max_matches": 2,
				"length": 1000,
				"surround_max": 500,
				"min_length": 300,
				"name": "vespa.config.search.summary.juniperrc"
			},
			"min-redundancy": 2,
			"documents": {
				"document": {
					"type": "msmarco",
					"mode": "index"
				},
				"document-processing": {
					"cluster": "text_search"
				}
			},
			"nodes": {
				"node": {
					"distribution-key": "0",
					"hostalias": "node1"
				}
			},
			"id": "msmarco",
			"version": "1.0"
		},
		"version": "1.0",
		"xmlns:deploy": "vespa",
		"xmlns:preprocess": "properties"
	}
};


export const servicesXmlWith2ContentNodes: any = {
	"?xml": {
		"version": "1.0",
		"encoding": "UTF-8"
	},
	"services": {
		"admin": {
			"configservers": {
				"configserver": {
					"hostalias": "config0"
				}
			},
			"cluster-controllers": {
				"cluster-controller": {
					"hostalias": "config0",
					"jvm-options": "-Xms32M -Xmx64M"
				}
			},
			"slobroks": {
				"slobrok": {
					"hostalias": "config0"
				}
			},
			"adminserver": {
				"hostalias": "config0"
			},
			"version": "2.0"
		},
		"container": {
			"nodes": {
				"node": {
					"hostalias": "container0"
				}
			},
			"document-api": "",
			"search": {
				"config": {
					"tag": {
						"bold": {
							"open": "<strong>",
							"close": "</strong>"
						},
						"separator": "..."
					},
					"name": "container.qr-searchers"
				}
			},
			"document-processing": "",
			"component": {
				"id": "com.yahoo.language.simple.SimpleLinguistics"
			},
			"handler": {
				"binding": [
					"http://*/site/*",
					"http://*/site"
				],
				"config": {
					"vespaHostName": "localhost",
					"vespaHostPort": 8080,
					"name": "ai.vespa.example.text_search.site.site-handler"
				},
				"id": "ai.vespa.example.text_search.site.SiteHandler",
				"bundle": "text-search"
			},
			"id": "text_search",
			"version": "1.0"
		},
		"content": {
			"nodes": {
				"node": [
					{
						"distribution-key": "0",
						"hostalias": "content0"
					},
					{
						"distribution-key": "1",
						"hostalias": "content1"
					}
				]
			},
			"engine": {
				"proton": {
					"resource-limits": {
						"disk": 0.9,
						"memory": 0.8
					}
				}
			},
			"config": {
				"max_matches": 2,
				"length": 1000,
				"surround_max": 500,
				"min_length": 300,
				"name": "vespa.config.search.summary.juniperrc"
			},
			"min-redundancy": 2,
			"documents": {
				"document": {
					"type": "msmarco",
					"mode": "index"
				},
				"document-processing": {
					"cluster": "text_search"
				}
			},
			"id": "msmarco",
			"version": "1.0"
		},
		"version": "1.0",
		"xmlns:deploy": "vespa",
		"xmlns:preprocess": "properties"
	}
};


export const complexServiceXml = `<?xml version="1.0" encoding="utf-8" ?>
<services version="1.0" xmlns:deploy="vespa" xmlns:preprocess="properties">

	<admin version="2.0">
		<configservers>
		  <configserver hostalias="config0" />
		  <configserver hostalias="config1" />
		  <configserver hostalias="config2" />            
		</configservers>
		<cluster-controllers>
			<cluster-controller hostalias="config0" />
			<cluster-controller hostalias="config1" />
			<cluster-controller hostalias="config2" />
			
		</cluster-controllers>
		<slobroks>
			<slobrok hostalias="config0" />
			<slobrok hostalias="config1" />
			<slobrok hostalias="config2" />
			
		</slobroks>

		<adminserver hostalias="config0" />
		
	</admin>

	<container id="feed" version="1.0">
		<document-api/>
		<nodes>
			<node hostalias="feed0" />
			<node hostalias="feed1" />
			
		</nodes>
	</container>

	<container id="query" version="1.0">
		<search/>
		<nodes>
			<node hostalias="query0" />
			<node hostalias="query1" />
			
		</nodes>
	</container>

	<content id="music" version="1.0">
		<redundancy>2</redundancy>
		<documents>
			<document type="music" mode="index" />
		</documents>
		<nodes>
			<node hostalias="content0" distribution-key="0" />
			<node hostalias="content1" distribution-key="1" />
			<node hostalias="content2" distribution-key="2" />
		</nodes>
	</content>

</services>	
`;

export const largeServiceXml = `
	<?xml version="1.0" encoding="UTF-8"?>
	<services version="1.0">
	  <container id="query" version="1.0">
		<search>
		  <chain id="default" inherits="vespa">
			<searcher bundle="sample-app" id="org.test.app.searcher.AliasSearcher">
			  <config name="org.test.app.searcher.alias-mapping">
				<alias>testIndex</alias>
				<indexReference>index1</indexReference>
			  </config>
			</searcher>
			<searcher bundle="sample-app" id="org.test.app.searcher.AnalyzerSearcher" after="org.test.app.searcher.AliasSearcher"/>
		  </chain>
		</search>
		<nodes>
		  <jvm gc-options="-Xms25g -Xmx25g  -XX:+UseConcMarkSweepGC -XX:MaxTenuringThreshold=15 -XX:NewRatio=1 -XX:+PrintGC" options="-XX:+PrintCommandLineFlags"/>
		  <node hostalias="container-jt2z"/>
		  <node hostalias="container-k47g"/>
		  <node hostalias="container-kb63"/>
		  <node hostalias="container-m1z9"/>
		  <node hostalias="container-mfr4"/>
		  <node hostalias="container-mfz5"/>
		  <node hostalias="container-n92x"/>
		  <node hostalias="container-nl2f"/>
		  <node hostalias="container-p3bm"/>
		  <node hostalias="container-p7t3"/>
		  <node hostalias="container-rc8h"/>
		  <node hostalias="container-sjb2"/>
		  <node hostalias="container-st8k"/>
		  <node hostalias="container-t27b"/>
		  <node hostalias="container-tdlm"/>
		  <node hostalias="container-tlgk"/>
		  <node hostalias="container-v2vd"/>
		  <node hostalias="container-v4f9"/>
		  <node hostalias="container-vffg"/>
		  <node hostalias="container-vfx0"/>
		  <node hostalias="container-w8mk"/>
		  <node hostalias="container-wg4h"/>
		  <node hostalias="container-wpb2"/>
		  <node hostalias="container-x3sf"/>
		  <node hostalias="container-xhb1"/>
		  <node hostalias="container-xj9c"/>
		  <node hostalias="container-xpdr"/>
		  <node hostalias="container-xq2q"/>
		  <node hostalias="container-xqn8"/>
		  <node hostalias="container-zf11"/>
		</nodes>
	  </container>
	  <container id="feed" version="1.0">
		<document-processing>
		  <chain id="default" inherits="indexing">
			<documentprocessor id="org.test.app.docprocessor.ConventionDocumentProcessor" bundle="sample-app"/>
		  </chain>
		</document-processing>
		<document-api/>
		<nodes>
		  <jvm gc-options="-Xms25g -Xmx25g  -XX:+UseConcMarkSweepGC -XX:MaxTenuringThreshold=15 -XX:NewRatio=1 -XX:+PrintGC" options="-XX:+PrintCommandLineFlags"/>
		  <node hostalias="feed-6mqt"/>
		  <node hostalias="feed-smmf"/>
		</nodes>
	  </container>
	  <content id="content" version="1.0">
		<redundancy>32</redundancy>
		<engine>
		  <proton>
			<searchable-copies>32</searchable-copies>
			<sync-transactionlog>false</sync-transactionlog>
			<tuning>
			  <searchnode>
				<requestthreads>
				  <search>256</search>
				  <persearch>2</persearch>
				  <summary>32</summary>
				</requestthreads>
			  </searchnode>
			</tuning>
		  </proton>
		</engine>
		<documents>
		  <document mode="index" type="index0"/>
		  <document mode="index" type="index1"/>
		  <document mode="index" type="index2"/>
		  <document mode="index" type="index3"/>
		  <document mode="index" type="index4"/>
		  <document mode="index" type="index5"/>
		  <document-processing cluster="feed"/>
		</documents>
		<group name="top-group">
		  <distribution partitions="1|1|1|1|1|1|1|1|1|1|1|1|1|1|1|1|1|1|1|1|1|1|1|1|1|1|1|1|1|1|1|*"/>
		  <group name="contentaa" distribution-key="0">
			<node hostalias="contentaa-1wz1" distribution-key="65"/>
			<node hostalias="contentaa-9zdh" distribution-key="66"/>
			<node hostalias="contentaa-k8mj" distribution-key="67"/>
			<node hostalias="contentaa-p2cj" distribution-key="68"/>
		  </group>
		  <group name="contentab" distribution-key="1">
			<node hostalias="contentab-5pnr" distribution-key="69"/>
			<node hostalias="contentab-j84g" distribution-key="70"/>
			<node hostalias="contentab-v7p3" distribution-key="71"/>
			<node hostalias="contentab-w5vp" distribution-key="72"/>
		  </group>
		  <group name="contentac" distribution-key="2">
			<node hostalias="contentac-64cq" distribution-key="73"/>
			<node hostalias="contentac-74sq" distribution-key="74"/>
			<node hostalias="contentac-f8rm" distribution-key="75"/>
			<node hostalias="contentac-nvt7" distribution-key="76"/>
		  </group>
		  <group name="contentad" distribution-key="3">
			<node hostalias="contentad-4lq2" distribution-key="77"/>
			<node hostalias="contentad-7p57" distribution-key="78"/>
			<node hostalias="contentad-dhns" distribution-key="79"/>
			<node hostalias="contentad-jwtz" distribution-key="80"/>
		  </group>
		  <group name="contentae" distribution-key="4">
			<node hostalias="contentae-m61d" distribution-key="81"/>
			<node hostalias="contentae-t40g" distribution-key="82"/>
			<node hostalias="contentae-x7p2" distribution-key="83"/>
			<node hostalias="contentae-zkgx" distribution-key="84"/>
		  </group>
		  <group name="contentaf" distribution-key="5">
			<node hostalias="contentaf-25q3" distribution-key="85"/>
			<node hostalias="contentaf-49kn" distribution-key="86"/>
			<node hostalias="contentaf-5bpv" distribution-key="87"/>
			<node hostalias="contentaf-lsrn" distribution-key="88"/>
		  </group>
		  <group name="contentag" distribution-key="6">
			<node hostalias="contentag-7g7t" distribution-key="89"/>
			<node hostalias="contentag-bz03" distribution-key="90"/>
			<node hostalias="contentag-cpxl" distribution-key="91"/>
			<node hostalias="contentag-m263" distribution-key="92"/>
		  </group>
		  <group name="contentah" distribution-key="7">
			<node hostalias="contentah-74h2" distribution-key="93"/>
			<node hostalias="contentah-7c4s" distribution-key="94"/>
			<node hostalias="contentah-d8g1" distribution-key="95"/>
			<node hostalias="contentah-l4qd" distribution-key="96"/>
		  </group>
		  <group name="contentai" distribution-key="8">
			<node hostalias="contentai-7658" distribution-key="97"/>
			<node hostalias="contentai-7jfl" distribution-key="98"/>
			<node hostalias="contentai-l420" distribution-key="99"/>
			<node hostalias="contentai-vtp5" distribution-key="100"/>
		  </group>
		  <group name="contentaj" distribution-key="9">
			<node hostalias="contentaj-06rw" distribution-key="101"/>
			<node hostalias="contentaj-3r85" distribution-key="102"/>
			<node hostalias="contentaj-696g" distribution-key="103"/>
			<node hostalias="contentaj-l6c2" distribution-key="104"/>
		  </group>
		  <group name="contentak" distribution-key="10">
			<node hostalias="contentak-1wx3" distribution-key="105"/>
			<node hostalias="contentak-2j34" distribution-key="106"/>
			<node hostalias="contentak-fnsm" distribution-key="107"/>
			<node hostalias="contentak-htr9" distribution-key="108"/>
		  </group>
		  <group name="contental" distribution-key="11">
			<node hostalias="contental-36bq" distribution-key="109"/>
			<node hostalias="contental-71fb" distribution-key="110"/>
			<node hostalias="contental-cbfn" distribution-key="111"/>
			<node hostalias="contental-n1j9" distribution-key="112"/>
		  </group>
		  <group name="contentbc" distribution-key="12">
			<node hostalias="contentbc-9q3q" distribution-key="113"/>
			<node hostalias="contentbc-dl3r" distribution-key="114"/>
			<node hostalias="contentbc-hs9m" distribution-key="115"/>
			<node hostalias="contentbc-whgn" distribution-key="116"/>
		  </group>
		  <group name="contentbd" distribution-key="13">
			<node hostalias="contentbd-1v09" distribution-key="117"/>
			<node hostalias="contentbd-dqdm" distribution-key="118"/>
			<node hostalias="contentbd-qjgx" distribution-key="119"/>
			<node hostalias="contentbd-xrz1" distribution-key="120"/>
		  </group>
		  <group name="contentbe" distribution-key="14">
			<node hostalias="contentbe-1z80" distribution-key="121"/>
			<node hostalias="contentbe-8rlb" distribution-key="122"/>
			<node hostalias="contentbe-hr0s" distribution-key="123"/>
			<node hostalias="contentbe-xm00" distribution-key="124"/>
		  </group>
		  <group name="contentbf" distribution-key="15">
			<node hostalias="contentbf-c5bb" distribution-key="125"/>
			<node hostalias="contentbf-j427" distribution-key="126"/>
			<node hostalias="contentbf-j9rd" distribution-key="127"/>
			<node hostalias="contentbf-rc7x" distribution-key="128"/>
		  </group>
		  <group name="contentbg" distribution-key="16">
			<node hostalias="contentbg-j517" distribution-key="129"/>
			<node hostalias="contentbg-nsw8" distribution-key="130"/>
			<node hostalias="contentbg-vcts" distribution-key="131"/>
			<node hostalias="contentbg-zlmk" distribution-key="132"/>
		  </group>
		  <group name="contentbh" distribution-key="17">
			<node hostalias="contentbh-03fp" distribution-key="133"/>
			<node hostalias="contentbh-0dlt" distribution-key="134"/>
			<node hostalias="contentbh-slt2" distribution-key="135"/>
			<node hostalias="contentbh-spnq" distribution-key="136"/>
		  </group>
		  <group name="contentbi" distribution-key="18">
			<node hostalias="contentbi-3cc8" distribution-key="137"/>
			<node hostalias="contentbi-6jt1" distribution-key="138"/>
			<node hostalias="contentbi-mxx4" distribution-key="139"/>
			<node hostalias="contentbi-wz4x" distribution-key="140"/>
		  </group>
		  <group name="contentbj" distribution-key="19">
			<node hostalias="contentbj-2lbj" distribution-key="141"/>
			<node hostalias="contentbj-7bqv" distribution-key="142"/>
			<node hostalias="contentbj-h380" distribution-key="143"/>
			<node hostalias="contentbj-v760" distribution-key="144"/>
		  </group>
		  <group name="contentbk" distribution-key="20">
			<node hostalias="contentbk-48fs" distribution-key="145"/>
			<node hostalias="contentbk-p2c9" distribution-key="146"/>
			<node hostalias="contentbk-v13l" distribution-key="147"/>
			<node hostalias="contentbk-whbc" distribution-key="148"/>
		  </group>
		  <group name="contentbl" distribution-key="21">
			<node hostalias="contentbl-4zdc" distribution-key="149"/>
			<node hostalias="contentbl-596w" distribution-key="150"/>
			<node hostalias="contentbl-59kf" distribution-key="151"/>
			<node hostalias="contentbl-fg84" distribution-key="152"/>
		  </group>
		  <group name="contentbm" distribution-key="22">
			<node hostalias="contentbm-4bx6" distribution-key="153"/>
			<node hostalias="contentbm-kpmm" distribution-key="154"/>
			<node hostalias="contentbm-pr84" distribution-key="155"/>
			<node hostalias="contentbm-t6k8" distribution-key="156"/>
		  </group>
		  <group name="contentbn" distribution-key="23">
			<node hostalias="contentbn-8l1j" distribution-key="157"/>
			<node hostalias="contentbn-g9zh" distribution-key="158"/>
			<node hostalias="contentbn-k40s" distribution-key="159"/>
			<node hostalias="contentbn-qw52" distribution-key="160"/>
		  </group>
		  <group name="contentbo" distribution-key="24">
			<node hostalias="contentbo-d6sn" distribution-key="161"/>
			<node hostalias="contentbo-l9vk" distribution-key="162"/>
			<node hostalias="contentbo-q6cc" distribution-key="163"/>
			<node hostalias="contentbo-ww6z" distribution-key="164"/>
		  </group>
		  <group name="contentbp" distribution-key="25">
			<node hostalias="contentbp-5ntj" distribution-key="165"/>
			<node hostalias="contentbp-fcgq" distribution-key="166"/>
			<node hostalias="contentbp-gdx5" distribution-key="167"/>
			<node hostalias="contentbp-q0tf" distribution-key="168"/>
		  </group>
		  <group name="contentbq" distribution-key="26">
			<node hostalias="contentbq-3jv9" distribution-key="169"/>
			<node hostalias="contentbq-cb0c" distribution-key="170"/>
			<node hostalias="contentbq-p1d9" distribution-key="171"/>
			<node hostalias="contentbq-s4sl" distribution-key="172"/>
		  </group>
		  <group name="contentbr" distribution-key="27">
			<node hostalias="contentbr-gdcq" distribution-key="173"/>
			<node hostalias="contentbr-pd7r" distribution-key="174"/>
			<node hostalias="contentbr-rmtw" distribution-key="175"/>
			<node hostalias="contentbr-vqmj" distribution-key="176"/>
		  </group>
		  <group name="contentbs" distribution-key="28">
			<node hostalias="contentbs-31zz" distribution-key="177"/>
			<node hostalias="contentbs-fcz3" distribution-key="178"/>
			<node hostalias="contentbs-gnmv" distribution-key="179"/>
			<node hostalias="contentbs-vnm2" distribution-key="180"/>
		  </group>
		  <group name="contentbt" distribution-key="29">
			<node hostalias="contentbt-6gtl" distribution-key="181"/>
			<node hostalias="contentbt-n617" distribution-key="182"/>
			<node hostalias="contentbt-xdcm" distribution-key="183"/>
			<node hostalias="contentbt-z44r" distribution-key="184"/>
		  </group>
		  <group name="contentbu" distribution-key="30">
			<node hostalias="contentbu-6dhj" distribution-key="185"/>
			<node hostalias="contentbu-dd9p" distribution-key="186"/>
			<node hostalias="contentbu-nwb5" distribution-key="187"/>
			<node hostalias="contentbu-p6k8" distribution-key="188"/>
		  </group>
		  <group name="contentbv" distribution-key="31">
			<node hostalias="contentbv-61z2" distribution-key="189"/>
			<node hostalias="contentbv-6vf2" distribution-key="190"/>
			<node hostalias="contentbv-d5g0" distribution-key="191"/>
			<node hostalias="contentbv-lw2b" distribution-key="192"/>
		  </group>
		</group>
		<tuning>
		  <cluster-controller>
			<transition-time>3600</transition-time>
		  </cluster-controller>
		  <bucket-splitting minimum-bits="16"/>
		</tuning>
	  </content>
	  <admin version="2.0">
		<adminserver hostalias="configa-8wst"/>
		<logserver hostalias="configa-8wst"/>
		<configservers>
		  <configserver hostalias="configa-8wst"/>
		  <configserver hostalias="configa-d4p0"/>
		  <configserver hostalias="configa-nqpb"/>
		</configservers>
		<cluster-controllers>
		  <cluster-controller hostalias="configa-8wst"/>
		  <cluster-controller hostalias="configa-d4p0"/>
		  <cluster-controller hostalias="configa-nqpb"/>
		</cluster-controllers>
		<slobroks>
		  <slobrok hostalias="configa-8wst"/>
		  <slobrok hostalias="configa-d4p0"/>
		  <slobrok hostalias="configa-nqpb"/>
		</slobroks>
	  </admin>
	</services>
		`;