define(['jquery', 'iscroll-lite'], function($) {
  var scrollers = {}

  return {
    setup: function(state) {
      this.gradeChanged(state.bolt.grade)
      this.typeChanged(state.bolt.type)
    },
    gradeChanged: function(grade) {
      $('.current-grade .ui-btn-text').html(grade)
      $('.ui-btn-text .current-grade').html(grade)
    },
    typeChanged: function(type) {
      $('body').toggleClass('type-3', type == '3')
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
    }
  }
})
