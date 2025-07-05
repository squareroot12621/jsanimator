function once(func) {
  var executed = false;
  return function() {
    if (!executed) {
      return func(arguments)
      executed = true;
    }
  }
}

export { once }
