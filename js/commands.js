import {globals} from './globals.js'

function save(name=null) {
  /* Put all the files back into a JSZip().
     JSZip automatically handles making files inside of folders. */
  var zip = new JSZip()
  for (var [filename, contents] of Object.entries(globals.current_file)) {
    // Remove the topmost directory because it's the name of the file
    var new_filename = filename.replace(/.*?\//, '')
    zip.file(new_filename, contents)
  }
  // Then save the .zip file!
  zip.generateAsync({
    type: 'blob',
    compression: 'DEFLATE',
  }).then(function(content) {
    saveAs(content, name)
  })
}

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
      save('Output Test.anj')
    } else if (command_name === 'save_as') {
      console.log(globals.current_file) // TODO: Do something else
    } else {
      console.log(command_name) // TODO: Do something else
    }
  }
  return false
}

export {handle_action}
