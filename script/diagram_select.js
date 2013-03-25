define(['jquery', 'appstate'], function($, appstate) {
  "use strict"

  var speed = 400

  var scrollTo = function(x) {
    $('.diagrams ul').animate({'margin-left': x}, speed)
  }

  return {
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

      $('label[for="'+appstate.data.diagram+'-select"]').click()
    }
  }
})
