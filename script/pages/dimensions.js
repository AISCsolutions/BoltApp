define([
  'jquery',
  'can/control',
  'appstate',
  'fraction',
  'tables/measurements',
  'controls/select',
  'controls/slider',
  'controls/diagram',
  'controls/diameter'
], function(
  $,
  Control,
  appstate,
  Fraction,
  measurements,
  Select,
  Slider,
  Diagram,
  Diameter
) {
  "use strict";

  /* Dimensions - diagram */
  var standardBoltDiagram = new Diagram('#standard-bolt-diagram')
  var tcBoltDiagram = new Diagram('#tc-bolt-diagram')
  var nutDiagram = new Diagram('#nut-diagram')
  var washerDiagram = new Diagram('#washer-diagram')

  var currentMeasures = function() {
    var fraction = appstate.diameterFraction()
    for (var i in measurements) {
      if (measurements[i].Bolt.Diameter == fraction) {
        return measurements[i]
      }
    }
    console.error("Measurement not found for "+appstate.get('bolt.diameter'))
  }

  var updateMeasurements = function() {
    if (measurements.length < 1) { return }
    var measures = currentMeasures()
    diameterDisplay(measures.Bolt.Diameter)
    standardBoltDiagram.update(measures['Bolt'])
    tcBoltDiagram.update(measures['Bolt'])
    nutDiagram.update(measures['Nut'])
    washerDiagram.update(measures['Circular Washer'])
    washerDiagram.update(measures['Square Washer'])
  }

  var updateGrade = function() {
    standardBoltDiagram.update({Grade: appstate.get('bolt.grade')})
    tcBoltDiagram.update({Grade: appstate.get('bolt.grade')})
  }

  /* Dimensions - diameter */
  var diameterDisplay = function(fraction) {
    $('.diameter-inches span').html(Fraction.clone(fraction).toString())
  }

  return Control({
    standardBoltDiagram: standardBoltDiagram,
    tcBoltDiagram: tcBoltDiagram,
    nutDiagram: nutDiagram,
    washerDiagram: washerDiagram,
    setDiagramSize: function() {
      var contentHeight = this.body.contentHeight()
      var selectHeight = this.select.height()
      var diameterHeight = this.diameter.height()
      var height = contentHeight - selectHeight - diameterHeight
      var debug = [height, contentHeight, selectHeight, diameterHeight]
      if (height < 150) { height = 150 }
      $('.diagrams img').height(height)
      //console.log(debug); $.mobile.activePage.append('<p>'+debug.toString()+'</p>')
      updateMeasurements()
      updateGrade()
    },
    init: function(element, options) {
      this.body = options.body

      var slider = this.slider = new Slider('.diagrams', {
        parts: {
          bolt: {index: 0, controls: [standardBoltDiagram, tcBoltDiagram]},
          nut: {index: 1, controls: [nutDiagram]},
          washer: {index: 2, controls: [washerDiagram]}
        }
      })
      this.select = new Select('.diagram-select')
      this.diameter = new Diameter('.diameter', {
        settings: (Object.keys(appstate.diameterInches).length - 1)
      })

      appstate.bind('diagram', function(ev, value) { slider.select(value) })
      appstate.bind('bolt.diameter', updateMeasurements)
      appstate.bind('bolt.grade', updateGrade)
    },
    show: function() {
      this.select.select(appstate.get('diagram'))
      this.slider.select(appstate.get('diagram'))
      this.diameter.show().select(appstate.get('bolt.diameter'))
      setTimeout(this.setDiagramSize.bind(this), 0)
    },
    '.diagram-select selected': function(el, ev, diagram) {
      appstate.set('diagram', diagram)
    },
    '.diameter selected': function(el, ev, diameter) {
      appstate.set('bolt.diameter', diameter)
    }
  })
})
