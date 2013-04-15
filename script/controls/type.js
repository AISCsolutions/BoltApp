define(['jquery', 'can/control'], function($, Control) {
  "use strict";

  return Control({
    init: function(element, options) {
      this.appstate = options.appstate
      $('label[for="type-'+this.appstate.get('bolt.type')+'"]').click()
    },
    'input[type="radio"] change': function(input) {
      this.appstate.set('bolt.type', $(input).val())
    }
  })
})
