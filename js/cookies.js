import {
  create_element,
  update_root,
  local_storage_available
} from './utilities.js'
import {globals} from './globals.js'

async function create_cookie_screen() {
  globals.screen = 'cookies'

  var cookies_available = local_storage_available()

  var heading = create_element(
    'h2',
    cookies_available ? 'This site uses cookies' : 'Cookies are disabled'
  )
  if (cookies_available) {
    var body_text = 'JS Animator uses cookies to store '
                    + 'preferences locally on your device, '
                    + "meaning they won't be sent to servers "
                    + 'or advertising companies. '
                    + 'You can block these cookies, '
                    + 'but this will stop preferences '
                    + 'from being saved after leaving the app. '
                    + 'Your decision is stored '
                    + "so you don't have to do it again, "
                    + 'and you can change your decision '
                    + 'at any time.'
  } else {
    var body_text = 'Cookies are disabled in your browser, '
                    + 'so preferences you set in JS Animator '
                    + 'will not save if you leave. '
                    + 'You can reenable cookies in your browser '
                    + 'to keep your preferences, '
                    + "but you don't have to."
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

  var cookie_decision = await new Promise((resolve, reject) => {
    for (let button of buttons) {
      button.addEventListener('click', () => {
        resolve(button.innerText)
      })
    }
  })
  var cookies_allowed = cookie_decision === 'Allow'
  if (!cookies_allowed) {
    localStorage.clear()
  }
  localStorage.setItem('_cookies_allowed', cookies_allowed ? '1' : '0')
  console.log(localStorage.getItem('_cookies_allowed'))
}

export {create_cookie_screen}
