import create_loading_screen from './loading'

function initialize_js_animator() {
  document.getElementById('jsanimator').replaceChildren()
  // TEST: create_loading_screen()
  // TODO: setInterval?
}

window.onload = initialize_js_animator()
