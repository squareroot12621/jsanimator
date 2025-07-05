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
// dummy comment
export { once }
