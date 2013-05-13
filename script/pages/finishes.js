define([
  'jquery',
  'can/control',
  'finish',
  'appstate'
], function(
  $,
  Control,
  colors,
  appstate
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
    selected: function() {
      return appstate.get('bolt.finish')
    },
    update: function() {
      var current = this.current()
      var selected = this.selected()
      this.$('li').each(function() {
        var $el = $(this)
        var title = $el.attr('title')
        $el.toggleClass('illegal', current.indexOf(title) < 0)
        $el.toggleClass('selected', selected == title)
      })

      var color = colors.colorFor({
        finish: 'Plain',
        type: appstate.get('bolt.type')
      })
      this.$('li[title="Plain"] img')
        .attr('src', 'images/finishes/'+color+'.jpeg')

      return this
    },
    $: function(selector) {
      return this.element.find('[data-role="content"] ' + selector)
    },
    '[data-role="content"] li a click': function(a) {
      appstate.set('bolt.finish', $(a).find('h2').text())
    },
    ' pagebeforeshow': function() {
      return this.update()
    },
    render: function() {
      var $doc = $(document.createDocumentFragment())
      this.finishes.forEach(function(finish) {
        var $item = $('<li data-icon="check"><a href="#bolt-id" data-rel="back"></a></li>').
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
