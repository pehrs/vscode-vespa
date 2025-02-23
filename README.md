# vscode-vespa - Vespa YQL request support for Visual Studio Code

The [VS Code Vespa extension](https://github.com/pehrs/vscode-vespa) provides rich language support for the [Vespa YQL Language](https://docs.vespa.ai/en/query-language.html).


## Features

<p align="center">
<img src="media/vscode-vespa.gif" width=75%>
<br/>
</p>

* Run YQL requests against your vespa clusters and present the result in a webview table..

* Simple completion support is given for request snippets and the YQL query string.

* Optionally render a zipkin view if you enable tracing for your YQL request.

* Vespa Explorer 

  * Explore and download application files.


### Keybindings

`vscode-vespa` has the following keybindings by default (You can change them in the keybinding editor if you need to):

| Keybinding | Description |
|------------|-------------|
| ctrl+enter | Run the YQL request on the currently connected Vespa Cluster |
| ctrl+home  | Open the Vespa Cluster Info panel |
| ctrl+end   | Select Vespa cluster to connect to |


## Requirements

[Vespa cluster running](https://docs.vespa.ai/en/getting-started.html) with the config and query endpoints available (ports 19071, 19050 and 8080).

(Optional) [Zipkin Server](https://zipkin.io/) running

See the sections below for details on how to run vespa and zipkin for development.

### Run Vespa cluster and deploy sample app with Docker Compose

```shell

cd vespa-sample-app

./vespa-cluster-start.sh

# Deploy the sample app
./deploy-app.sh

# Wait until vespa is up and running, then
./books-insert.sh
```

### Zipkin

Optionally if you wish to view traces of your Vespa queries you can start a zipkin server.

```shell
# Start Zipkin server
docker run --name zipkin -d -p 9411:9411 openzipkin/zipkin

# Stop Zipkin server
docker rm -f zipkin
```

## Extension Settings

The `vscode-vespa` extension is configured via a config file in `$HOME/.config/vscode-vespa/vespa-config.json`.
If the config file is not present then `vscode-vespa` will create a default config:

```json
{
	"defaultCluster": "localhost",
	"clusters": [
		{
			"name": "localhost",
			"queryEndpoint": "http://localhost:8080/search",
			"configEndpoint": "http://localhost:19071",
			"controllerEndpoint": "http://localhost:19050",
			"zipkinEndpoint": "http://localhost:9411",
		}
	],
	"httpTimeout": "2s",
}
```

You can edit the config file directly in vscode by selecting the 
"Edit Vespa Cluster Configuration" command in the YQL editor menu.

## Known Issues

### YQL (.yql) Syntax

This is work in progress. 

We have started working on a [yql request syntax file](syntaxes/yqlReq.tmLanguage.json) and added support for coloring of the `yql` parameter via the [yql syntax](syntaxes/yql.tmLanguage.json). These are based on the [vscode JSON syntax](https://github.com/microsoft/vscode/blob/main/extensions/json/syntaxes/JSON.tmLanguage.json) and [vscode SQL syntax](https://github.com/microsoft/vscode/blob/main/extensions/sql/syntaxes/sql.tmLanguage.json)

### Schema (.sd) Syntax

This is work in progress. 

We have started working on this in a new [Vespa Schema syntax](syntaxes/sd.tmLanguage.json).

### Zipkin traces
The zipkin traces are work-in-progress as the Vespa trace format is quite hard to parse.
We have use the [TransformVespaTrace.jsx](https://github.com/vespa-engine/vespa/blob/master/client/js/app/src/app/pages/querybuilder/TransformVespaTrace.jsx) 
from [Vespa](https://github.com/vespa-engine/vespa) as the "source of truth" on how to parse the Vespa traces.


### Language Server

In the source code there is a beginings of a 
[language server](https://code.visualstudio.com/api/language-extensions/language-server-extension-guide) in the [server/](server/) dir.
This is not enabled as the features it gives, at the moment, are limited.

## Release Notes

Please read the [CHANGELOG](CHANGELOG.md)
