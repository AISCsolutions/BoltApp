define(['jquery'], function($) {
  "use strict"

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
      for (var name in data) {
        this.$datum(name).html(data[name])
      }
    }
  }
})
