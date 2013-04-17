define(['jquery', 'can/control', 'lib/ext/jquery.ae.image.resize'], function($, Control) {
  "use strict";

  return Control({
    init: function(element, options) {
      this.appstate = options.appstate
      this.rules = options.rules
      return this
    },
    $: function(selector) {
      return this.element.find(selector)
    },
    $datum: function(name) {
      return this.$('[title="'+name+'"]')
    },
    'li a click': function(a) {
      $('.zoom').click(function() {$('.ui-dialog').dialog('close')})
      $(a).find('[title]').each(function() {
        var title = $(this).attr('title')
        $('.zoom [title="'+title+'"]').html($(this).html())
      })
      $('.zoom img')
        .attr('src', $(a).find('img').attr('src'))
        .aeImageResize({width: 150})
    },
    ' pagebeforeshow': function() {
      var nw = this.rules.bolt(this.appstate.get('bolt')).perfect()
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
