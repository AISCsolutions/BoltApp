define([
  'jquery',
  'appstate',
  'measurements',
  'diagram_select',
  'diagram',
  'diameter'
], function(
  $,
  appstate,
  measurements,
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
    var fraction = diameterInches[appstate.data.bolt.diameter.toString()]
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
  var diameterInches = {
    '0.5': '1/2',
    '0.625': '5/8',
    '0.75': '3/4',
    '0.875': '7/8',
    '1': '1',
    '1.125': '1 1/8',
    '1.25': '1 1/4',
    '1.375': '1 3/8',
    '1.5': '1 1/2',
  }

  var diameterDisplay = function(fraction) {
    $('#diameter-inches span').html(fraction)
  }

  /* Dimensions */
  var setupDimensions = function() {
    updateMeasurements()
    DiagramSelect.wire(boltDiagram, nutDiagram, washerDiagram)
    Diameter.wire(updateMeasurements)
  }

  return {
    boltDiagram: boltDiagram,
    nutDiagram: nutDiagram,
    washerDiagram: washerDiagram,
    wire: setupDimensions
  }
})
