# Change Log

All notable changes to the "vscode-vespa" extension will be documented in this file.

## [1.1.3]

- Fix issues with connecting to single node cluster at Vespa cluster startup and deployment.

## [1.1.2]

- Improvments on Vespa schema highlighting
- Improvments on YQL request highlighting and query completion.

## [1.1.1]

- Vespa Explorer
  - Browse cluster doc-types and fields
  - Browse and download application content
  - Removed the connection info
- Simple Highlighting Syntax for Vespa schemas (*.sd)
- WIP: Added some simple coloring for the "yql" property in the json highlight syntax


## [1.1.0]

- Add button to save YQL result json as file.
- Support for multiple vespa clusters via custom config 
- Move configuration to $HOME/.config/vscode-vespa/vespa-config.json
- Vespa explorer to view details about the configured vespa clusters.
- Vespa Cluster Info panel with document-info and iframe for Controller Status page.
- "Vespa YQL Results" tab added to YQL results containing details about the query request.
- editor/title menus for
  - Connecting to cluster
  - Edit Cluster Config 
  - Show Vespa Cluster Info


## [1.0.1]

- Minor bugfix for zipkin
- Fix keyboard shortcuts not clashing with vscode default shortcuts.

## [1.0.0]

- Initial release
