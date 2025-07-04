import { create_loading_screen, load_modules } from './loading.js'

function initialize_js_animator() {
  create_loading_screen()
  load_modules()
  // TODO: setInterval?
}

window.onload = initialize_js_animator()
