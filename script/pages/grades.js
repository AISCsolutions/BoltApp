define(['jquery', 'lib/classy', 'appstate', 'rules'], function($, classy, appstate, Rules) {
  "use strict";

  return classy({
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
    $el: function() {
      return $('#grade [data-role="content"]')
    },
    $: function(selector) {
      return this.$el().find(selector)
    },
    wire: function() {
      this.$el().on('click', 'li a', function() {
        appstate.data.bolt.grade = $(this).find('h2').text()
        appstate.save()
      })
    },
    show: function() {
      this.update()
    }
  })
})
