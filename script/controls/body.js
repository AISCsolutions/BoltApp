define(['jquery', 'jquerymobile', 'can/control', 'finish'], function($, mobile, Control, Finish) {
  var contentHeight = function(event) {
    var headerHeight = mobile.activePage.find('[data-role="header"]').height() + 4
    var footerHeight = mobile.activePage.find('[data-role="footer"]').height() + 2
    var windowHeight = $('body').height()
    var topPadding = parseInt(mobile.activePage.find('[data-role="content"]').css("padding-top"), 10)
    var bottomPadding = parseInt(mobile.activePage.find('[data-role="content"]').css("padding-bottom"), 10)
    var height = windowHeight - headerHeight - footerHeight - topPadding - bottomPadding;
    var cause = event ? event.type : ''
    var debug = [height, windowHeight, headerHeight, footerHeight, topPadding, bottomPadding, 'contentHeight', cause]
    //console.log(debug); mobile.activePage.append('<p>'+debug.toString()+'</p>')
    return height
  }

  return Control({
    init: function(element, options) {
      this.bolt = options.bolt
      this.gradeChanged(this.bolt.grade)
      this.typeChanged(this.bolt.type)
      this.finishChanged(this.bolt)
    },
    '{bolt} grade': function(bolt, ev, grade) { this.gradeChanged(grade) },
    '{bolt} type': function(bolt, ev, type) { this.typeChanged(type) },
    '{bolt} change': function(bolt) { this.finishChanged(bolt) },
    contentHeight: contentHeight,
    gradeChanged: function(grade) {
      this.element.toggleClass('tc-bolt', grade[0] == 'F')
      $('.current-grade .ui-btn-text').html(grade)
      $('.current-grade').not('.current-grade:has(.ui-btn-text)').html(grade)
    },
    typeChanged: function(type) {
      this.element.toggleClass('type-1', type == '1')
      this.element.toggleClass('type-3', type == '3')
    },
    finishChanged: function(bolt) {
      var finish_class = Finish.colorFor(bolt)
      this.element.toggleClass('finish-plain', finish_class == 'plain')
      this.element.toggleClass('finish-galvanized-hot-dip', finish_class == 'galvanized-hot-dip')
      this.element.toggleClass('finish-galvanized-mechanical', finish_class == 'galvanized-mechanical')
      this.element.toggleClass('finish-zn-al', finish_class == 'zn-al')
      this.element.toggleClass('finish-weathering', finish_class == 'weathering')
    }
  })
})
