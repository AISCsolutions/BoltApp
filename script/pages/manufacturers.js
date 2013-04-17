define([
  'jquery',
  'can/control',
  'appstate',
  'controls/index',
  'controls/manufacturer_list'
], function(
  $,
  Control,
  appstate,
  Index,
  List
) {
  "use strict";

  return Control({
    init: function(element) {
      this.list = new List(element.find('.manufacturers'))
      this.index = new Index(element.find('.index'), {list: this.list})
      return this
    },
    '.manufacturers selected': function(el, ev, mfg) {
      appstate.set('bolt.manufacturer', mfg)
    }
  })
})
