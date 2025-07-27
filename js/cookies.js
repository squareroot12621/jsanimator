import {create_element, update_root} from './utilities.js'
import {globals} from './globals.js'

async function create_cookie_screen() {
  globals.screen = 'cookies'

  var title = create_element('h2', 'This site uses cookies')

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
  var body = create_element('p', body_text)

  var block_button = create_element(
    'button', 'Block', {class: 'narrowbutton largebutton warningbutton'}
  )
  var allow_button = create_element(
    'button', 'Allow', {class: 'narrowbutton largebutton primarybutton'}
  )

  update_root(title, body_text, block_button, allow_button)
  
  var result = await new Promise((resolve, reject) => {
    setTimeout(resolve, 10000)
  })
  console.log(result)
  return result
}

export {create_cookie_screen}
