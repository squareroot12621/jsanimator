function create_element(tag, content=[], attributes={}) {
  var element = document.createElement(tag)

  if (content instanceof Array) {
    element.append(...content)
  } else {
    element.append(content)
  }
  
  for (var [key, value] of Object.entries(attributes)) {
    element.setAttribute(key, value)
  }

  return element
}

function update_root(...elements) {
  document.getElementById('jsanimator').replaceChildren(...elements)
}

function resize_root() {
  var js_animator = document.getElementById('jsanimator')
  var timeout = js_animator.getAttribute('data-resize-timeout')
  window.addEventListener('resize', function() {
    clearTimeout(timeout)
    js_animator.setAttribute(
      'data-resize-timeout', setTimeout(resize_root_inner, 250)
    )
  })
}

function resize_root_inner() {
  var js_animator = document.getElementById('jsanimator')
  var bounding_rect = js_animator.getBoundingClientRect()
  var width = bounding_rect.width
  var height = bounding_rect.height
  js_animator.setAttribute(
    'data-orientation', width > height ? 'landscape' : 'portrait'
  )
}

function once(fn, context) { 
  var result;
  return function() { 
    if (fn) {
      result = fn.apply(context || this, arguments);
      fn = context = null;
    }
    return result;
  };
}

export {create_element, update_root, resize_root, once}
