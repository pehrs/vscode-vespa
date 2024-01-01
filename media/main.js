// Script run within the webview itself.
/* --------------------------------------------------------------------------------------------
 * Copyright (c) Matti Pehrs. All rights reserved.
 * Licensed under the MIT License. See LICENSE in the project root for license information.
 * ------------------------------------------------------------------------------------------ */
(function () {

    const vscode = acquireVsCodeApi();

    console.log("INIT YQL!");

    const oldState = /** @type {{ count: number} | undefined} */ (vscode.getState());
    console.log('Initial state', oldState);

    // const counter = /** @type {HTMLElement} */ (document.getElementById('lines-of-code-counter'));
    // let currentCount = (oldState && oldState.count) || 0;
    // counter.textContent = `${currentCount}`;

    const save_json_btn = /** @type {HTMLElement} */ (document.getElementById('save_json_btn'));
    if (save_json_btn) {
        console.log("Add click func; ", save_json_btn);
        save_json_btn.addEventListener("click",function(e){
            console.log("send ALERT!");
            vscode.postMessage({
                command: 'save_json',
                text: '...'
            }, false);
        });
    }

    // setInterval(() => {
    //     counter.textContent = `${currentCount++} `;

    //     // Update state
    //     vscode.setState({ count: currentCount });

    //     // Alert the extension when the cat introduces a bug
    //     if (Math.random() < Math.min(0.001 * currentCount, 0.05)) {
    //         // Send a message back to the extension
    //         vscode.postMessage({
    //             command: 'alert',
    //             text: '🐛  on line ' + currentCount
    //         });
    //     }
    // }, 100);

    // Handle messages sent from the extension to the webview
    window.addEventListener('message', event => {
        const message = event.data; // The json data that the extension sent
        switch (message.command) {
            case 'refactor':
                currentCount = Math.ceil(currentCount * 0.5);
                counter.textContent = `${currentCount}`;
                break;
        }
    });
}());
