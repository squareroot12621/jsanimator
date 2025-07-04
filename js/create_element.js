function create_element(tag, content=[], attributes={}) {
  var element = document.createElement(tag)

  console.log(content) //DEBUG
  if (typeof content === 'object') {
    element.append(...content)
  } else if (typeof content === 'string') {
    element.append(content)
  } else {
    throw new TypeError('content must be an array or a string')
  }
  
  for (var [key, value] of Object.entries(attributes)) {
    element.setAttribute(key, value)
  }

  return element
}

export { create_element }
