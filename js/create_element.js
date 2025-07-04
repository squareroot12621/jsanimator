function create_element(tag, content=[], attributes={}) {
  var element = document.createElement(tag)
  /* Passing a string should still work,
     because it's an array of characters */
  element.append(...(content ?? []))
  for (var [key, value] of Object.entries(attributes)) {
    element.setAttribute(key, value)
  }
}

export { create_element }
