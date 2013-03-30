define(function() {
  "use strict"

  var LocalStore = function(key) {
    var emptyValue = localStorage.getItem('does not exist');

    return {
      load: function() {
        var value = localStorage.getItem(key);
        if (value == emptyValue) {
          return {}
        } else {
          return JSON.parse(value)
        }
      },
      save: function(data) {
        localStorage.setItem(key, JSON.stringify(data));
      },
      clear: function() {
        localStorage.removeItem(key);
      }
    }
  }

  var TransientStore = function(key) {
    return {
      load: function() { return {} },
      save: function(data) {},
      clear: function() {}
    }
  }

  if (window.localStorage && window.localStorage.getItem) {
    return LocalStore
  } else {
    return TransientStore
  }
})
