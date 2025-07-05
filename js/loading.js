import { create_element, update_root } from './utilities.js'

function create_loading_screen() {
  var loading_dots = []
    for (var dot = 1; dot <= 3; ++dot) {
      loading_dots.push(create_element('span',
                                       '.',
                                       {'class': 'loadingdot',
                                        'id': `loadingdot${dot.toString()}`}))
    }
  var loading_paragraph = create_element('p',
                                         ['Loading', ...loading_dots],
                                         {'id': 'loadingtext'})
  var loading_progress = create_element('output',
                                        '0%',
                                        {'id': 'loadingprogress'})
  loading_progress.style.setProperty('font-weight', 200)
  var loading_info = create_element('output',
                                    'Loading third-party modules...',
                                    {'id': 'loadinginfo'})
  var loading_container = create_element('div',
                                         [loading_paragraph, loading_progress, loading_info],
                                         {'id': 'loadingcontainer'})
  
  update_root(loading_container)
}

async function load_module(module_name, module_url, new_progress) {
  var loading_info = document.getElementById('loadinginfo')
  loading_info.replaceChildren(`Loading ${module_name}...`)
  
  var output = await import(module_url)
  
  var loading_progress = document.getElementById('loadingprogress')
  loading_progress.replaceChildren(`${Math.round(new_progress * 100)}%`)
  loading_progress.style.setProperty('font-weight', 200 + 700 * new_progress)

  return output
}

async function load_modules() {
  var modules_to_import = [
    ['Mousetrap', 'https://cdn.jsdelivr.net/gh/ccampbell/mousetrap/mousetrap.min.js'],
    ['FFmpeg', 'https://cdn.jsdelivr.net/npm/ffmpeg.js/ffmpeg-worker-mp4.js'],
  ]
  var imported_modules = {}
  for (var [module_index, [module_name, module_url]] of modules_to_import.entries()) {
    var progress = (module_index + 1) / modules_to_import.length
    await load_module(module_name, module_url, progress)
  }
}

export { create_loading_screen, load_modules }
