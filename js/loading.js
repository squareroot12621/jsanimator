import { create_element } from './create_element.js'

function create_loading_screen() {
  var loading_paragraph = create_element('p', 'Loading...')
  
  var loading_container = document.createElement('div')
  loading_container.setAttribute('id', 'scripterror')
  loading_container.append(loading_paragraph)
  
  var js_animator = document.getElementById('jsanimator')
  js_animator.replaceChildren(loading_container)
}

export {
  create_loading_screen,
}
