define([
  'jquery',
  'can/control',
  'appstate',
  'fraction',
  'tables/measurements',
  'controls/select',
  'controls/slider',
  'controls/diagram',
  'controls/diameter',
  'lib/ext/jquery.ae.image.resize'
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
      var width = $('.diagrams li').width()
      //var debug = [width, height, contentHeight, selectHeight, diameterHeight]
      //console.log(debug); $.mobile.activePage.append('<p>'+debug.toString()+'</p>')
      if (height < 100) { height = contentHeight }
      $('.diagrams img').aeImageResize({height: height, width: width})
      updateMeasurements()
      updateGrade()
    },
    deferShow: function() {
      this.slider.select(this.appstate.get('diagram'))
      this.diameter.show()
      this.setDiagramSize()
    },
    init: function(element, options) {
      this.body = options.body
      this.appstate = options.appstate

      this.slider = new Slider('.diagrams', {
        parts: {
          bolt: {index: 0, controls: [standardBoltDiagram, tcBoltDiagram]},
          nut: {index: 1, controls: [nutDiagram]},
          washer: {index: 2, controls: [washerDiagram]}
        }
      })
      this.select = new Select('.diagram-select')
      this.diameter = new Diameter('.diameter', {
        settings: (Object.keys(this.appstate.diameterInches).length - 1)
      })
    },
    ' pageshow': function() {
      this.select.select(this.appstate.get('diagram'))
      this.diameter.select(this.appstate.get('bolt.diameter'))
      setTimeout(this.deferShow.bind(this), 0)
    },
    '{window} resize': function() {
      console.log('resize')
      setTimeout(this.deferShow.bind(this), 0)
    },
    '.diagram-select selected': function(el, ev, diagram) {
      this.appstate.set('diagram', diagram)
    },
    '.diameter selected': function(el, ev, diameter) {
      this.appstate.set('bolt.diameter', diameter)
    },
    "{appstate} diagram": function(st, ev, value) { this.slider.select(value) },
    "{appstate} bolt.diameter": updateMeasurements,
    "{appstate} bolt.grade": updateGrade
  })
})
