define(['jquery', 'lib/classy'], function($, classy) {
  "use strict";

  var Mfg = classy({
    init: function(selector) {
      this.selector = selector
      return this
    },
    $el: function() {
      return $(this.selector)
    },
    read: function() {
      var $el = this.$el()
      return {
        name: $el.find('.name').html(),
        location: $el.find('.location').html(),
        bolt: $el.find('.bolt').attr('src').replace(/images\/bolts\/(.+)\.(png|svg)/, "$1"),
        website: $el.find('.website').attr('href')
      }
    },
    write: function(mfg) {
      var $el = this.$el()
      $el.find('.name').html(mfg.name)
      $el.find('.location').html(mfg.location)
      $el.find('.website').attr('href', mfg.website)
      $el.find('.website.html').html(mfg.website)
      $el.find('.bolt').attr('src', 'images/bolts/'+mfg.bolt+'.png')
      return this
    }
  })

  Mfg.render = function() {
    var template = '<li><a href="#bolt-id">\
      <img class="bolt" src="">\
      <h2 class="name">Name</h2>\
      <p class="location">Location</p>\
      <a class="website" href="">Webpage</a>\
      <a href="#mfg-zoom" data-rel="dialog" data-icon="search">Show</a>\
    </a></li>'
    return new Mfg().init($(template))
  }

  return Mfg
})
