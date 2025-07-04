function create_element(tag, content=[], attributes={}) {
  var element = document.createElement(tag)

  console.log(content) //DEBUG
  // 'object' actually means array here
  if (typeof content === 'object') {
    element.append(...content)
  } else {
    element.append(content)
  }
  
  for (var [key, value] of Object.entries(attributes)) {
    element.setAttribute(key, value)
  }

  return element
}

export { create_element }
