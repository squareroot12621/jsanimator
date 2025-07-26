import {create_loading_screen, load_modules} from './loading.js'
import {create_main_menu} from './main_menu.js'

import {globals} from './globals.js'
import {resize_root, resize_root_instant, once} from './utilities.js'
import {create_error_screen} from './error.js'

async function initialize_js_animator() {
  resize_root_instant()
  create_loading_screen()
  globals.modules = await load_modules()
  create_main_menu()
}

var create_error_screen_wrapper = once(create_error_screen)
window.addEventListener('error', create_error_screen_wrapper)
window.addEventListener('unhandledrejection', create_error_screen_wrapper)
window.addEventListener('resize', resize_root)
window.addEventListener('load', initialize_js_animator)
