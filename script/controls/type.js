define(['jquery', 'can/control'], function($, Control) {
  "use strict";

  return Control({
    select: function(type) {
      $('label[for="type-'+type+'"]').click()
      return this
    },
    'input[type="radio"] change': function(input) {
      input.trigger('selected', $(input).val())
    }
  })
})
