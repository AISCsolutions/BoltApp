define(['jquery', 'can/control'], function($, Control) {
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

  return Control({
    init: function(element, options) {
      this.list = options.list
      return this
    },
    'li click': function(li, event) {
      event.stopPropagation()
      var index = indexPositions(this.element, this.list.element)
      var letter = $(li).html()[0]
      $(window).scrollTop(index[letter])
    }
  })
})
