function create_element(tag, content, attributes) {
  var element = document.createElement(tag)
  element.append(...content)
  for (var [key, value] of Object.entries(attributes)) {
    element.setAttribute(key, value)
  }
}

export { create_element }
