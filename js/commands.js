import {globals} from './globals.js'

function handle_action(command_name) {
  if (globals.screen === 'main') {
    if (command_name === 'new_file') {
      var new_button = document.getElementById('menubuttongroup')
                               .children[0]
                               .children[0]
      new_button.click()
    } else if (command_name === 'open_file') {
      var open_button = document.getElementById('openbutton')
      open_button.click()
    } else if (command_name === 'settings') {
      var settings_button = document.getElementById('menubuttongroup')
                                    .children[2]
                                    .children[0]
      settings_button.click()
    }
  } else if (globals.screen === 'editing') {
    if (command_name === 'save_file') {
      console.log(globals) // DEBUG
      /*
      zip.generateAsync({
        type: "base64"
      }).then(function(content) {
        var link = document.createElement('a');
        link.href = "data:application/zip;base64," + content;
        link.download = "your-file-name.zip";
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      });
      */
    } else if (command_name === 'save_as') {
      console.log(command_name) // TODO: Do something else
    } else {
      console.log(command_name) // TODO: Do something else
    }
  }
  return false
}

export {handle_action}
