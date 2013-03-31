define(['jquery', 'appstate', 'rules'], function($, appstate, Rules) {
  "use strict";

  return {
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
      })
    },
    $el: function() {
      return $('#grade [data-role="content"]')
    },
    $: function(selector) {
      return this.$el().find(selector)
    },
    wire: function() {
      this.$('li').each(function() {
        var $el = $(this)
        var name = $el.find('h2').html()
        $el.find('img').attr('src', 'images/bolts/'+name+'-'+appstate.data.bolt.type+'.png')
      })

      this.$el().on('click', 'li a', function() {
        appstate.data.bolt.grade = $(this).find('h2').text()
        appstate.save()
      })

      this.update()
    },
  }
})
