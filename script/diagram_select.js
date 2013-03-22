define(['jquery', 'appstate'], function($, appstate) {
  "use strict"

  return {
    wire: function(boltDiagram, nutDiagram, washerDiagram) {
      $('#bolt-select').on('change', function() {
        appstate.data.diagram = 'bolt'
        appstate.save()
        boltDiagram.show()
        nutDiagram.hide()
        washerDiagram.hide()
      })
      $('#nut-select').on('change', function() {
        appstate.data.diagram = 'nut'
        appstate.save()
        boltDiagram.hide()
        nutDiagram.show()
        washerDiagram.hide()
      })
      $('#washer-select').on('change', function() {
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
