import {create_element, update_root} from './utilities.js'

function create_main_menu() {
  var title = create_element('h1', 'JS Animator')

  var button_group = create_element('div', [], {id: 'menubuttongroup'})
  
  var button_parameters = [
    {name: 'New',
     class: 'primarybutton',
     description: 'Start a new animation'},
    {name: 'Open',
     class: '',
     description: 'Continue a previous project'},
    {name: 'Settings',
     class: '',
     description: 'Customize your workspace'},
  ]
  for (var button of button_parameters) {
    var all_classes = (
      `narrowbutton largebutton ${button.class}`.trim()
    )
    var new_button = create_element(
      'button', button.name, {class: all_classes}
    )
    var new_description = create_element(
      'div', button.description, {class: 'buttondescription'}
    )
    var new_button_wrapper = create_element(
      'div', [new_button, new_description], {class: 'menubuttonwrapper'}
    )
    button_group.append(new_button_wrapper)
  }
  
  update_root(title, button_group)
}

export {create_main_menu}
