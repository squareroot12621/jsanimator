import { create_loading_screen, load_module } from './loading.js'

function initialize_js_animator() {
  create_loading_screen()
  load_module('Mousetrap', 'https://cdn.jsdelivr.net/gh/ccampbell/mousetrap/mousetrap.min.js')
  // TODO: setInterval?
}

window.onload = initialize_js_animator()
