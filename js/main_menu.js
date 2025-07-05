import { create_element, update_root } from './utilities.js'

function create_main_menu() {
  var title = create_element('h1', 'JS Animator')

  var new_button = create_element(
    'button', 'New', {class: 'largebutton primarybutton'}
  )
  var open_button = create_element(
    'button', 'Open', {class: 'largebutton'}
  )
  var settings_button = create_element(
    'button', 'Settings', {class: 'largebutton warningbutton'}
  )
  var new_button_d = create_element(
    'button', 'New', {class: 'largebutton primarybutton', disabled: 'disabled'}
  )
  var open_button_d = create_element(
    'button', 'Open', {class: 'largebutton', disabled: 'disabled'}
  )
  var settings_button_d = create_element(
    'button', 'Settings', {class: 'largebutton warningbutton', disabled: 'disabled'}
  )
  var button_group = create_element(
    'div', [new_button, open_button, settings_button,
           new_button_d, open_button_d, settings_button_d]
  )
  
  update_root(title, button_group)
}

export { create_main_menu }
