import {globals} from './globals.js'
import {create_element, update_root} from './utilities.js'

function create_editing_screen() {
  console.log(globals.menu_bar)

  /* Generate nav_bar_element_options
     from globals.menu_bar and globals.commands */
  var nav_bar_element_options = []
  var current_submenu
  for (var [name, options] of globals.menu_bar.entries()) {
    current_submenu = [name, []]
    for (var [index, option] of options.entries()) {
      if (option !== null) {
        var command = globals.commands[option]
        current_submenu[1].push({
          name: command.menu_path.at(-1),
          keyboard_shortcuts: command.keyboard_shortcuts,
          end_of_section: false,
        })
      } else if (index > 0 && index < options.length - 1) {
        // Don't add a <hr> if it's the start or end of the submenu
        current_submenu[1][current_submenu[1].length - 1].end_of_section = true
      }
    }
    nav_bar_element_options.push(current_submenu)
  }

  console.log(nav_bar_element_options)
  
  var nav_bar_elements = []
  for (var [name, options] of nav_bar_element_options) {
    var nav_bar_button_text = create_element(
      'button', name, {class: 'navbarbuttontext notbutton'}
    )
    var button_option_list = options.flatMap(
      (option) => {
        var element_name = create_element(
          'div', option.name, {class: 'buttonoptionname'}
        )
        var element_shortcuts = create_element(
          'div', [], {class: 'kbd buttonoptionshortcuts'}
        )
        for (var [index, shortcut] of option.keyboard_shortcuts.entries()) {
          element_shortcuts.append(create_element('kbd', shortcut))
          if (index < option.keyboard_shortcuts.length - 1) {
            element_shortcuts.append(create_element('span', ', '))
          }
        }
        var element = create_element(
          'button',
          /* Don't create a keyboard shortcuts div if it does nothing--
             it'll take up space if the option name is very long */
          option.keyboard_shortcuts.length
          ? [element_name, element_shortcuts]
          : [element_name],
          {class: 'buttonoption notbutton'}
        )
        /* If the element gets clicked,
           hide the menu it's part of. */
        element.addEventListener('click', (event) => {
          event.stopPropagation()
          var target = event.target.closest('.navbarbutton')
          target.setAttribute('data-hovered', 'false')
          target.setAttribute('data-clicked', 'false')
        })
        // Add a horizontal bar at the end of a section.
        return option.end_of_section
               ? [element, create_element('hr')]
               : [element]
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
    nav_bar_button.setAttribute('data-clicked', 'false')

    /* Add event listeners to show and hide the submenus
       instead of CSS, due to its intricacies. */
    nav_bar_button.addEventListener('mouseenter', (event) => {
      var target = event.target.closest('.navbarbutton')
      var clicked_button = document.querySelector('[data-clicked=true]')
      if (clicked_button && clicked_button !== target) {
        target.setAttribute(
          'data-clicked', clicked_button.getAttribute('data-clicked')
        )
        clicked_button.setAttribute('data-hovered', 'false')
        clicked_button.setAttribute('data-clicked', 'false')
      }
      target.setAttribute('data-hovered', 'true')
    })
    nav_bar_button.addEventListener('mouseleave', (event) => {
      var target = event.target.closest('.navbarbutton')
      if (target.getAttribute('data-clicked') === 'false') {
        target.setAttribute('data-hovered', 'false')
      }
    })
    nav_bar_button.addEventListener('click', (event) => {
      document.querySelector('[data-hovered=true]')
             ?.setAttribute('data-hovered', 'false')
      document.querySelector('[data-clicked=true]')
             ?.setAttribute('data-clicked', 'false')
      var target = event.target.closest('.navbarbutton')
      target.setAttribute('data-hovered', 'true')
      target.setAttribute('data-clicked', 'true')
    })
    
    nav_bar_elements.push(nav_bar_button)

    /* Close the current submenu
       if the user clicks outside of a menu.
       Adapted from https://css-tricks.com/dangers-stopping-event-propagation/. */
    document.getElementById('jsanimator')
      .addEventListener('click', (event) => {
        if (!event.target.closest('.navbarbutton')) {
          var target = document.querySelector('[data-hovered=true]')
          // TODO: Why does this fail?
          target?.setAttribute('data-hovered', 'false')
          target?.setAttribute('data-clicked', 'false')
        }
      })
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
