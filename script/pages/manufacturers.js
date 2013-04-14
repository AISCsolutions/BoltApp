define(['jquery', 'lib/classy', 'tables/manufacturers', 'appstate', 'controls/manufacturer', 'controls/shared_ui', 'lib/ext/jquery.ae.image.resize'], function($, classy, manufacturers, appstate, Mfg, ui) {
  "use strict";

  var li = function(el) {
    return $(el).parents('li')[0]
  }

  return classy({
    init: function(element) {
      this.element = $(element)
      return this
    },
    wire: function() {
      this.render()
      this.wireList()
      this.wireIndex()
    },
    $list: function() {
      return this.element.find('.manufacturers')
    },
    $index: function() {
      return this.element.find('.index')
    },
    wireList: function() {
      this.$list().on('click',  'li a[href="#bolt-id"]', function() {
        appstate.data.bolt.manufacturer = new Mfg().init(li(this)).read()
        appstate.save()
      })

      this.$list().on('click',  'li a[href="#mfg-zoom"]', function() {
        $('.zoom').click(function() {$('.ui-dialog').dialog('close')})
        var mfg = new Mfg().init(li(this)).read()
        new Mfg.init('.zoom').write(mfg)
        $('.zoom img').aeImageResize({width: 150})
      })
    },
    wireIndex: function() {
      var list = this
      this.$index().on('click', 'li', function(event) {
        event.stopPropagation()
        var index = list.indexPositions()
        var letter = $(this).html()[0]
        ui.scrollTop(index[letter])
      })
    },
    indexPositions: function() {
      var index = {}
      this.$index().find('li').each(function() {
        index[$(this).html()] = 0
      })

      this.$list().find('.name').each(function() {
        var name = $(this).html()
        var y = $(this).offsetParent().offset().top
        if (index[name[0]] === 0) {
          index[name[0]] = y
        }
      })

      var last = 0
      for (var l in index) {
        if (index[l] === 0) {
          index[l] = last
        } else {
          last = index[l]
        }
      }

      return index
    },
    render: function () {
      var $doc = $(document.createDocumentFragment())
      manufacturers.forEach(function(mfg) {
        Mfg.render().write(mfg).element.appendTo($doc)
      })
      var $list = this.$list().empty().append($doc.children())
      if ($list.hasClass('ui-listview')) {
        $list.listview('refresh')
      }
      return this
    }
  })
})
