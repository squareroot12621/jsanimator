import { create_element } from './utilities.js'

function create_main_menu() {
  var title = create_element('h1', 'JS Animator')
  
  var js_animator = document.getElementById('jsanimator')
  js_animator.replaceChildren(title)
}

export { create_main_menu }
