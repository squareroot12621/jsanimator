import { create_loading_screen } from './loading.js'

function initialize_js_animator() {
  create_loading_screen()
  // TODO: setInterval?
}

window.onload = initialize_js_animator()
