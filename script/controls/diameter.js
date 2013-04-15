define(['jquery', 'can/control', 'appstate'], function($, Control, appstate) {
  "use strict";

  return Control({
    init: function(element, options) {
      this.callback = options.callback
      this.element.find('input').val(appstate.get('bolt.diameter')).change()
      return this
    },
    height: function() {
      var $el = this.element
      var base = $el.height()
      var topMargin = parseInt($el.css('margin-top'), 10)
      var bottomMargin = parseInt($el.css('margin-bottom'), 10)
      var sliderMargin = 8
      var height = base + topMargin + bottomMargin + sliderMargin + 2
      //console.log(height, base, topMargin, bottomMargin, sliderMargin)
      return height
    },
    'input change': function(input) {
      var value = $(input).val()
      if (appstate.get('bolt.diameter') != value) {
        appstate.set('bolt.diameter', value)
        this.callback()
      }
    },
    render: function() {
      var $el = this.element
      var $slider = $el.find('.ui-slider-track')
      if ($slider.find('.slider-mark').length > 0) {return}
      var points = appstate.diameterInches
      var settings = (Object.keys(points).length - 1)
      for (var i = 1; i < settings; i++) {
        $('<div class="slider-mark">').appendTo($slider)
      }
    },
    positionMarks: function() {
      var $el = this.element
      var $slider = $el.find('.ui-slider-track')
      var width = $slider.width()
      var points = appstate.diameterInches
      var settings = (Object.keys(points).length - 1)
      var step = width / settings
      var left = step
      $slider.find('.slider-mark').each(function() {
        $(this).css('left', left)
        left += step
      })
    },
    show: function() {
      this.render()
      setTimeout(this.positionMarks.bind(this), 0)
    }
  })
})
