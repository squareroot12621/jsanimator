import { create_element } from './create_element.js'

function create_loading_screen() {
  var loading_paragraph = create_element('p', 'Loading...')
  var loading_container = create_element('div', loading_paragraph, {'id': 'scripterror'})
  
  var js_animator = document.getElementById('jsanimator')
  js_animator.replaceChildren(loading_container)
}

export {
  create_loading_screen,
}
