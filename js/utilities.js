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
      'data-resize-timeout', setTimeout(resize_root_instant, 100)
    )
  })
}

function resize_root_instant() {
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

function local_storage_available() {
  var storage
  try {
    storage = window.localStorage
    const x = "__storage_test__"
    storage.setItem(x, x)
    storage.removeItem(x)
    return true
  } catch (e) {
    return (
      e instanceof DOMException
      && e.name === "QuotaExceededError"
      /* acknowledge QuotaExceededError only if
         there's something already stored */
      && storage
      && storage.length !== 0
    )
  }
}

function cross_platformify_shortcut(shortcut) {
  var apple_platform = /Mac|iPod|iPhone|iPad/.test(navigator.platform)
  if (apple_platform) {
    var shortcut_sections = shortcut.toLowerCase().split('+')
    var output = []
    if (shortcut_sections.includes('alt')) {
      output.push('\u2325') // Option
    }
    if (shortcut_sections.includes('shift')) {
      output.push('\u21E7') // Shift
    }
    if (shortcut_sections.includes('ctrl')) {
      output.push('\u2318') // Command
    }
    output.push(shortcut_sections.at(-1))
    return output.join('')
  }
  // If it's not Apple, don't do anything
  return shortcut
}

export {
  create_element,
  update_root,
  resize_root,
  resize_root_instant,
  once,
  local_storage_available,
  cross_platformify_shortcut
}
