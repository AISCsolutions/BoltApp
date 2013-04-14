define(function() {
  return function(properties) {
    var f = function() {
      if (this.init) {
        this.init.apply(this, arguments)
      }
    }
    f.prototype = properties
    return f;
  }
})
