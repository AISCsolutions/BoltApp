define(['jquery'], function($) {
  "use strict";

  var project = function(objects, property) {
    return objects.map(function(x) {return x[property]})
  }

  return {
    clone: function(selector, appstate, rules) {
      var dup = Object.create(this)
      dup.selector = selector
      dup.appstate = appstate
      dup.rules = rules
      return dup
    },
    $el: function() {
      return $(this.selector)
    },
    $: function(selector) {
      return this.$el().find(selector)
    },
    $datum: function(name) {
      return this.$('[title="'+name+'"]')
    },
    wire: function() {
      var nw = this.rules.bolt(this.appstate.data.bolt).perfect()
      if (nw) {
        this.update(nw)
      } else {
        this.update({})
      }
      this.$el().on('click', 'li a', function() {
        $('.zoom').click(function() {$('.ui-dialog').dialog('close')})
        $(this).find('[title]').each(function() {
          var title = $(this).attr('title')
          $('.zoom [title="'+title+'"]').html($(this).html())
        })
        $('.zoom img').attr('src', $(this).find('img').attr('src'))
      })
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
  }
})
