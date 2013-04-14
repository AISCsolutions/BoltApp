define(['jquery', 'lib/classy', 'appstate', 'rules'], function($, classy, appstate, Rules) {
  "use strict";

  return classy({
    init: function(element) {
      this.element = $(element)
      return this
    },
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
    wire: function() {
      this.element.on('click', 'li a', function() {
        appstate.data.bolt.grade = $(this).find('h2').text()
        appstate.save()
      })
    },
    show: function() {
      this.update()
    }
  })
})
