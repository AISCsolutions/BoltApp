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

  var placeMeasurements = function(measurements, dx, dy) {
    var bolt = $('#bolt-diagram')
    var bo = bolt.offset()

    var diagram = $('#bolt-diagram img')
    var so = diagram.offset()
    var sx = so.left - bo.left
    var sy = so.top - bo.top
    var sw = diagram.prop('width')
    var sh = diagram.prop('height')
    var iw = diagram.prop('naturalWidth')
    var ih = diagram.prop('naturalHeight')

    var m = $('.measurement')
    var mw = m.width() / 2
    var mh = m.height() / 2
    var mx = parseInt(m.data('x'), 10) / 100.0
    var my = parseInt(m.data('y'), 10) / 100.0

    var px = function(x) {
      return ((x*sw) - mw + sx).toString() + 'px'
    }
    var py = function(y) {
      return ((y*sh) - mh + sy).toString() + 'px'
    }

    if (dx) {
      mx = dx/sw
      my = dy/sh
      console.log(mx, my)
    }

    m.css('left', px(mx))
    m.css('top', py(my))
  }

  $(document).on('mousemove', function(e) {
    var offset = $('.diagrams li img').offset()
    window.mousex = e.pageX - offset.left
    window.mousey = e.pageY - offset.top
    placeMeasurements(measurements, mousex, mousey)
  })

  var setupDimenions = function() {
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
