define([
  'jquery',
  'appstate',
  'rules',
  'bolt_id',
  'dimensions',
  'nuts_and_washers',
  'grade',
  'finish',
  'manufacturer'
], function(
  $,
  appstate,
  rules,
  BoltId,
  Dimensions,
  NutsAndWashers,
  Grade,
  Finish,
  Manufacturer
) {
  "use strict"

  appstate.load()

  /* Bolt Id */
  var setupBoltId = function() {
    BoltId.wire()
  }

  /* Dimensions */
  var setupDimensions = function() {
    Dimensions.wire()
  }

  /* Nuts and Washers */
  var setupNutsAndWashers = function(event) {
    NutsAndWashers.wire(event, rules)
  }

  /* Grade Select */
  var wireGrade = function() {
    Grade.wire()
  }

  /* Finish Select */
  var finish = Finish.clone(rules)

  var wireFinish = function() {
    finish.wire()
  }

  /* Manufacturer Select */
  var wireManufacturer = function() {
    Manufacturer.wire()
  }

  return {
    dimensions: Dimensions,
    ready: function() {
      setupBoltId()
      setupDimensions()
      $('#bolt-id').on('pagebeforeshow', setupBoltId)
      $('#dimensions').on('pageshow', setupDimensions)
      $('#nuts-and-washers').on('pagebeforeshow', setupNutsAndWashers)
      $('#nuts-and-washers').on('pageshow', setupNutsAndWashers)
      $(window).on('navigate', NutsAndWashers.setContentHeight)
      $('#grade').on('pagebeforeshow', wireGrade)
      $('#finish').on('pageshow', wireFinish)
      $('#manufacturer').on('pagebeforeshow', wireManufacturer)
    }
  }
})
