define(['jquery', 'manufacturer', 'appstate', 'rules', 'shared_ui'], function($, Mfg, appstate, Rules, ui) {
  "use strict"

  var markIllegal = function() {
    var rules = Rules.bolt(appstate.data.bolt)

    var grade = rules.anyGrade()
    $('.grade').
      toggleClass('choice-illegal', !grade.allowsGrade(appstate.data.bolt.grade)).
      toggleClass('no-choices', grade.length == 0)

    var type = rules.anyType()
    $('.type').
      toggleClass('choice-illegal', !type.allowsType(appstate.data.bolt.type)).
      toggleClass('no-choices', type.length == 0)
    $('.type label[for="type-1"]').toggleClass('illegal', !type.allowsType('1'))
    $('.type label[for="type-3"]').toggleClass('illegal', !type.allowsType('3'))

    var finish = rules.anyFinish()
    $('.finish').
      toggleClass('choice-illegal', !finish.allowsFinish(appstate.data.bolt.finish)).
      toggleClass('no-choices', length == 0)

    $('body').toggleClass('bolt-illegal', !rules.perfect())
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
