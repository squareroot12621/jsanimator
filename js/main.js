import { create_loading_screen, load_module } from './loading.js'

function initialize_js_animator() {
  create_loading_screen()
  load_module('Mousetrap', 'https://craig.global.ssl.fastly.net/js/mousetrap/mousetrap.js')
  // TODO: setInterval?
}

window.onload = initialize_js_animator()
