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
  /* Bolt Id */
  var setupBoltId = function() {
    BoltId.wire()
  }

  /* Dimensions */
  var setupDimensions = function() {
    Dimensions.wire()
  }

  /* Nuts and Washers */
  rules.load(function(data) {
    finish = Finish.clone(data).render()
    updateGTF()
  })

  var updateGTF = function() {
    var nw = rules.gradeTypeFinish()
    if (nw) {
      NutsAndWashers.update(nw)

      finish.update()
    }
  }

  var setupNutsAndWashers = function() {
    updateGTF()
  }

  /* Grade Select */
  var wireGrade = function() {
    Grade.wire()
    Grade.update()
  }

  /* Finish Select */
  var finish = Finish

  var wireFinish = function() {
    finish.wire()
    finish.update()
  }

  /* Manufacturer Select */
  var wireManufacturer = function() {
    Manufacturer.wire()
  }

  return {
    boltDiagram: Dimensions.boltDiagram,
    nutDiagram: Dimensions.nutDiagram,
    washerDiagram: Dimensions.washerDiagram,
    ready: function() {
      setupBoltId()
      $('#bolt-id').on('pagebeforeshow', setupBoltId)
      $('#dimensions').on('pageshow', setupDimensions)
      $('#nuts-and-washers').on('pagebeforeshow', setupNutsAndWashers)
      $('#nuts-and-washers').on('pageshow', NutsAndWashers.setContentHeight)
      $(window).on('navigate', NutsAndWashers.setContentHeight)
      $('#grade').on('pagebeforeshow', wireGrade)
      $('#finish').on('pagebeforeshow', wireFinish)
      $('#manufacturer').on('pagebeforeshow', wireManufacturer)
    }
  }
})
