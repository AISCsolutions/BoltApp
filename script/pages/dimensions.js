define([
  'jquery',
  'appstate',
  'fraction',
  'tables/measurements',
  'controls/shared_ui',
  'controls/diagram_select',
  'controls/diagram',
  'controls/diameter'
], function(
  $,
  appstate,
  Fraction,
  measurements,
  ui,
  DiagramSelect,
  Diagram,
  Diameter
) {
  "use strict"

  /* Dimensions - diagram */
  var boltDiagram = Diagram.clone('#bolt-diagram')
  var nutDiagram = Diagram.clone('#nut-diagram')
  var washerDiagram = Diagram.clone('#washer-diagram')

  var currentMeasures = function() {
    var fraction = appstate.diameterFraction()
    for (var i in measurements) {
      if (measurements[i].Bolt.Diameter == fraction) {
        return measurements[i]
      }
    }
    console.error("Measurement not found for "+appstate.data.bolt.diameter)
  }

  var updateMeasurements = function() {
    if (measurements.length < 1) { return }
    var measures = currentMeasures()
    diameterDisplay(measures.Bolt.Diameter)
    boltDiagram.update({Grade: appstate.data.bolt.grade})
    boltDiagram.update(measures['Bolt'])
    nutDiagram.update(measures['Nut'])
    washerDiagram.update(measures['Circular Washer'])
    washerDiagram.update(measures['Square Washer'])
  }

  /* Dimensions - diameter */
  var diameterDisplay = function(fraction) {
    $('#diameter-inches span').html(Fraction.clone(fraction).toString())
  }

  return {
    boltDiagram: boltDiagram,
    nutDiagram: nutDiagram,
    washerDiagram: washerDiagram,
    setDiagramSize: function() {
      var contentHeight = ui.contentHeight()
      var selectHeight = DiagramSelect.height()
      var diameterHeight = Diameter.height()
      var height = contentHeight - selectHeight - diameterHeight
      //console.log(height, contentHeight, selectHeight, diameterHeight)
      $('.diagrams img').height(height)
    },
    show: function() {
      DiagramSelect.show()
      this.setDiagramSize()
      Diameter.show()
    },
    wire: function() {
      updateMeasurements()
      DiagramSelect.wire(boltDiagram, nutDiagram, washerDiagram)
      Diameter.wire(updateMeasurements)
    }
  }
})
