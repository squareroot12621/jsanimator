import {create_editing_screen} from './editing.js'

import {globals} from './globals.js'
import {create_element, update_root} from './utilities.js'

function create_main_menu() {
  globals.screen = 'main'
  
  var title = create_element('h1', 'JS Animator')

  var new_button = create_element(
    'button', 'New', {class: 'narrowbutton largebutton primarybutton'}
  )
  var new_description = create_element(
    'div', 'Start a new animation', {class: 'buttondescription'}
  )
  var new_wrapper = create_element(
    'div', [new_button, new_description], {class: 'menubuttonwrapper'}
  )

  var open_input = create_element(
    'input', 'Open',
    {type: 'file',
     id: 'openbutton',
     name: 'open-file',
     accept: '.anj',
     class: 'accessiblyhidden',
    }
  )
  var open_button = create_element(
    'label',
    ['Open', open_input],
    {for: 'openbutton', 
     class: 'button narrowbutton largebutton',
    }
  )
  var open_description = create_element(
    'div', 'Continue a previous project', {class: 'buttondescription'}
  )
  var open_wrapper = create_element(
    'div', [open_button, open_description],
    {class: 'menubuttonwrapper'}
  )

  var settings_button = create_element(
    'button', 'Settings', {class: 'narrowbutton largebutton'}
  )
  var settings_description = create_element(
    'div', 'Customize your workspace', {class: 'buttondescription'}
  )
  var settings_wrapper = create_element(
    'div',
    [settings_button, settings_description],
    {class: 'menubuttonwrapper'}
  )

  var button_group = create_element(
    'div',
    [new_wrapper, open_wrapper, settings_wrapper],
    {id: 'menubuttongroup'}
  )
  
  update_root(title, button_group)

  open_input.onchange = async function () {
    // If the user cancelled, don't do anything
    if (open_input.files.length === 0) {
      return undefined;
    }
    var file = open_input.files[0]
    if (file.name.endsWith('.anj')) {
      var zip_error = await unzip(file)
      if (!zip_error) {
        open_input.onchange = () => {}
        create_editing_screen()
      } else {
        show_load_error(zip_error)
      }
    } else {
      show_load_error('Wrong filetype')
    }
  }
}

async function unzip(file) {
  var error_code = false
  
  var zip = await new Promise((resolve, reject) => {
    resolve(JSZip.loadAsync(file))
  }).catch(() => {
    error_code = 'Malformed .anj file'
  })
  if (error_code) {
    return error_code
  }
  
  function promises() {
    return Object.entries(zip.files).map(
      ([key, val]) => new Promise(async (resolve, reject) => {
        resolve([key, await val.async('string')])
      })
    )
  }
  Promise.all(promises()).then((directory) => {
    globals.current_file = Object.fromEntries(directory)
    return null
  })
  
  return false
}

function show_load_error(error) {
  var open_wrapper = document.getElementsByClassName('menubuttonwrapper')[1]
  var [open_button, open_description] = open_wrapper.children
  
  var open_description_class = open_description.className
  var open_description_text = open_description.textContent
  open_description.className += ' texterror'
  open_description.textContent = error
  
  open_button.onclick = () => {
    open_button.onclick = () => {}
    open_description.className = open_description_class
    open_description.textContent = open_description_text
  }
}

export {create_main_menu}
