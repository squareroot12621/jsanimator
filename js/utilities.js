import {globals} from './globals.js'

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

function create_dialog(content, required=false) {
  var dialog = create_element(
    'dialog', content, {
      open: '',
      closedby: required ? 'none' : 'any',
      'aria-modal': true,
    }
  )
  var dialog_container = create_element('div', dialog, {class: 'dialog'})
  dialog.addEventListener('close', () => {
    dialog_container.remove()
  })
  document.getElementById('jsanimator').append(dialog_container)

  return dialog
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

function get_cookie(name) {
  if (!globals.cookies_allowed) {
    return null
  }
  return localStorage.getItem(name)
}

function set_cookie(name, value) {
  if (!globals.cookies_allowed) {
    return undefined
  }
  localStorage.setItem(name, value)
}

function remove_cookie(name) {
  if (!globals.cookies_allowed) {
    return undefined
  }
  localStorage.removeItem(name)
}

function cross_platformify_shortcut(shortcut) {
  var apple_platform = /Mac|iPod|iPhone|iPad/.test(navigator.platform)
  if (apple_platform) {
    var shortcut_sections = shortcut.split('+')
    var output = []
    if (shortcut_sections.includes('Alt')) {
      output.push('\u2325') // Option
    }
    if (shortcut_sections.includes('Shift')) {
      output.push('\u21E7') // Shift
    }
    if (shortcut_sections.includes('Ctrl')) {
      output.push('\u2318') // Command
    }
    var main_key = shortcut_sections.at(-1)
    output.push(main_key === 'Tab' ? '\u21E5'
                : main_key === 'Enter' ? '\u23CE'
                : main_key === 'Backspace' ? '\u232B'
                : main_key === 'Up' ? '\u2191'
                : main_key === 'Down' ? '\u2193'
                : main_key === 'Left' ? '\u2190'
                : main_key === 'Right' ? '\u2192'
                : main_key)
    return output.join('')
  }
  // If it's not Apple, don't do anything
  return shortcut
}

export {
  create_element,
  update_root,
  create_dialog,
  resize_root,
  resize_root_instant,
  once,
  local_storage_available,
  get_cookie,
  set_cookie,
  remove_cookie,
  cross_platformify_shortcut
}
