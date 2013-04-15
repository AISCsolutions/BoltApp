define([
  'jquery',
  'can/control',
  'appstate',
  'rules',
  'controls/type',
  'controls/manufacturer'
], function(
  $,
  Control,
  appstate,
  Rules,
  Type,
  Mfg
) {
  "use strict";

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

  appstate.bind('bolt.grade', markIllegal)
  appstate.bind('bolt.type', markIllegal)
  appstate.bind('bolt.finish', markIllegal)

  return Control({
    init: function() {
      this.type = new Type('.type', {appstate: appstate})
    },
    show: function() {
      updateFinish()
      updateManufacturer()
    }
  })
})
