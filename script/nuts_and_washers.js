define(['jquery'], function($) {
  return {
    $: function(selector) {
      return $('#nuts-and-washers').find(selector)
    },
    $datum: function(name) {
      return this.$('[title="'+name+'"]')
    },
    update: function(data) {
      for (var name in data) {
        this.$datum(name).html(data[name])
      }
    },
    setContentHeight: function(e) {
      var headerHeight = parseInt($.mobile.activePage.css("padding-top"), 10)
      var footerHeight = $.mobile.activePage.find('[data-role="footer"]').height() + 2
      var windowHeight = $('body').height()
      var topPadding = parseInt($.mobile.activePage.find('[data-role="content"]').css("padding-top"), 10)
      var bottomPadding = parseInt($.mobile.activePage.find('[data-role="content"]').css("padding-bottom"), 10)
      var height = windowHeight - headerHeight - footerHeight - topPadding - bottomPadding;
      console.log('NW.setContentHeight', e.type, height, windowHeight, headerHeight, footerHeight, topPadding, bottomPadding)
      $('#nuts-and-washers .split').css('height', height)
      //$.mobile.activePage.append('<p>'+windowHeight.toString()+'</p>')
    }
  }
})
