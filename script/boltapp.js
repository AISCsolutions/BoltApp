define([
  'jquery',
  'appstate',
  'rules',
  'bolt_id',
  'dimensions',
  'nuts_and_washers',
  'grade',
  'finish'
], function(
  $,
  appstate,
  rules,
  BoltId,
  Dimensions,
  NutsAndWashers,
  Grade,
  Finish
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
    $('#manufacturer li a[href="#bolt-id"]').on('click', function() {
      appstate.data.bolt.manufacturer = {
        name: $(this).find('.name').html(),
        location: $(this).find('.location').html(),
        bolt: $(this).find('.bolt').attr('src'),
        website: $(this).parent().parent().parent().find('.website').attr('href')
      }
      appstate.save()
    })
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
