define(['jquery', 'finish'], function($, Finish) {
  var contentHeight = function(event) {
    var headerHeight = $.mobile.activePage.find('[data-role="header"]').height() + 4
    var footerHeight = $.mobile.activePage.find('[data-role="footer"]').height() + 2
    var windowHeight = $('body').height()
    var topPadding = parseInt($.mobile.activePage.find('[data-role="content"]').css("padding-top"), 10)
    var bottomPadding = parseInt($.mobile.activePage.find('[data-role="content"]').css("padding-bottom"), 10)
    var height = windowHeight - headerHeight - footerHeight - topPadding - bottomPadding;
    var cause = event ? event.type : ''
    var debug = [height, windowHeight, headerHeight, footerHeight, topPadding, bottomPadding, 'contentHeight', cause]
    //console.log(debug); $.mobile.activePage.append('<p>'+debug.toString()+'</p>')
    return height
  }

  var setContentHeight = function(el, event) {
    $(el).css('height', contentHeight(event))
    //$.mobile.activePage.append('<p>'+windowHeight.toString()+'</p>')
  }

  var gradeChanged = function(grade) {
    $('body').toggleClass('tc-bolt', grade[0] == 'F')
    $('.current-grade .ui-btn-text').html(grade)
    $('.current-grade').not('.current-grade:has(.ui-btn-text)').html(grade)
  }
  var typeChanged = function(type) {
    $('body').toggleClass('type-1', type == '1')
    $('body').toggleClass('type-3', type == '3')
  }
  var finishChanged = function(bolt) {
    var finish_class = Finish.colorFor(bolt)
    $('body').toggleClass('finish-plain', finish_class == 'plain')
    $('body').toggleClass('finish-galvanized-hot-dip', finish_class == 'galvanized-hot-dip')
    $('body').toggleClass('finish-galvanized-mechanical', finish_class == 'galvanized-mechanical')
    $('body').toggleClass('finish-zn-al', finish_class == 'zn-al')
    $('body').toggleClass('finish-weathering', finish_class == 'weathering')
  }

  return {
    setup: function(bolt) {
      bolt.bind('grade', function(ev, grade) {gradeChanged(grade)})
      bolt.bind('type', function(ev, type) {typeChanged(type)})
      bolt.bind('change', function() {finishChanged(this)})
      gradeChanged(bolt.grade)
      typeChanged(bolt.type)
      finishChanged(bolt)
    },
    contentHeight: contentHeight,
    setContentHeight: setContentHeight
  }
})
