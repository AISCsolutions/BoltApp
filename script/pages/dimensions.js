define([
  'jquery',
  'can/control',
  'appstate',
  'fraction',
  'tables/measurements',
  'controls/shared_ui',
  'controls/select',
  'controls/diagram_slider',
  'controls/diagram',
  'controls/diameter'
], function(
  $,
  Control,
  appstate,
  Fraction,
  measurements,
  ui,
  Select,
  DiagramSlider,
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

  appstate.bind('bolt.diameter', updateMeasurements)

  var updateGrade = function() {
    standardBoltDiagram.update({Grade: appstate.get('bolt.grade')})
    tcBoltDiagram.update({Grade: appstate.get('bolt.grade')})
  }

  appstate.bind('bolt.grade', updateGrade)

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
      var contentHeight = ui.contentHeight()
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
    init: function() {
      this.slider = new DiagramSlider('.diagrams', {
        appstate: appstate,
        parts: {
          bolt: {index: 0, controls: [standardBoltDiagram, tcBoltDiagram]},
          nut: {index: 1, controls: [nutDiagram]},
          washer: {index: 2, controls: [washerDiagram]}
        }
      })
      this.select = new Select('.diagram-select', this)
      this.diameter = new Diameter('.diameter')

      $('.diagram-select').bind('selected', function(ev, diagram) {
        appstate.set('diagram', diagram)
      })
    },
    show: function() {
      this.select.select(appstate.get('bolt.diagram'))
      this.slider.show()
      this.diameter.show()
      setTimeout(this.setDiagramSize.bind(this), 0)
    }
  })
})
