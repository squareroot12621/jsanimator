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
    'button', 'Settings', {class: 'largebutton'}
  )
  var button_group = create_element(
    'div', [new_button, open_button, settings_button]
  )
  
  update_root(title, button_group)
}

export { create_main_menu }
