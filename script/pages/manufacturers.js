define(['jquery', 'lib/classy', 'tables/manufacturers', 'appstate', 'controls/manufacturer', 'controls/shared_ui', 'lib/ext/jquery.ae.image.resize'], function($, classy, manufacturers, appstate, Mfg, ui) {
  "use strict";

  var li = function(el) {
    return $(el).parents('li')[0]
  }

  var Index = classy({
    init: function(element, options) {
      this.element = $(element)
      this.list = options.list
      return this
    },
    wire: function() {
      var list = this
      this.element.on('click', 'li', function(event) {
        event.stopPropagation()
        var index = list.indexPositions()
        var letter = $(this).html()[0]
        ui.scrollTop(index[letter])
      })
    },
    indexPositions: function() {
      var index = {}
      this.element.find('li').each(function() {
        index[$(this).html()] = 0
      })

      this.list.element.find('.name').each(function() {
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
  })

  var List = classy({
    init: function(element) {
      this.element = $(element)
      this.render()
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

  return classy({
    init: function(element) {
      this.element = $(element)
      this.list = new List(this.element.find('.manufacturers'))
      this.index = new Index(this.element.find('index'), {list: this.list})
      return this
    },
    wire: function() {
      this.list.wire()
      this.index.wire()
    },
  })
})
