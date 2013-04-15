define(['jquery', 'can/control', 'appstate'], function($, Control, appstate) {
  "use strict";

  var scrollTo = function(x) {
    $('.diagrams ul').animate({'margin-left': x}, 400)
  }

  return Control({
    init: function(element, options) {
      this.standardBoltDiagram = options.standardBoltDiagram
      this.tcBoltDiagram = options.tcBoltDiagram
      this.nutDiagram = options.nutDiagram
      this.washerDiagram = options.washerDiagram
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
    '#bolt-select change': function() {
      scrollTo(0)
      appstate.set('diagram', 'bolt')
      this.standardBoltDiagram.show()
      this.tcBoltDiagram.show()
      this.nutDiagram.hide()
      this.washerDiagram.hide()
    },
    '#nut-select change': function() {
      scrollTo(-$('.diagrams').width())
      appstate.set('diagram', 'nut')
      this.standardBoltDiagram.hide()
      this.tcBoltDiagram.hide()
      this.nutDiagram.show()
      this.washerDiagram.hide()
    },
    '#washer-select change': function() {
      scrollTo(-$('.diagrams').width()*2)
      appstate.set('diagram', 'washer')
      this.standardBoltDiagram.hide()
      this.tcBoltDiagram.hide()
      this.nutDiagram.hide()
      this.washerDiagram.show()
    }
  })
})
