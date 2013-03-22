define([
  'jquery',
  'appstate',
  'rules',
  'dimensions',
  'nuts_and_washers',
  'grade',
  'finish'
], function(
  $,
  appstate,
  rules,
  Dimensions,
  NutsAndWashers,
  Grade,
  Finish
) {
  /* Global */

  var state = appstate.load()

  var setGlobalClasses = function() {
    $body = $('body')
    if (state.bolt.type == '3') {
      $body.addClass('type-3')
    } else {
      $body.removeClass('type-3')
    }
  }

  /* Bolt ID */
  var setupBoltId = function() {
    $('.current-grade .ui-btn-text').html(state.bolt.grade)
    $('.ui-btn-text .current-grade').html(state.bolt.grade)
    $('#finish-select .ui-btn-text').html(state.bolt.finish)
    setupBoltIdManufacturer()
    setupBoltIdType()
  }

  var setupBoltIdManufacturer = function() {
    mfg = state.bolt.manufacturer
    $mfg = $('#manufacturer-select')
    $mfg.find('.name').html(mfg.name)
    $mfg.find('.location').html(mfg.location)
    $mfg.find('.website').attr('href', mfg.website)
    $mfg.find('.bolt').attr('src', mfg.bolt)
  }

  var setupBoltIdType = function() {
    $('label[for="type-'+state.bolt.type+'"]').click()
    $('.type input[type="radio"]').on('change', function() {
      state.bolt.type = $(this).val()
      appstate.save()
      setGlobalClasses()
    })
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
      state.bolt.manufacturer = {
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
      setGlobalClasses()
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
