import {open_file_handler} from './main_menu.js'

import {globals} from './globals.js'
import {create_element, create_dialog} from './utilities.js'

// New/open file
async function show_discard_dialog(is_new_file) {
  var dialog_header = create_element(
    'p', 'Are you sure you want to discard your file?', {class: 'dialogheader'}
  )

  var discard_button = create_element(
    'button', 'Yes', {class: 'narrowbutton warningbutton'}
  )
  var cancel_button = create_element(
    'button', 'No', {class: 'narrowbutton primarybutton'}
  )
  var button_wrapper = create_element(
    'div', [discard_button, cancel_button], {class: 'centerbuttons dialogbuttons'}
  )
  if (!is_new_file) {
    var discard_input = create_element(
      'input', 'Open', {
        type: 'file',
        id: 'discardbutton',
        name: 'open-file',
        accept: '.anj',
        class: 'accessiblyhidden',
      }
    )
    button_wrapper.append(discard_input)
  }

  var dialog = create_dialog([dialog_header, button_wrapper])
  cancel_button.focus()

  await new Promise((resolve, reject) => {
    discard_button.addEventListener('click', () => {
      discard_input.addEventListener(
        'change',
        async (event) => {
          // TODO: Do something different for New File
          await open_file_handler(event, show_load_error)
          resolve(null)
          dialog.close()
        },
        {once: true}
      )
      discard_input.click()
    })
    cancel_button.addEventListener('click', () => {
      resolve(null)
      dialog.close()
    })
    dialog.addEventListener('close', () => {
      resolve(null)
    })
  })
}

async function show_load_error(error) {
  if (error === 'Wrong filetype') {
    var error_description = 'Sorry, your file needs to have '
                            + 'a .anj file extension. '
                            + 'Please choose a different file and try again.'
  } else if (error === 'Malformed .anj file') {
    var error_description = "Sorry, we couldn't read your file "
                            + "because it wasn't formed correctly. "
                            + 'Please choose a different file and try again.'
  } else {
    var error_description = 'Sorry, something went horribly wrong '
                            + 'when reading your file. '
                            + 'Please choose a different file and try again.'
  }
  var dialog = document.getElementsByTagName('dialog')[0]
  var dialog_header = dialog.children[0]
  dialog_header.replaceChildren(error_description)
  var dialog_buttons = document.getElementsByClassName('dialogbuttons')[0]
  dialog_buttons.children[1].remove()
  var ok_button = dialog_buttons.children[0]
  ok_button.replaceChildren('OK')
  ok_button.setAttribute('class', 'narrowbutton primarybutton')
  // Wait for the OK button to be clicked
  await new Promise((resolve, reject) => {
    ok_button.addEventListener('mousedown', () => {
      resolve(null)
    })
  })
  console.log('test for code coverage')
  return null
}

// Saving
async function show_save_dialog() {
  var name_your_file = create_element(
    'p', 'Name your file:', {class: 'dialogheader'}
  )
  
  var filename_input = create_element(
    'input', [], {
      type: 'text',
      id: 'newfilename',
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
  filename_input.focus()

  var filename = await new Promise((resolve, reject) => {
    save_button.addEventListener('click', () => {
      resolve((filename_input.value || 'Untitled') + '.anj')
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

// Main handler
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
    if (command_name === 'open_file') {
      show_discard_dialog(false)
    } else if (command_name === 'save_file') {
      if (globals.current_filename === null) {
        globals.current_filename = await show_save_dialog()
      }
      save(globals.current_filename)
    } else if (command_name === 'save_as') {
      var new_filename = await show_save_dialog()
      if (new_filename !== null) {
        globals.current_filename = new_filename
        save(globals.current_filename)
      }
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
