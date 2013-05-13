define([
  'jquery',
  'can/control',
  'tables/manufacturers',
  'controls/manufacturer',
  'controls/zoom'
], function(
  $,
  Control,
  manufacturers,
  Mfg,
  Zoom
) {
  "use strict";

  var li = function(el) {
    return $(el).parents('li')[0]
  }

  return Control({
    init: function() {
      this.render()
      this.zoom = new Zoom('#mfg-zoom')
      return this
    },
    'li a[href="#bolt-id"] click': function(a) {
      a.trigger('selected', new Mfg(li(a)).read())
    },
    'li a[href="#mfg-zoom"] click': function(a) {
      var mfg = new Mfg(li(a)).read()
      new Mfg('#mfg-zoom .zoom').write(mfg)
      $('#mfg-zoom').trigger('open')
    },
    select: function (mfg) {
      var previous = this.element.find('.selected')
      previous.removeClass('selected')
      this.element.find('li').each(function(i, el) {
        if ($(el).find('.name').html() == mfg.name) {
          $(el).addClass('selected')
        }
      })
      if (this.element.hasClass('ui-listview')) {
        this.element.listview('refresh')
      }
    },
    render: function () {
      var $doc = $(document.createDocumentFragment())
      manufacturers.forEach(function(mfg) {
        Mfg.render().write(mfg).element.appendTo($doc)
      })
      var $list = this.element.empty().append($doc.children())
      if ($list.hasClass('ui-listview')) {
        $list.listview('refresh')
      }
      return this
    }
  })
})
