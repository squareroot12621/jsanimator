import {globals} from './globals.js'
import {create_element, update_root} from './utilities.js'

function create_editing_screen() {
  console.log(globals.currentFile)
  var title = create_element('h1', globals.currentFile['Test1 - Copy/svgs/rectangle.svg'].slice(0, 50))

  update_root(title)
}

export {create_editing_screen}
