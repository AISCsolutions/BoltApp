define(['jquery', 'can/control', 'manufacturer'], function($, Control, manufacturer) {
  "use strict";

  var Mfg = Control({
    read: function() {
      return this.element.attr('id')
    },
    write: function(id) {
      if (typeof(id) != 'string') {return this}
      var mfg = manufacturer[id]
      if (!mfg) {return this}
      var $el = this.element
      if ($el.is('li')) {
        $el.attr('id', id)
      }
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
      <a href="#mfg-zoom" data-rel="dialog" data-icon="search">Show</a>\
    </a></li>'
    return new Mfg($(template))
  }

  return Mfg
})
