import { create_element } from './create_element.js'

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
  
  var js_animator = document.getElementById('jsanimator')
  js_animator.replaceChildren(loading_container)
}

async function load_module(module_name, module_url) {
  var loading_info = document.getElementById('loadinginfo')
  loading_info.replaceChildren(`Loading ${module_name}...`)
  
  const Mousetrap = await import(module_url) // Currently this is just a waste of time
  
  var loading_progress = document.getElementById('loadingprogress')
  var new_progress = 0.67
  loading_progress.replaceChildren(`${Math.round(new_progress * 100)}%`)
  loading_progress.style.setProperty('font-weight', 200 + 700 * new_progress)
}

export { create_loading_screen, load_module }
