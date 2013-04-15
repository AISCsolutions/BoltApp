define([
  'jquery',
  'can/control',
  'tables/manufacturers',
  'appstate',
  'controls/manufacturer',
  'lib/ext/jquery.ae.image.resize'],
function(
  $,
  Control,
  manufacturers,
  appstate,
  Mfg
) {
  "use strict";

  var li = function(el) {
    return $(el).parents('li')[0]
  }

  return Control({
    init: function(element) {
      this.render()
      return this
    },
    'li a[href="#bolt-id"] click': function(a) {
      appstate.set('bolt.manufacturer', new Mfg(li(a)).read())
    },
    'li a[href="#mfg-zoom"] click': function(a) {
      $('.zoom').click(function() {$('.ui-dialog').dialog('close')})
      var mfg = new Mfg(li(a)).read()
      new Mfg('.zoom').write(mfg)
      $('.zoom img').aeImageResize({width: 150})
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
