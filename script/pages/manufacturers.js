define([
  'jquery',
  'can/control',
  'appstate',
  'controls/manufacturer_list'
], function(
  $,
  Control,
  appstate,
  List
) {
  "use strict";

  return Control({
    init: function(element) {
      this.list = new List(element.find('.manufacturers'))
      return this
    },
    ' pagebeforeshow': function() {
      this.list.select(appstate.get('bolt.manufacturer'))
    },
    '.manufacturers selected': function(el, ev, mfg) {
      appstate.set('bolt.manufacturer', mfg)
    }
  })
})
