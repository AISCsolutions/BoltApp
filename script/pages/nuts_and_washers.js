define(['jquery', 'lib/classy', 'lib/ext/jquery.ae.image.resize'], function($, classy) {
  "use strict";

  return classy({
    init: function(element, options) {
      this.element = $(element)
      this.appstate = options.appstate
      this.rules = options.rules
      this.wire()
      return this
    },
    $: function(selector) {
      return this.element.find(selector)
    },
    $datum: function(name) {
      return this.$('[title="'+name+'"]')
    },
    wire: function() {
      this.element.on('click', 'li a', function() {
        $('.zoom').click(function() {$('.ui-dialog').dialog('close')})
        $(this).find('[title]').each(function() {
          var title = $(this).attr('title')
          $('.zoom [title="'+title+'"]').html($(this).html())
        })
        $('.zoom img')
          .attr('src', $(this).find('img').attr('src'))
          .aeImageResize({width: 150})
      })
    },
    show: function() {
      var nw = this.rules.bolt(this.appstate.data.bolt).perfect()
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
