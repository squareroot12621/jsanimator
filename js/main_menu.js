import { create_element, update_root } from './utilities.js'

function create_main_menu() {
  var title = create_element('h1', 'JS Animator')
  
  update_root(title)
}

export { create_main_menu }
