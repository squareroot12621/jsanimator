import { create_element } from './create_element.js'

function create_loading_screen() {
  var loading_dots = []
    for (var dot = 1; dot <= 3; ++dot) {
      loading_dots.push(create_element('span',
                                       '.',
                                       {'class': 'loadingdot',
                                        'id': 'loadingdot' + dot.toString()}))
    }
  var loading_paragraph = create_element('p',
                                         ['Loading', ...loading_dots],
                                         {'id': 'loadingtext'})
  var loading_container = create_element('div',
                                         loading_paragraph,
                                         {'id': 'scripterror'})
  
  var js_animator = document.getElementById('jsanimator')
  js_animator.replaceChildren(loading_container)
}

export { create_loading_screen }
