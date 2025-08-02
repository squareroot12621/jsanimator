import {
  create_element,
  update_root,
  local_storage_available
} from './utilities.js'
import {globals} from './globals.js'

async function cookie_decision_logic() {
  var cookies_available = local_storage_available()
  try {
    var cookie_item = localStorage.getItem('_cookies_allowed')
    var previously_decided = cookie_item === '1' || cookie_item === '0'
  } catch {
    var previously_decided = false
  }
  
  if (cookies_available && previously_decided) {
    var cookie_decision = cookie_item === '1' ? 'Allow' : 'Block'
  } else {
    var buttons = create_cookie_screen(cookies_available)
    var cookie_decision = await new Promise((resolve, reject) => {
      for (let button of buttons) {
        button.addEventListener('click', () => {
          resolve(button.innerText)
        })
      }
    })
  }

  var cookies_allowed = cookie_decision === 'Allow'
  try {
    if (!cookies_allowed) {
      localStorage.clear()
    }
    localStorage.setItem('_cookies_allowed', cookies_allowed ? '1' : '0')
  } catch {
    // If we can't set cookies, who cares if we get an error?
  }
  globals.cookies_allowed = cookies_allowed
}

function create_cookie_screen(cookies_available) {
  globals.screen = 'cookies'

  var heading = create_element(
    'h2',
    cookies_available ? 'This site uses cookies' : 'Cookies are disabled'
  )
  if (cookies_available) {
    var body_text = 'JS Animator uses cookies to store preferences '
                    + "locally on your device, meaning they won't be sent "
                    + 'to servers or advertising companies. '
                    + 'You can block these cookies, '
                    + 'but this will stop preferences '
                    + 'from being saved after leaving the website. '
                    + 'Your decision is stored '
                    + "so you don't have to do it again, "
                    + 'but you can change your decision at any time '
                    + 'by going to Settings \u2192 Cookies.'
  } else {
    var body_text = 'Cookies are disabled in your browser, '
                    + 'so preferences you set in JS Animator '
                    + 'will not save if you leave. '
                    + 'If you want to keep your preferences, '
                    + 'reenable cookies in your browser. '
                    + 'You may also have to go to Settings \u2192 Cookies '
                    + 'and turn them on manually.'
  }
  var body = create_element('p', body_text)

  if (cookies_available) {
    var buttons = [
      create_element(
        'button', 'Block', {class: 'narrowbutton largebutton warningbutton'}
      ),
      create_element(
        'button', 'Allow', {class: 'narrowbutton largebutton primarybutton'}
      ),
    ]
  } else {
    var buttons = [
      create_element(
        'button', 'OK', {class: 'narrowbutton largebutton primarybutton'}
      ),
    ]
  }

  var button_container = create_element(
    'div', buttons, {class: 'centerbuttons'}
  )
  
  var cookie_container = create_element(
    'div', [heading, body, button_container],
    /* Technically this isn't a script error,
       but it needs to be styled like one */
    {'id': 'scripterror'}
  )
  update_root(cookie_container)

  return buttons
}

export {cookie_decision_logic}
