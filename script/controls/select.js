define(['jquery', 'can/control'], function($, Control) {
  "use strict";

  return Control({
    select: function(item) {
      $('label[for="'+item+'-select"]').click()
    },
    height: function() {
      var $el = this.element
      var base = $el.height()
      var topMargin = parseInt($el.find('fieldset').css('margin-top'), 10)
      var bottomMargin = parseInt($el.find('fieldset').css('margin-bottom'), 10)
      var height = base + topMargin + bottomMargin + 2
      //console.log(height, base, topMargin, bottomMargin)
      return height
    },
    'input change': function(input) {
      input.trigger('selected', $(input).val())
    }
  })
})
