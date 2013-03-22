define(['jquery', 'appstate', 'rules', 'shared_ui'], function($, appstate, rules, ui) {
  "use strict"

  var markIllegal = function() {
    $('#grade-select').toggleClass('illegal', !rules.isGradeLegal(appstate.data.bolt.grade))
    $('label[for="type-1"]').toggleClass('illegal', !rules.isTypeLegal('1'))
    $('label[for="type-3"]').toggleClass('illegal', !rules.isTypeLegal('3'))
    $('#finish-select .ui-btn-text').toggleClass('illegal', !rules.isFinishLegal(appstate.data.bolt.finish))
  }

  var setupGrade = function() {
    ui.gradeChanged(appstate.data.bolt.grade)
  }

  var setupType = function() {
    $('label[for="type-'+appstate.data.bolt.type+'"]').click()
    $('.type input[type="radio"]').on('change', function() {
      appstate.data.bolt.type = $(this).val()
      appstate.save()
      markIllegal()
      ui.typeChanged(appstate.data.bolt.type)
    })
    markIllegal()
    ui.typeChanged(appstate.data.bolt.type)
  }

  var setupFinish = function() {
    $('#finish-select .ui-btn-text').html(appstate.data.bolt.finish)
  }

  var setupManufacturer = function() {
    var mfg = appstate.data.bolt.manufacturer
    var $mfg = $('#manufacturer-select')
    $mfg.find('.name').html(mfg.name)
    $mfg.find('.location').html(mfg.location)
    $mfg.find('.website').attr('href', mfg.website)
    $mfg.find('.bolt').attr('src', mfg.bolt)
  }

  var setupBoltId = function() {
    markIllegal()
    setupGrade()
    setupType()
    setupFinish()
    setupManufacturer()
  }

  return {
    wire: setupBoltId,
  }
})
