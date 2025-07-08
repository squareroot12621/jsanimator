import {create_editing_screen} from './editing.js'

import {globals} from './globals.js'
import {create_element, update_root} from './utilities.js'

function create_main_menu() {
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
    open_input.onchange = function () {}
    await unzip(open_input.files[0])
    console.log(`current_file #2: ${JSON.stringify(globals.current_file)}`)
    create_editing_screen()
  }
}

async function unzip(file) {
  await JSZip.loadAsync(file).then(async function (zip) {
    console.log(zip.files)
    // set globals.current_file
    console.log(`current_file #1: ${JSON.stringify(globals.current_file)}`)
  })
}

export {create_main_menu}
