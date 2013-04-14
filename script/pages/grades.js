define(['jquery', 'can/control', 'appstate', 'rules'], function($, Control, appstate, Rules) {
  "use strict";

  return Control({
    current: function() {
      return Rules.bolt(appstate.data.bolt).anyGrade().allowedGrades()
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

        var name = $el.find('h2').html()
        $el.find('img').attr('src', 'images/bolts/'+name+'-'+appstate.data.bolt.type+'.png')
      })
    },
    $: function(selector) {
      return this.element.find(selector)
    },
    'li a click': function(a) {
      appstate.data.bolt.grade = $(a).find('h2').text()
      appstate.save()
    },
    show: function() {
      this.update()
    }
  })
})
