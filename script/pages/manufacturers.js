define([
  'jquery',
  'can/control',
  'controls/index',
  'controls/manufacturer_list'
], function(
  $,
  Control,
  Index,
  List
) {
  "use strict";

  return Control({
    init: function(element) {
      this.list = new List(element.find('.manufacturers'))
      this.index = new Index(element.find('.index'), {list: this.list})
      return this
    }
  })
})
