define(['jquery', 'can/control'], function($, Control) {
  "use strict";

  return Control({
    init: function(element, options) {
      this.parts = options.parts
    },
    scrollTo: function(x) {
      this.element.find('ul').animate({'margin-left': x}, 400)
    },
    pane: function(n) {
      this.scrollTo(-this.element.width()*n)
    },
    select: function(name) {
      var part = this.parts[name]
      this.pane(part.index)
      part.controls.forEach(function(control) {control.show()})
    },
  })
})
