import {globals} from './globals.js'
import {create_element, create_dialog} from './utilities.js'

function save(name=null) {
  if (name === null) { // User canceled
    return undefined
  }
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

async function show_save_dialog() {
  var name_your_file = create_element(
    'p', 'Name your file:', {class: 'dialogheader'}
  )
  
  var filename_input = create_element(
    'input', [], {
      type: 'text',
      id: 'newfilename',
      autofocus: '',
      size: '15',
      placeholder: 'Untitled',
    }
  )
  var filename_extension = create_element('div', '.anj')
  var filename_wrapper = create_element(
    'div', [filename_input, filename_extension], {class: 'filenamewrapper'}
  )

  var save_button = create_element(
    'button', 'Save', {class: 'narrowbutton primarybutton'}
  )
  var cancel_button = create_element(
    'button', 'Cancel', {class: 'narrowbutton warningbutton'}
  )
  var button_wrapper = create_element(
    'div', [save_button, cancel_button], {class: 'centerbuttons dialogbuttons'}
  )

  var dialog = create_dialog(
    [name_your_file, filename_wrapper, button_wrapper]
  )

  var filename = await new Promise((resolve, reject) => {
    save_button.addEventListener('click', () => {
      resolve(filename_input.value + '.anj')
      dialog.close()
    })
    cancel_button.addEventListener('click', () => {
      resolve(null)
      dialog.close()
    })
    dialog.addEventListener('close', () => {
      resolve(null)
    })
  })
  return filename
}

async function handle_action(command_name) {
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
      if (globals.current_filename === null) {
        globals.current_filename = await show_save_dialog()
      }
      save(globals.current_filename)
    } else if (command_name === 'save_as') {
      globals.current_filename = await show_save_dialog()
      save(globals.current_filename)
    } else if (command_name === 'save_copy') {
      var copy_filename = await show_save_dialog()
      save(copy_filename)
    } else {
      console.log(command_name) // TODO: Do something else
    }
  }
  return false
}

export {handle_action}
