define(['jquery', 'appstate'], function($, appstate) {
  var setupGrade = function() {
    $('.current-grade .ui-btn-text').html(appstate.data.bolt.grade)
    $('.ui-btn-text .current-grade').html(appstate.data.bolt.grade)
  }

  var setGlobalClasses = function() {
    $body = $('body')
    if (appstate.data.bolt.type == '3') {
      $body.addClass('type-3')
    } else {
      $body.removeClass('type-3')
    }
  }

  var setupType = function() {
    $('label[for="type-'+appstate.data.bolt.type+'"]').click()
    $('.type input[type="radio"]').on('change', function() {
      appstate.data.bolt.type = $(this).val()
      appstate.save()
      setGlobalClasses()
    })
  }

  var setupFinish = function() {
    $('#finish-select .ui-btn-text').html(appstate.data.bolt.finish)
  }

  var setupManufacturer = function() {
    mfg = appstate.data.bolt.manufacturer
    $mfg = $('#manufacturer-select')
    $mfg.find('.name').html(mfg.name)
    $mfg.find('.location').html(mfg.location)
    $mfg.find('.website').attr('href', mfg.website)
    $mfg.find('.bolt').attr('src', mfg.bolt)
  }

  var setupBoltId = function() {
    setupGrade()
    setupType()
    setupFinish()
    setupManufacturer()
  }

  return {
    wire: setupBoltId,
  }
})
