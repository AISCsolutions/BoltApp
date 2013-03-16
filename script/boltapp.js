$(function() {
  /* Dimensions */
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
