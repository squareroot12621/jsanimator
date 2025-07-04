import { create_loading_screen, load_module } from './loading.js'

function initialize_js_animator() {
  create_loading_screen()
  load_module('Mousetrap', 'https://craig.global.ssl.fastly.net/js/mousetrap/mousetrap.js?a4098')
  // TODO: setInterval?
}

window.onload = initialize_js_animator()
