define(['jquery', 'lib/classy', 'tables/manufacturers', 'appstate', 'controls/manufacturer', 'controls/shared_ui', 'lib/ext/jquery.ae.image.resize'], function($, classy, manufacturers, appstate, Mfg, ui) {
  "use strict";

  var indexPositions = function() {
    var index = {}
    $('#manufacturer .index li').each(function() {
      index[$(this).html()] = 0
    })

    $('#manufacturer .manufacturers .name').each(function() {
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
  }

  var li = function(el) {
    return $(el).parents('li')[0]
  }

  return classy({
    wire: function() {
      this.render()
      this.wireList()
      this.wireIndex()
    },
    $list: function() {
      return $('#manufacturer .manufacturers')
    },
    $index: function() {
      return $('#manufacturer .index')
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
      this.$index().on('click', 'li', function(event) {
        event.stopPropagation()
        var index = indexPositions()
        var letter = $(this).html()[0]
        ui.scrollTop(index[letter])
      })
    },
    render: function () {
      var $doc = $(document.createDocumentFragment())
      manufacturers.forEach(function(mfg) {
        Mfg.render().write(mfg).$el().appendTo($doc)
      })
      var $list = this.$list().empty().append($doc.children())
      if ($list.hasClass('ui-listview')) {
        $list.listview('refresh')
      }
      return this
    }
  })
})
