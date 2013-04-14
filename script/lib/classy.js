define(function() {
  return function(properties) {
    var f = function() {}
    f.prototype = properties
    return f;
  }
})
