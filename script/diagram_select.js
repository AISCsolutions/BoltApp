define(['jquery', 'appstate'], function($, appstate) {
  "use strict"

  var scrollTo = function(x) {
    $('.diagrams ul').animate({'margin-left': x}, 400)
  }

  return {
    show: function() {
      $('label[for="'+appstate.data.diagram+'-select"]').click()
    },
    height: function() {
      var $el = $('.diagram-select')
      var height = $el.height()
      var topMargin = parseInt($el.find('fieldset').css('margin-top'), 10)
      var bottomMargin = parseInt($el.find('fieldset').css('margin-bottom'), 10)
      return height + topMargin + bottomMargin + 2
    },
    wire: function(boltDiagram, nutDiagram, washerDiagram) {
      $('#bolt-select').on('change', function() {
        scrollTo(0)
        appstate.data.diagram = 'bolt'
        appstate.save()
        boltDiagram.show()
        nutDiagram.hide()
        washerDiagram.hide()
      })
      $('#nut-select').on('change', function() {
        scrollTo(-$('.diagrams').width())
        appstate.data.diagram = 'nut'
        appstate.save()
        boltDiagram.hide()
        nutDiagram.show()
        washerDiagram.hide()
      })
      $('#washer-select').on('change', function() {
        scrollTo(-$('.diagrams').width()*2)
        appstate.data.diagram = 'washer'
        appstate.save()
        boltDiagram.hide()
        nutDiagram.hide()
        washerDiagram.show()
      })
    }
  }
})
