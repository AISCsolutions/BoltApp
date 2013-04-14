define(['jquery', 'lib/classy', 'appstate'], function($, classy, appstate) {
  "use strict";

  return classy({
    $el: function() {
      return $('.diameter')
    },
    height: function() {
      var $el = this.$el()
      var base = $el.height()
      var topMargin = parseInt($el.css('margin-top'), 10)
      var bottomMargin = parseInt($el.css('margin-bottom'), 10)
      var sliderMargin = 8
      var height = base + topMargin + bottomMargin + sliderMargin + 2
      //console.log(height, base, topMargin, bottomMargin, sliderMargin)
      return height
    },
    wire: function(callback) {
      this.$el().find('input').val(appstate.data.bolt.diameter).change()
      this.$el().on('change', 'input', function() {
        var value = $(this).val()
        if (appstate.data.bolt.diameter != value) {
          appstate.data.bolt.diameter = value
          appstate.save()
          callback()
        }
      })
    },
    render: function() {
      var $el = this.$el()
      var $slider = $el.find('.ui-slider-track')
      if ($slider.find('.slider-mark').length > 0) {return}
      var points = appstate.diameterInches
      var settings = (Object.keys(points).length - 1)
      for (var i = 1; i < settings; i++) {
        $('<div class="slider-mark">').appendTo($slider)
      }
    },
    positionMarks: function() {
      var $el = this.$el()
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
