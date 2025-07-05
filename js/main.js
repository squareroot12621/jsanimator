import { create_loading_screen, load_modules } from './loading.js'
import { create_element } from './create_element.js'

function initialize_js_animator() {
  create_loading_screen()
  load_modules()
  // TODO: setInterval?
}

function create_error_screen(js_error_text) {
  var error_heading = create_element('h2', 'Uh oh!')
  
  var error_description_text = 'An error occurred in JS Animator. '
                               + 'To fix the issue, try refreshing your browser. '
                               + "If the error persists, don't be afraid to "
  var error_description_link_text = 'create an issue in the GitHub repository.'
  var error_description_link_reference = 'https://github.com/squareroot12621/jsanimator/issues/new/choose'
  var error_description_link = create_element('a', error_description_link_text,
                                              {'href': error_description_link_reference})
  var error_description = create_element('p', [error_description_text, error_description_link_text])

  var error_nerd_text = "If you're a nerd (like me), this error text will be useful:"
  var error_nerd = create_element('p', error_nerd_text)

  var error_box = create_element('p', js_error_text)

  var js_animator = document.getElementById('jsanimator')
  js_animator.replaceChildren(error_heading, error_description, error_nerd, error_box)
}

window.addEventListener('error', create_error_screen)
window.addEventListener('unhandledrejection', create_error_screen)
window.onload = initialize_js_animator()
