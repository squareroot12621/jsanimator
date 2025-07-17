import {globals} from './globals.js'
import {create_element, update_root} from './utilities.js'

function create_editing_screen() {
  var nav_bar_element_options = [
    ['File', ['New', 'Open', 'Save', 'Save As', 'Save Copy']],
    ['Edit', ['Option 1', 'Option 2', 'Option 3']],
    ['Preview', ['Option 4']],
    ['Publish', ['Render Animation']]
  ]
  var nav_bar_elements = []
  for (var [name, options] of nav_bar_element_options) {
    var nav_bar_button_text = create_element(
      'div', name, {class: 'navbarbuttontext'}
    )
    var button_option_list = options.map(
      (option) => create_element('div', option, {class: 'buttonoption'})
    )
    var button_options = create_element(
      'div', button_option_list, {class: 'buttonoptions'}
    )
    var button_option_arrow = create_element(
      'div', [], {class: 'buttonoptionarrow'}
    )
    var button_option_wrapper = create_element(
      'div', [button_option_arrow, button_options],
      {class: 'buttonoptionwrapper'}
    )
    nav_bar_elements.push(create_element(
      'div', [nav_bar_button_text, button_option_wrapper],
      {class: 'navbarbutton'}
    ))
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
