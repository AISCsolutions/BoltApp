define([
  'jquery',
  'lib/classy',
  'tables/manufacturers',
  'appstate',
  'controls/manufacturer',
  'lib/ext/jquery.ae.image.resize'],
function($,
  classy,
  manufacturers,
  appstate,
  Mfg
) {
  "use strict";

  var li = function(el) {
    return $(el).parents('li')[0]
  }

  return classy({
    init: function(element) {
      this.element = $(element)
      this.render()
      this.wire()
      return this
    },
    wire: function() {
      this.element.on('click',  'li a[href="#bolt-id"]', function() {
        appstate.data.bolt.manufacturer = new Mfg(li(this)).read()
        appstate.save()
      })

      this.element.on('click',  'li a[href="#mfg-zoom"]', function() {
        $('.zoom').click(function() {$('.ui-dialog').dialog('close')})
        var mfg = new Mfg(li(this)).read()
        new Mfg('.zoom').write(mfg)
        $('.zoom img').aeImageResize({width: 150})
      })
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
