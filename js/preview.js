import {create_element, update_root} from './utilities.js'

function create_preview_screen() {
  var heading = create_element('h2', 'This is the test for Preview Animation')
  update_root(heading)
}

export {create_preview_screen}
