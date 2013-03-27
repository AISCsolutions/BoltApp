define(['jquery', 'finish', 'iscroll-lite'], function($, Finish) {
  var scrollers = {}

  return {
    gradeChanged: function(grade) {
      $('.current-grade .ui-btn-text').html(grade)
      $('.current-grade').not('.current-grade:has(.ui-btn-text)').html(grade)
    },
    typeChanged: function(type) {
      $('body').toggleClass('type-3', type == '3')
    },
    finishChanged: function(finish) {
      var finish_class = Finish.colorForFinish(finish)
      $('body').toggleClass('finish-plain', finish_class == 'plain')
      $('body').toggleClass('finish-galvanized', finish_class == 'galvanized')
      $('body').toggleClass('finish-zn-al', finish_class == 'zn-al')
      $('body').toggleClass('finish-weathering', finish_class == 'weathering')
    },
    setContentHeight: function(el, event) {
      var headerHeight = parseInt($.mobile.activePage.css("padding-top"), 10)
      var footerHeight = $.mobile.activePage.find('[data-role="footer"]').height() + 2
      var windowHeight = $('body').height()
      var topPadding = parseInt($.mobile.activePage.find('[data-role="content"]').css("padding-top"), 10)
      var bottomPadding = parseInt($.mobile.activePage.find('[data-role="content"]').css("padding-bottom"), 10)
      var height = windowHeight - headerHeight - footerHeight - topPadding - bottomPadding;
      console.log('setContentHeight', el, event.type, height, windowHeight, headerHeight, footerHeight, topPadding, bottomPadding)
      $(el).css('height', height)
      //$.mobile.activePage.append('<p>'+windowHeight.toString()+'</p>')
    },
    softwareScroll: function() {
      console.info('patching scroll for no fixed position')
      var ui = this
      $(document).on('pageshow', '[data-role="page"]', function(event) {
        ui.setContentHeight('.ui-content', event)
        if (scrollers[this.id]) {
          scrollers[this.id].refresh()
        } else {
          var $el = $(this).find('[data-role="content"]')
          $el.wrapInner('<div class="scrolling-region">')
          scrollers[this.id] = new iScroll($el[0])
        }
      })
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
