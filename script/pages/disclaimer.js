define(['jquery', 'jquerymobile', 'can/control'],
function($, mobile, Control) {
  "use strict";

  return Control({
    init: function(element, options) {
      this.appstate = options.appstate
      return this
    },
    open: function() { mobile.changePage( "#disclaimer" ) },
    'a click': function() {
      this.appstate.set('agreedToDisclaimer', true)
    }
  })
})
