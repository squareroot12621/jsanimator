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
  for (var button in button_parameters) {
    var {button_name, button_extra_classes, button_description} = button
    var button_classes = (
      `fixedwidthbutton largebutton ${button_extra_classes}`.trim()
    )
    var new_button = create_element(
      'button', button_name, {class: button_classes}
    )
    var new_description = create_element(
      'div', button_description, {class: 'buttondescription'}
    )
    var new_button_wrapper = create_element('div', [new_button, new_description])
    button_group.append(new_button_wrapper)
  }
  
  update_root(title, button_group)
}

export {create_main_menu}
