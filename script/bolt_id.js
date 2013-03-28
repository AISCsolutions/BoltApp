define(['jquery', 'manufacturer', 'appstate', 'rules', 'shared_ui'], function($, Mfg, appstate, rules, ui) {
  "use strict"

  var markIllegal = function() {
    $('.grade').
      toggleClass('choice-illegal', !rules.isGradeLegal(appstate.data.bolt.grade)).
      toggleClass('no-choices', rules.typeFinish().length == 0)
    $('.type').
      toggleClass('choice-illegal', !rules.isTypeLegal(appstate.data.bolt.type)).
      toggleClass('no-choices', rules.gradeFinish().length == 0)
    $('.type label[for="type-1"]').toggleClass('illegal', !rules.isTypeLegal('1'))
    $('.type label[for="type-3"]').toggleClass('illegal', !rules.isTypeLegal('3'))
    $('.finish').
      toggleClass('choice-illegal', !rules.isFinishLegal(appstate.data.bolt.finish)).
      toggleClass('no-choices', rules.gradeType().length == 0)
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
      ui.typeChanged(appstate.data.bolt)
    })
    markIllegal()
    ui.typeChanged(appstate.data.bolt)
  }

  var setupFinish = function() {
    $('#finish-select .ui-btn-text').html(appstate.data.bolt.finish)
    ui.finishChanged(appstate.data.bolt)
  }

  var setupManufacturer = function() {
    var mfg = appstate.data.bolt.manufacturer
    Mfg.clone('#manufacturer-select').write(appstate.data.bolt.manufacturer)
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
