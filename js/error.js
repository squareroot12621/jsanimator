import {create_element, update_root} from './utilities.js'

function get_error_info(error) {
  var error_type = error?.type ?? 'No type available'
  var error_string = error.toString()
  var error_stack = error?.stack ?? 'No stack available'
  var error_info_text = [error_type, error_string, error_stack].join('\n')
  return error_info_text
}

function create_error_screen(error) {
  const STOP_SENTINEL = 'STOP JAVASCRIPT'

  /* If we don't have an Error,
     try to turn it into something that is an Error */
  if (!(error instanceof Error)) {
    if (error?.error) {
      error = error.error
    } else if (error?.reason) {
      error = error.reason
    }
  }
  // Don't cause an infinite loop with create_error_screen throwing
  if (error.message === STOP_SENTINEL) {
    return undefined
  }

  // Create the HTML
  var heading = create_element('h2', 'Uh oh!')
  var description_text_before = 'A critical error occurred in JS Animator. '
                                + 'To report this bug, '
  var description_link_text = 'open an issue in the GitHub repository'
  var description_text_after = ". Don't forget to include the procedure "
                               + 'you took to get this error!'
  var description_link_reference = (
    'https://github.com/squareroot12621/jsanimator/issues/new/choose')
  var description_link = create_element(
    'a', description_link_text, {'href': description_link_reference}
  )
  var description = create_element(
    'p', [description_text_before, description_link, description_text_after]
  )
  var info_description_text = 'If you do open a GitHub issue about this, '
                              + 'this error text will be useful:'
  var info_description = create_element('p', info_description_text)
  var error_info = create_element(
    'pre', get_error_info(error), {'id': 'errorinfo'}
  )
  var noscript_container = create_element(
    'div', [heading, description, info_description, error_info],
    {'id': 'scripterror'}
  )
  update_root(noscript_container)

  // Exit immediately
  throw new Error(STOP_SENTINEL)
}

export {create_error_screen}
