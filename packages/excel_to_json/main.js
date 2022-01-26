'use strict';

module.exports = {
  load () {
    // execute when package loaded
  },

  unload () {
    // execute when package unloaded
  },

  // register your ipc messages here
  messages: {
    'open' () {
      // open entry panel registered in package.json
      Editor.Panel.open('excel_to_json');
    },
    'say-hello' () {
      Editor.log('Hello World!');
      // send ipc message to panel
      Editor.Ipc.sendToPanel('excel_to_json', 'excel_to_json:hello');
    },
    'clicked' () {
      Editor.log('Button clicked!');
    }
  },
};