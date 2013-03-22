define(['jquery', 'appstate', 'rules'], function($, appstate, rules) {
  "use strict"

  var project = function(objects, property) {
    return objects.map(function(x) {return x[property]})
  }

  return {
    current: function() {
      return project(rules.typeFinish(), 'Bolt Grade')
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
    $: function(selector) {
      return $('#grade').find(selector)
    },
    wire: function() {
      this.$('li h2').each(function() {
        var $el = $(this)
        var name = $el.html()
        $('<p class="on-bolt grade-designator">'+name+'</p>').insertBefore($el)
      })

      $(this).on('click', 'li a', function() {
        appstate.data.bolt.grade = $(this).find('h2').text()
        appstate.save()
      })
    },
  }
})
