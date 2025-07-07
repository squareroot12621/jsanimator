import {create_loading_screen, load_modules} from './loading.js'
import {create_main_menu} from './main_menu.js'

import {modules} from './globals.js'
import {once} from './utilities.js'
import {create_error_screen} from './error.js'

async function initialize_js_animator() {
  create_loading_screen()
  modules = await load_modules()
  create_main_menu()
}

var create_error_screen_wrapper = once(create_error_screen)
window.addEventListener('error', create_error_screen_wrapper)
window.addEventListener('unhandledrejection', create_error_screen_wrapper)
window.onload = initialize_js_animator()
