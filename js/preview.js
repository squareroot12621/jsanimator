import {create_element, update_root} from './utilities.js'

function create_preview_screen() {
  var back_button = create_element('button', '\uE2EA', {
    class: 'notbutton icon previewbutton',
    'aria-label': 'Back',
  })
  var animation_title = create_element(
    'h2', 'Preview Animation Test', {class: 'previewtitle'}
  )
  var header_section = create_element(
    'section', [back_button, animation_title], {class: 'previewheader'}
  )

  var preview_canvas = create_element(
    'canvas', [], {id: 'previewcanvas'}
  )
  var canvas_section = create_element(
    'section', [preview_canvas], {class: 'canvaswrapper'}
  )

  var play_pause_button = create_element(
    'button', 'pause', {class: 'notbutton icon previewbutton'}
  )
  var duration_div = create_element(
    'div', '0:37/0:42', {class: 'previewduration'}
  )
  var speed_div = create_element(
    'div', '0.125\u00D7', {class: 'previewspeed'}
  )
  var playback_section = create_element(
    'section', [play_pause_button, duration_div, speed_div], {class: 'previewplayback'}
  )

  var preview_wrapper = create_element(
    'article',
    [header_section, canvas_section, playback_section],
    {class: 'previewwrapper'},
  )
  update_root(preview_wrapper)
}

export {create_preview_screen}
