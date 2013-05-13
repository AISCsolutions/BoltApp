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
    new Mfg('.manufacturer-select').write(appstate.get('bolt.manufacturer'))
  }

  return Control({
    init: function(element, options) {
      this.type = new Type('.type')
      this.appstate = options.appstate
      markIllegal()
    },
    ' pagebeforeshow': function() {
      this.type.select(this.appstate.get('bolt.type'))
      updateFinish()
      updateManufacturer()
    },
    '.type selected': function(el, ev, type) {
      this.appstate.set('bolt.type', type)
    },
    'a[href="#mfg-zoom"] click': function(a) {
      new Mfg('#mfg-zoom .zoom').write(this.appstate.get('bolt.manufacturer'))
      $('#mfg-zoom').trigger('open')
    },
    "{appstate} bolt.grade": markIllegal,
    "{appstate} bolt.type": markIllegal,
    "{appstate} bolt.finish": markIllegal
  })
})
