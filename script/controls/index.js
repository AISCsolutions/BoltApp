define(['jquery', 'lib/classy', 'controls/shared_ui'], function($, classy, ui) {
  "use strict";

  var indexPositions = function(element, list) {
    var index = {}
    element.find('li').each(function() {
      index[$(this).html()] = 0
    })

    list.find('.name').each(function() {
      var name = $(this).html()
      var y = $(this).offsetParent().offset().top
      if (index[name[0]] === 0) {
        index[name[0]] = y
      }
    })

    var last = 0
    for (var l in index) {
      if (index[l] === 0) {
        index[l] = last
      } else {
        last = index[l]
      }
    }

    return index
  }

  return classy({
    init: function(element, options) {
      this.element = $(element)
      this.list = options.list
      this.wire()
      return this
    },
    wire: function() {
      var element = this.element
      var list = this.list.element
      this.element.on('click', 'li', function(event) {
        event.stopPropagation()
        var index = indexPositions(element, list)
        var letter = $(this).html()[0]
        ui.scrollTop(index[letter])
      })
    },
  })
})
