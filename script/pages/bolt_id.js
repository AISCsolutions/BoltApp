define(['jquery', 'appstate', 'rules', 'controls/manufacturer', 'controls/shared_ui'], function($, appstate, Rules, Mfg, ui) {
  "use strict";

  var markIllegal = function() {
    var bolt = appstate.data.bolt
    var rules = Rules.bolt(bolt)
    var choice_illegal = !rules.perfect()

    $('.grade').
      toggleClass('choice-illegal', choice_illegal).
      toggleClass('no-choices', rules.anyGrade().length == 0)

    var type = rules.anyType()
    $('.type').
      toggleClass('choice-illegal', choice_illegal).
      toggleClass('no-choices', type.length == 0)
    $('.type label[for="type-1"]').toggleClass('illegal', !type.allowsType('1'))
    $('.type label[for="type-3"]').toggleClass('illegal', !type.allowsType('3'))

    $('.finish').
      toggleClass('choice-illegal', choice_illegal).
      toggleClass('no-choices', rules.anyFinish().length == 0)

    $('body').toggleClass('bolt-illegal', choice_illegal)
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
