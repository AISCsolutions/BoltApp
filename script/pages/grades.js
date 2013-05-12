define(['jquery', 'can/control', 'appstate', 'rules'], function($, Control, appstate, Rules) {
  "use strict";

  return Control({
    current: function() {
      return Rules.bolt(appstate.get('bolt')).anyGrade().allowedGrades()
    },
    update: function() {
      var current = this.current()
      this.$('li').each(function() {
        var $el = $(this)

        if (current.indexOf($el.attr('title')) >= 0) {
          $el.removeClass('illegal')
        } else {
          $el.addClass('illegal')
        }

        var name = $el.attr('title')
        $el.find('img').attr('src', 'images/bolts/'+name+'-'+appstate.get('bolt.type')+'.png')
      })
    },
    $: function(selector) {
      return this.element.find('[data-role="content"] ' + selector)
    },
    '[data-role="content"] li a click': function(a) {
      appstate.set('bolt.grade', $(a).parents('li').attr('title'))
    },
    ' pagebeforeshow': function() {
      this.update()
    }
  })
})
