define(['jquery', 'jquerymobile', 'can/control'],
function($, mobile, Control) {
  "use strict";

  return Control({
    init: function(element, options) {
      this.appstate = options.appstate
      return this
    },
    open: function() {
      this.element.addClass('automatic')
      mobile.changePage( "#disclaimer" )
    },
    'a click': function() {
      this.element.removeClass('automatic')
      this.appstate.set('agreedToDisclaimer', true)
    }
  })
})
