define(['jquery', 'can/control', 'controls/zoom'], function($, Control, Zoom) {
  "use strict";

  return Control({
    init: function(element, options) {
      this.bolt = options.bolt
      this.rules = options.rules
      this.washerZoom = new Zoom('#washer-zoom')
      this.nutZoom = new Zoom('#nut-zoom')
      return this
    },
    $: function(selector) {
      return this.element.find(selector)
    },
    $datum: function(name) {
      return this.$('[title="'+name+'"]')
    },
    'li a click': function(a) {
      var $zoom = $(a.attr('href') + ' .zoom')
      a.find('[title]').each(function() {
        var title = $(this).attr('title')
        $zoom.find('[title="'+title+'"]').html($(this).html())
      })
      $zoom.find('img')
        .attr('src', $(a).find('img').attr('src').replace('80', '264'))
        .trigger('open')
    },
    ' pagebeforeshow': function() {
      var nw = this.rules.bolt(this.bolt).perfect()
      if (nw) {
        this.update(nw)
      } else {
        this.update({})
      }
    },
    update: function(data) {
      this.updateFields(data)
      this.updateLegalNuts(data)
      this.updateLegalWashers(data)
    },
    updateFields: function(data) {
      for (var name in data) {
        this.$datum(name).html(data[name] || '')
      }
    },
    updateLegalNuts: function(data) {
      var nuts = (data['Nut Grade'] || '').split(', ')
      this.$('li.nut').each(function() {
        var $el = $(this)
        if (nuts.indexOf($el.find('.nut.grade').html()) >= 0) {
          $el.removeClass('illegal')
        } else {
          $el.addClass('illegal')
        }
      })
      return this
    },
    updateLegalWashers: function(data) {
      var type = data['Washer Type']
      this.$('li.washer').each(function() {
        var $el = $(this)
        if ($el.find('.washer.type').html() == type) {
          $el.removeClass('illegal')
        } else {
          $el.addClass('illegal')
        }
      })
      return this
    }
  })
})
