import {globals} from './globals.js'
import {create_element, update_root} from './utilities.js'

function create_editing_screen() {
  var nav_bar_element_options = [
    ['File', ['New', 'Open', 'Save', 'Save As', 'Save Copy']],
    ['Edit', ['Option 1', 'Option 2', 'Option 3', 'Keyboard Shortcuts']],
    ['Publish', ['Preview Animation', 'Render Animation']]
  ]
  var nav_bar_elements = []
  for (var [name, options] of nav_bar_element_options) {
    var nav_bar_button_text = create_element(
      'button', name, {class: 'navbarbuttontext notbutton'}
    )
    var button_option_list = options.map(
      (option) => {
        var element = create_element(
          'button', option, {class: 'buttonoption notbutton'}
        )
        element.addEventListener('click', (event) => {
          event.stopPropagation()
          event.target
               .closest('.navbarbutton')
               .setAttribute('data-hovered', 'false')
        })
        return element
      }
    )
    var button_options = create_element(
      'div', button_option_list, {class: 'buttonoptions'}
    )
    var button_option_hitbox = create_element(
      'div', button_options, {class: 'buttonoptionhitbox'}
    )
    var button_option_wrapper = create_element(
      'div', button_option_hitbox, {class: 'buttonoptionwrapper'}
    )
    var nav_bar_button = create_element(
      'div', [nav_bar_button_text, button_option_wrapper],
      {class: 'navbarbutton'}
    )
    nav_bar_button.setAttribute('data-hovered', 'false')
    nav_bar_button.addEventListener('mouseenter', (event) => {
      event.target
           .closest('.navbarbutton')
           .setAttribute('data-hovered', 'true')
    })
    nav_bar_button.addEventListener('mouseleave', (event) => {
      event.target
           .closest('.navbarbutton')
           .setAttribute('data-hovered', 'false')
    })
    nav_bar_button_text.addEventListener('focus', (event) => {
      event.target
           .closest('.navbarbutton')
           .setAttribute('data-hovered', 'true')
    })
    nav_bar_button_text.addEventListener('blur', (event) => {
      event.target
           .closest('.navbarbutton')
           .setAttribute('data-hovered', 'false')
    })
    nav_bar_button.addEventListener('click', (event) => {
      document.querySelector('[data-hovered=true]')
              .setAttribute('data-hovered', 'false')
      event.target
           .closest('.navbarbutton')
           .setAttribute('data-hovered', 'true')
    })
    nav_bar_elements.push(nav_bar_button)
  }
  var nav_bar = create_element('nav', nav_bar_elements, {id: 'navbar'})

  var toolbar = create_element('div', 'Toolbar', {id: 'toolbar'})

  var canvas = create_element('canvas', 'Canvas', {id: 'canvas'})
  var timeline = create_element('div', 'Timeline', {id: 'timeline'})
  var middle_section = create_element(
    'div', [canvas, timeline], {id: 'middlesection'}
  )
  
  var properties = create_element('div', 'Properties', {id: 'properties'})
  
  var bottom_section = create_element(
    'div', [toolbar, middle_section, properties], {id: 'bottomsection'}
  )

  var editing_container = create_element(
    'div', [nav_bar, bottom_section], {id: 'editingcontainer'}
  )

  update_root(editing_container)

  /* Export zip file with name
  
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
}

export {create_editing_screen}
