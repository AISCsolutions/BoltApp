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
