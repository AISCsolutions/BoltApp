define([
  'jquery',
  'can/control',
  'finish',
  'appstate',
  'controls/shared_ui'
], function(
  $,
  Control,
  colors,
  appstate,
  ui
) {
  "use strict";

  var finishes = function(rules) {
    var kinds = {}
    rules.forEach(function(c) {
      kinds[c['Bolt Finish']] = {
        name: c['Bolt Finish'],
        note: c['Bolt Finish Note']
      }
    })
    return Object.keys(kinds).sort().map(function(x) {return kinds[x]})
  }

  return Control({
    finishes: [],
    init: function(element, options) {
      this.rules = options.rules
      this.finishes = finishes(this.rules)
      this.render()
      return this
    },
    current: function() {
      return this.rules.bolt(appstate.get('bolt')).anyFinish().allowedFinishes()
    },
    update: function() {
      var current = this.current()
      this.$('li').each(function() {
        var $el = $(this)
        if (current.indexOf($el.attr('title')) >= 0) {
          $el.removeClass('illegal')
        } else {
          $el.addClass('illegal')
        }
      })
      return this
    },
    $: function(selector) {
      return this.element.find(selector)
    },
    'li a click': function(a) {
      appstate.set('bolt.finish', $(a).find('h2').text())
      ui.finishChanged(appstate.data.bolt)
    },
    show: function() {
      return this.update()
    },
    render: function() {
      var $doc = $(document.createDocumentFragment())
      this.finishes.forEach(function(finish) {
        var $item = $('<li><a href="#bolt-id" data-rel="back"></a></li>').
          attr('title', finish.name).
          appendTo($doc)
        var $container = $item.find('a')
        var color = colors.colorFor({
          finish: finish.name,
          type: appstate.get('bolt.type')
        })
        $('<img>').attr('src', 'images/finishes/'+color+'.jpeg').appendTo($container)
        $('<h2></h2>').html(finish.name).appendTo($container)
        $('<p></p>').html(finish.note).appendTo($container)
      })
      var $finishes = this.$('.finishes').empty().append($doc.children())
      if ($finishes.hasClass('ui-listview')) {
        $finishes.listview('refresh')
      }
      return this
    }
  })
})
