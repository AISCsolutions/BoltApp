define(['jquery', 'finish', 'lib/ext/iscroll-lite'], function($, Finish) {
  var scrollers = {}

  var contentHeight = function(event) {
    var headerHeight = parseInt($.mobile.activePage.css("padding-top"), 10)
    var footerHeight = $.mobile.activePage.find('[data-role="footer"]').height() + 2
    var windowHeight = $('body').height()
    var topPadding = parseInt($.mobile.activePage.find('[data-role="content"]').css("padding-top"), 10)
    var bottomPadding = parseInt($.mobile.activePage.find('[data-role="content"]').css("padding-bottom"), 10)
    var height = windowHeight - headerHeight - footerHeight - topPadding - bottomPadding;
    var cause = event ? event.type : ''
    //console.log(height, windowHeight, headerHeight, footerHeight, topPadding, bottomPadding, 'contentHeight', cause)
    return height
  }

  var setContentHeight = function(el, event) {
    $(el).css('height', contentHeight(event))
    //$.mobile.activePage.append('<p>'+windowHeight.toString()+'</p>')
  }

  var softwareResize = function(event) {
    setContentHeight('.ui-content', event)
    if (scrollers[this.id]) {
      scrollers[this.id].refresh()
    } else {
      var $el = $(this).find('[data-role="content"]')
      $el.wrapInner('<div class="scrolling-region">')
      scrollers[this.id] = new iScroll($el[0])
    }
  }

  return {
    setup: function(bolt) {
      this.gradeChanged(bolt.grade)
      this.typeChanged(bolt)
      this.finishChanged(bolt)
    },
    gradeChanged: function(grade) {
      $('body').toggleClass('tc-bolt', grade[0] == 'F')
      $('.current-grade .ui-btn-text').html(grade)
      $('.current-grade').not('.current-grade:has(.ui-btn-text)').html(grade)
    },
    typeChanged: function(bolt) {
      $('body').toggleClass('type-1', bolt.type == '1')
      $('body').toggleClass('type-3', bolt.type == '3')
      this.finishChanged(bolt)
    },
    finishChanged: function(bolt) {
      var finish_class = Finish.colorFor(bolt)
      $('body').toggleClass('finish-plain', finish_class == 'plain')
      $('body').toggleClass('finish-galvanized-hot-dip', finish_class == 'galvanized-hot-dip')
      $('body').toggleClass('finish-galvanized-mechanical', finish_class == 'galvanized-mechanical')
      $('body').toggleClass('finish-zn-al', finish_class == 'zn-al')
      $('body').toggleClass('finish-weathering', finish_class == 'weathering')
    },
    contentHeight: contentHeight,
    setContentHeight: setContentHeight,
    softwareScroll: function() {
      console.info('patching scroll for no fixed position')
      $(document).on('pageshow', '[data-role="page"]', softwareResize)
      $(document).on('resize', function(event) {softwareResize.call($.mobile.activePage, event)})
    },
    scrollTop: function(y) {
      var target = scrollers[$.mobile.activePage[0].id]
      if (target) {
        target.scrollTo(0, -y)
      } else {
        $(window).scrollTop(y)
      }
    }
  }
})
