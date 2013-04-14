define([
  'jquery',
  'lib/classy',
  'controls/index',
  'controls/manufacturer_list'
], function(
  $,
  classy,
  Index,
  List
) {
  "use strict";

  return classy({
    init: function(element) {
      this.element = $(element)
      this.list = new List(this.element.find('.manufacturers'))
      this.index = new Index(this.element.find('.index'), {list: this.list})
      return this
    },
    wire: function() {
      this.list.wire()
      this.index.wire()
    }
  })
})
