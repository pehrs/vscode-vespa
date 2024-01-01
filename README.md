# vscode-vespa - Vespa YQL request support for Visual Studio Code

The [VS Code Vespa extension](https://github.com/pehrs/vscode-vespa) provides rich language support for the [Vespa YQL Language](https://docs.vespa.ai/en/query-language.html).


## Features

* Run YQL requests against your vespa cluster and present the result in a webview table..

* Simple completion support is given for request snippets and the YQL query string.

* Optionally render a zipkin view if you enable tracing for your YQL request.

<p align="center">
<img src="media/vscode-vespa.gif" width=75%>
<br/>
</p>

## Requirements

[Vespa cluster running](https://docs.vespa.ai/en/getting-started.html) with the config and query endpoints available.

(Optional) Zipkin Server running

### Zipkin

Optionally if you wish to view traces of your Vespa queries you can start a zipkin server.

```shell
# Start Zipkin server
docker run --name zipkin -d -p 9411:9411 openzipkin/zipkin

# Stop Zipkin server
docker rm -f zipkin
```

## Extension Settings

Include if your extension adds any VS Code settings through the `contributes.configuration` extension point.

For example:

This extension contributes the following settings:

* `vespaYql.configEndpoint`: Endpoint for Vespa Config Server. (default: http://127.0.0.1:19071)
* `vespaYql.queryEndpoint`: Endpoint for Vespa YQL Queries. (default: http://127.0.0.1:8080/search)
* `vespaYql.zipkinEndpoint`: (Optional) Endpoint for Zipkin traces. (default: http://127.0.0.1:9411)
* `vespaYql.queryTimeout`: Timeout for Vespa YQL Queries. (default: 10s)

## Known Issues

### YQL Syntax

The syntax is just reusing the [vscode JSON syntax](https://github.com/microsoft/vscode/blob/main/extensions/json/syntaxes/JSON.tmLanguage.json) 
until we have time to create a custom YQL syntax.

### Zipkin traces
The zipkin traces are work-in-progress as the Vespa trace format is quite hard to parse.
We have use the [TransformVespaTrace.jsx](https://github.com/vespa-engine/vespa/blob/master/client/js/app/src/app/pages/querybuilder/TransformVespaTrace.jsx) 
from [Vespa](https://github.com/vespa-engine/vespa) as the "source of truth" on how to parse the Vespa traces.

### Output view

The results output view will not be saved if you close vscode.

### Language Server

In the source code there is a beginings of a 
[language server](https://code.visualstudio.com/api/language-extensions/language-server-extension-guide) in the [server/](server/) dir.
This is not enabled as the features it gives, at the moment, is limited.

## Release Notes

Please read the [CHANGELOG](CHANGELOG.md)