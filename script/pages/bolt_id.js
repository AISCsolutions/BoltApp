define([
  'jquery',
  'can/control',
  'appstate',
  'rules',
  'controls/manufacturer',
  'controls/shared_ui'
], function(
  $,
  Control,
  appstate,
  Rules,
  Mfg,
  ui
) {
  "use strict";

  var setupType = function() {
    $('label[for="type-'+appstate.get('bolt.type')+'"]').click()
    $('.type input[type="radio"]').on('change', function() {
      appstate.set('bolt.type', $(this).val())
      markIllegal()
      ui.typeChanged(appstate.get('bolt'))
    })
  }

  var markIllegal = function() {
    var bolt = appstate.data.bolt
    var rules = Rules.bolt(bolt)
    var choice_illegal = !rules.perfect()

    $('.grade').
      toggleClass('choice-illegal', choice_illegal).
      toggleClass('no-choices', rules.anyGrade().length === 0)

    var type = rules.anyType()
    $('.type').
      toggleClass('choice-illegal', choice_illegal).
      toggleClass('no-choices', type.length === 0)
    $('.type label[for="type-1"]').toggleClass('illegal', !type.allowsType('1'))
    $('.type label[for="type-3"]').toggleClass('illegal', !type.allowsType('3'))

    $('.finish').
      toggleClass('choice-illegal', choice_illegal).
      toggleClass('no-choices', rules.anyFinish().length === 0)

    $('body').toggleClass('bolt-illegal', choice_illegal)
  }

  var updateFinish = function() {
    $('#finish-select .ui-btn-text').html(appstate.get('bolt.finish'))
  }

  var updateManufacturer = function() {
    new Mfg('#manufacturer-select').write(appstate.get('bolt.manufacturer'))
  }

  return Control({
    init: function() {
      setupType()
    },
    show: function() {
      ui.setup(appstate.data.bolt)
      markIllegal()
      updateFinish()
      updateManufacturer()
    }
  })
})
