define(['jquery', 'can/control'], function($, Control) {
  "use strict";

  return Control({
    init: function(element, options) {
      this.appstate = options.appstate
      this.parts = options.parts
    },
    show: function() {
      this.select(this.appstate.get('diagram'))
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
    "{appstate} change": function(data, ev, attr, how, value) {
      if (attr == 'diagram') {
        this.select(value)
      }
    }
  })
})
