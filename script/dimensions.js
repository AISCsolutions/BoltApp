define([
  'jquery',
  'appstate',
  'measurements',
  'diagram'
], function(
  $,
  appstate,
  ments,
  Diagram
) {
  /* Dimensions - diagram select */
  var wireDiagramSelect = function() {
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

  /* Dimensions - diagram */
  var boltDiagram = Diagram.clone('#bolt-diagram')
  var nutDiagram = Diagram.clone('#nut-diagram')
  var washerDiagram = Diagram.clone('#washer-diagram')

  var measurements = []

  var receiveMeasurements = function(data) {
    measurements = data
    updateMeasurements()
  }

  ments.load(receiveMeasurements)

  var currentMeasures = function() {
    var fraction = diameterInches[appstate.data.bolt.diameter.toString()]
    for (var i in measurements) {
      if (measurements[i].Bolt.Diameter == fraction) {
        return measurements[i]
      }
    }
    throw "Measurement not found for "+appstate.data.bolt.diameter
  }

  var updateMeasurements = function() {
    if (measurements.length < 1) { return }
    measures = currentMeasures()
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
    '1.25': '1 2/4',
    '1.375': '1 3/8',
    '1.5': '1 1/2',
  }

  var diameterDisplay = function() {
    $('#diameter-inches span').html(diameterInches[appstate.data.bolt.diameter.toString()])
  }

  var wireDiameter = function() {
    $('#diameter').on('change', function() {
      var value = $(this).val()
      if (appstate.data.bolt.diameter != value) {
        appstate.data.bolt.diameter = value
        appstate.save()
        diameterDisplay()
        updateMeasurements()
      }
    })
    $('#diameter').val(appstate.data.bolt.diameter).change()
    diameterDisplay()
  }

  /* Dimensions */
  var setupDimensions = function() {
    updateMeasurements()
    wireDiagramSelect()
    wireDiameter()
  }

  return {
    boltDiagram: boltDiagram,
    nutDiagram: nutDiagram,
    washerDiagram: washerDiagram,
    wire: setupDimensions
  }
})
