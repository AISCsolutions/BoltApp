define([
  'jquery',
  'lib/classy',
  'appstate',
  'fraction',
  'tables/measurements',
  'controls/shared_ui',
  'controls/diagram_select',
  'controls/diagram',
  'controls/diameter'
], function(
  $,
  classy,
  appstate,
  Fraction,
  measurements,
  ui,
  DiagramSelect,
  Diagram,
  Diameter
) {
  "use strict";

  /* Dimensions - diagram */
  var standardBoltDiagram = new Diagram().init('#standard-bolt-diagram')
  var tcBoltDiagram = new Diagram().init('#tc-bolt-diagram')
  var nutDiagram = new Diagram().init('#nut-diagram')
  var washerDiagram = new Diagram().init('#washer-diagram')

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
    standardBoltDiagram.update({Grade: appstate.data.bolt.grade})
    standardBoltDiagram.update(measures['Bolt'])
    tcBoltDiagram.update({Grade: appstate.data.bolt.grade})
    tcBoltDiagram.update(measures['Bolt'])
    nutDiagram.update(measures['Nut'])
    washerDiagram.update(measures['Circular Washer'])
    washerDiagram.update(measures['Square Washer'])
  }

  /* Dimensions - diameter */
  var diameterDisplay = function(fraction) {
    $('.diameter-inches span').html(Fraction.clone(fraction).toString())
  }

  var select = new DiagramSelect()
  var diameter = new Diameter()

  return classy({
    standardBoltDiagram: standardBoltDiagram,
    tcBoltDiagram: tcBoltDiagram,
    nutDiagram: nutDiagram,
    washerDiagram: washerDiagram,
    setDiagramSize: function() {
      var contentHeight = ui.contentHeight()
      var selectHeight = select.height()
      var diameterHeight = diameter().height()
      var height = contentHeight - selectHeight - diameterHeight
      var debug = [height, contentHeight, selectHeight, diameterHeight]
      if (height < 150) { height = 150 }
      $('.diagrams img').height(height)
      //console.log(debug); $.mobile.activePage.append('<p>'+debug.toString()+'</p>')
      updateMeasurements()
    },
    show: function() {
      select.show()
      diameter.show()
      setTimeout(this.setDiagramSize.bind(this), 0)
    },
    wire: function() {
      select.wire(standardBoltDiagram, tcBoltDiagram, nutDiagram, washerDiagram)
      diameter.wire(updateMeasurements)
    }
  })
})
