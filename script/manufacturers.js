define(['jquery', 'manufacturer', 'appstate', 'shared_ui'], function($, Mfg, appstate, ui) {
  "use strict"

  var indexPositions = function() {
    var index = {}
    $('#manufacturer .index li').each(function() {
      index[$(this).html()] = 0
    })

    $('#manufacturer .manufacturers .name').each(function() {
      var name = $(this).html()
      var y = $(this).offsetParent().offset().top
      if (index[name[0]] == 0) {
        index[name[0]] = y
      }
    })

    var last = 0
    for (var l in index) {
      if (index[l] == 0) {
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

  return {
    wire: function() {
      this.wireList()
      this.wireIndex()
    },
    $content: function() {
      return $('#manufacturer [data-role="content"]')
    },
    $index: function() {
      return $('#manufacturer .index')
    },
    wireList: function() {
      this.$content().on('click',  'li a[href="#bolt-id"]', function() {
        appstate.data.bolt.manufacturer = Mfg.clone(li(this)).read()
        appstate.save()
      })

      this.$content().on('click',  'li a[href="#mfg-zoom"]', function() {
        $('.zoom').click(function() {$('.ui-dialog').dialog('close')})
        var mfg = Mfg.clone(li(this)).read()
        Mfg.clone('.zoom').write(mfg)
      })
    },
    wireIndex: function() {
      this.$index().on('click', 'li', function(event) {
        event.stopPropagation()
        var index = indexPositions()
        var letter = $(this).html()[0]
        ui.scrollTop(index[letter])
      })
    }
  }
})
