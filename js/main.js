import { create_loading_screen, load_modules } from './loading.js'
import { create_element } from './create_element.js'

function initialize_js_animator() {
  create_loading_screen()
  load_modules()
  // TODO: setInterval?
}

function get_error_info(e) {
  /* If we don't have an Error,
     try to turn it into something that is an Error */
  if (!(e instanceof Error)) {
    if (e?.error) {
      e = e.error
    } else if (e?.reason) {
      e = e.reason
    }
  }

  var error_type = e?.type ?? 'No type available'
  var error_string = e.toString()
  var error_stack = e?.stack ?? 'No stack available'
  var error_info_text = [error_type, error_string, error_stack].join('\n')

  return error_info_text
}

function create_error_screen(error) {
  const STOP_SENTINEL = 'STOP JAVASCRIPT'

  // Don't cause an infinite loop with create_error_screen throwing
  if (error.message === STOP_SENTINEL) {
    return undefined;
  }
  
  var heading = create_element('h2', 'Uh oh!')
  
  var description_text = 'An error occurred in JS Animator. '
                         + 'To fix the issue, try refreshing your browser. '
                         + "If the error persists, don't be afraid to "
  var description_link_text = 'create an issue in the GitHub repository.'
  var description_link_reference = 'https://github.com/squareroot12621/jsanimator/issues/new/choose'
  var description_link = create_element('a', description_link_text,
                                        {'href': description_link_reference})
  var description = create_element('p', [description_text, description_link])

  var nerd_text = "If you're a nerd (like me), this error text will be useful:"
  var nerd = create_element('p', nerd_text)

  var error_info = create_element('output', get_error_info(error),
                                  {'id': 'errorinfo'})

  var noscript_container = create_element('div',
                                          [heading, description, nerd, error_info],
                                          {'id': 'scripterror'})
  
  var js_animator = document.getElementById('jsanimator')
  js_animator.replaceChildren()
  js_animator.append(noscript_container)

  // Exit immediately
  console.log(error) //DEBUG
  throw new Error(STOP_SENTINEL)
}

window.addEventListener('error', create_error_screen)
window.addEventListener('unhandledrejection', create_error_screen)
window.onload = initialize_js_animator()
