define(['jquery', 'lib/classy', 'appstate'], function($, classy, appstate) {
  "use strict";

  var scrollTo = function(x) {
    $('.diagrams ul').animate({'margin-left': x}, 400)
  }

  return classy({
    init: function(element, options) {
      this.element = $(element)
      this.standardBoltDiagram = options.standardBoltDiagram
      this.tcBoltDiagram = options.tcBoltDiagram
      this.nutDiagram = options.nutDiagram
      this.washerDiagram = options.washerDiagram
      this.wire()
      return this
    },
    show: function() {
      $('label[for="'+appstate.data.diagram+'-select"]').click()
    },
    height: function() {
      var $el = this.element
      var base = $el.height()
      var topMargin = parseInt($el.find('fieldset').css('margin-top'), 10)
      var bottomMargin = parseInt($el.find('fieldset').css('margin-bottom'), 10)
      var height = base + topMargin + bottomMargin + 2
      //console.log(height, base, topMargin, bottomMargin)
      return height
    },
    wire: function() {
      var o = this
      $('#bolt-select').on('change', function() {
        scrollTo(0)
        appstate.data.diagram = 'bolt'
        appstate.save()
        o.standardBoltDiagram.show()
        o.tcBoltDiagram.show()
        o.nutDiagram.hide()
        o.washerDiagram.hide()
      })
      $('#nut-select').on('change', function() {
        scrollTo(-$('.diagrams').width())
        appstate.data.diagram = 'nut'
        appstate.save()
        o.standardBoltDiagram.hide()
        o.tcBoltDiagram.hide()
        o.nutDiagram.show()
        o.washerDiagram.hide()
      })
      $('#washer-select').on('change', function() {
        scrollTo(-$('.diagrams').width()*2)
        appstate.data.diagram = 'washer'
        appstate.save()
        o.standardBoltDiagram.hide()
        o.tcBoltDiagram.hide()
        o.nutDiagram.hide()
        o.washerDiagram.show()
      })
    }
  })
})
