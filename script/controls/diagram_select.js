define(['jquery', 'lib/classy', 'appstate'], function($, classy, appstate) {
  "use strict";

  var scrollTo = function(x) {
    $('.diagrams ul').animate({'margin-left': x}, 400)
  }

  return classy({
    show: function() {
      $('label[for="'+appstate.data.diagram+'-select"]').click()
    },
    height: function() {
      var $el = $('.diagram-select')
      var base = $el.height()
      var topMargin = parseInt($el.find('fieldset').css('margin-top'), 10)
      var bottomMargin = parseInt($el.find('fieldset').css('margin-bottom'), 10)
      var height = base + topMargin + bottomMargin + 2
      //console.log(height, base, topMargin, bottomMargin)
      return height
    },
    wire: function(standardBoltDiagram, tcBoltDiagram, nutDiagram, washerDiagram) {
      $('#bolt-select').on('change', function() {
        scrollTo(0)
        appstate.data.diagram = 'bolt'
        appstate.save()
        standardBoltDiagram.show()
        tcBoltDiagram.show()
        nutDiagram.hide()
        washerDiagram.hide()
      })
      $('#nut-select').on('change', function() {
        scrollTo(-$('.diagrams').width())
        appstate.data.diagram = 'nut'
        appstate.save()
        standardBoltDiagram.hide()
        tcBoltDiagram.hide()
        nutDiagram.show()
        washerDiagram.hide()
      })
      $('#washer-select').on('change', function() {
        scrollTo(-$('.diagrams').width()*2)
        appstate.data.diagram = 'washer'
        appstate.save()
        standardBoltDiagram.hide()
        tcBoltDiagram.hide()
        nutDiagram.hide()
        washerDiagram.show()
      })
    }
  })
})
