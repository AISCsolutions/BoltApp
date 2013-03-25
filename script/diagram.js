define(['jquery'], function($) {
  "use strict"

  return {
    clone: function(selector) {
      var my = Object.create(this)
      my.selector = selector
      return my
    },
    $: function(selector) {
      return $(this.selector).find(selector)
    },
    $el: function() {
      return $(this.selector)
    },
    $measure: function(name) {
      return this.$('[title="'+name+'"]')
    },
    show: function() {
      var my = this
      setTimeout(function() {my.ready()}, 0)
    },
    hide: function() {
    },
    ready: function(debugx, debugy) {
      var $diagram = $(this.selector)
      var bo = $diagram.offset()

      var image = $diagram.find('img')
      var so = image.offset()

      this.sx = so.left - bo.left
      this.sy = so.top - bo.top
      this.sw = image.prop('width')
      this.sh = image.prop('height')

      this.placements()
    },
    update: function(measures) {
      for (var name in measures) {
        this.$measure(name).html(measures[name])
      }
      this.placements()
    },
    placements: function() {
      var my = this
      this.$('.measurement').each(function() {
        my.place($(this))
      })
    },
    x: function(x) {
      return (x*this.sw) + this.sx
    },
    y: function(y) {
      return (y*this.sh) + this.sy
    },
    ux: function(x) {
      return (x - this.sx) / this.sw
    },
    uy: function(y) {
      return (y - this.sy) / this.sh
    },
    place: function($m) {
      if ($m.length == 0) {
        return
      }
      var mx = parseInt($m.data('x'), 10) / 100.0
      var my = parseInt($m.data('y'), 10) / 100.0

      this.placeAt($m, this.x(mx), this.y(my))
    },
    placeAt: function($m, x, y) {
      if ($m.length == 0) {
        return
      }

      var px = function(n) {
        return n.toString() + 'px'
      }

      var mw = $m.outerWidth() / 2
      var mh = $m.outerHeight() / 2
      $m.css('left', px(x - mw))
      $m.css('top', px(y - mh))
    },
    interactivePlace: function(measurement) {
      var diagram = this
      $(document).on('mousemove', function(e) {
        var offset = diagram.$el().offset()
        var mousex = e.pageX - offset.left
        var mousey = e.pageY - offset.top
        diagram.placeAt(diagram.$measure(measurement), mousex, mousey)
        console.log(diagram.ux(mousex), diagram.uy(mousey))
      })
    }
  }
})
