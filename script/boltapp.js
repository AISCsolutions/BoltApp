$(function() {
  /* Dimensions - diagram */
  $('#bolt-select').on('change', function() {
    $('#bolt-diagram').show()
    $('#nut-diagram').hide()
    $('#washer-diagram').hide()
  })
  $('#nut-select').on('change', function() {
    $('#bolt-diagram').hide()
    $('#nut-diagram').show()
    $('#washer-diagram').hide()
  })
  $('#washer-select').on('change', function() {
    $('#bolt-diagram').hide()
    $('#nut-diagram').hide()
    $('#washer-diagram').show()
  })

  $('#dimensions input[checked="checked"]').change()

  /* Dimensions - diameter */

  var diameterInches = {
    '0.5': '1/2',
    '0.625': '5/8',
    '0.75': '3/4',
    '0.875': '7/8',
    '1': '1',
    '1.125': '1 1/8',
    '1.25': '1 2/4',
    '1.375': '1 3/8',
    '1.5': '1 1/2',
  }

  var wireDiameter = function() {
    $('#diameter').on('change', function() {
      $('#diameter-inches span').html(diameterInches[$(this).val().toString()])
    })
  }

  var Diagram = {
    clone: function(selector, which) {
      var my = Object.create(this)
      my.selector = selector
      my.which = which
      return my
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
    placements: function() {
      var my = this
      $(this.selector).find('.measurement').each(function() {
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

      var mw = $m.width() / 2
      var mh = $m.height() / 2
      $m.css('left', px(x - mw))
      $m.css('top', px(y - mh))
    }
  }

  var bolt = Diagram.clone('#bolt-diagram', 'Bolt')

  var placeMeasurements = function(measurements) {
    window.measurements = measurements
  }

  var place = function(diagram, measurement) {
    $(document).on('mousemove', function(e) {
      var offset = $('.diagrams li').offset()
      var mousex = e.pageX - offset.left
      var mousey = e.pageY - offset.top
      diagram.placeAt($('[title="'+measurement+'"]'), mousex, mousey)
      console.log(diagram.ux(mousex), diagram.uy(mousey))
    })
  }

  place(bolt, 'Base Length')

  var setupDimenions = function() {
    bolt.ready()
    bolt.placements()
    loadMeasurements(placeMeasurements)
    wireDiameter()
  }

  $('#dimensions').on('pageshow', setupDimenions)

  /* Nuts and Washers */
  var fixNW = function() {
    console.log('fixing NW')
    var headerHeight = $.mobile.activePage.find('[data-role="header"]').height()
    var footerHeight = $.mobile.activePage.find('[data-role="footer"]').height()
    var windowHeight = $(this).height()
    var contentPadding = parseInt($.mobile.activePage.find('[data-role="content"]').css("padding-top"), 10)
    var pagePadding = parseInt($.mobile.activePage.css("padding-top"), 10)
    $('#nuts-and-washers .split').css('height', windowHeight - headerHeight - footerHeight - pagePadding - contentPadding*2)
  }

  $(window).on('navigate', fixNW)
})
