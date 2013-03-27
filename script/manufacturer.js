define(['jquery'], function($) {
  "use strict"

  return {
    clone: function(selector) {
      this.selector = selector
      return this
    },
    $el: function() {
      return $(this.selector)
    },
    read: function() {
      var $el = this.$el()
      return {
        name: $el.find('.name').html(),
        location: $el.find('.location').html(),
        bolt: $el.find('.bolt').attr('src'),
        website: $el.parent().parent().parent().find('.website').attr('href')
      }
    },
    write: function(mfg) {
      var $el = this.$el()
      $el.find('.name').html(mfg.name)
      $el.find('.location').html(mfg.location)
      $el.find('.website').attr('href', mfg.website)
      $el.find('.bolt').attr('src', mfg.bolt)
    }
  }
})
