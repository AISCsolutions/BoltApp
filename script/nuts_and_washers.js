define(['jquery'], function($) {
  "use strict"

  var project = function(objects, property) {
    return objects.map(function(x) {return x[property]})
  }

  return {
    clone: function(selector, rules) {
      var dup = Object.create(this)
      dup.selector = selector
      dup.rules = rules
      return dup
    },
    $: function(selector) {
      return $(this.selector).find(selector)
    },
    $datum: function(name) {
      return this.$('[title="'+name+'"]')
    },
    wire: function() {
      var nw = this.rules.gradeTypeFinish()
      if (nw) { this.update(nw) }
    },
    update: function(data) {
      this.updateFields(data)
      this.updateLegal(data)
    },
    updateFields: function(data) {
      for (var name in data) {
        this.$datum(name).html(data[name] || '')
      }
    },
    updateLegal: function(data) {
      var nuts = data['Nut Grade'].split(', ')
      this.$('li.nut').each(function() {
        var $el = $(this)
        if (nuts.indexOf($el.find('.nut.grade').html()) >= 0) {
          $el.removeClass('illegal')
        } else {
          $el.addClass('illegal')
        }
      })
      return this
    },
  }
})
