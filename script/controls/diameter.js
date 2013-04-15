define(['jquery', 'can/control'], function($, Control) {
  "use strict";

  return Control({
    init: function(element, options) {
      this.settings = options.settings
    },
    select: function(value) {
      this.element.find('input').val(value).change()
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
      input.trigger('selected', $(input).val())
    },
    render: function() {
      var $el = this.element
      var $slider = $el.find('.ui-slider-track')
      if ($slider.find('.slider-mark').length > 0) {return}
      for (var i = 1; i < this.settings; i++) {
        $('<div class="slider-mark">').appendTo($slider)
      }
    },
    positionMarks: function() {
      var $el = this.element
      var $slider = $el.find('.ui-slider-track')
      var width = $slider.width()
      var step = width / this.settings
      var left = step
      $slider.find('.slider-mark').each(function() {
        $(this).css('left', left)
        left += step
      })
    },
    show: function() {
      this.render()
      setTimeout(this.positionMarks.bind(this), 10)
      return this
    }
  })
})
