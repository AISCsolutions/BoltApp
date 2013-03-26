define(['jquery', 'appstate'], function($, appstate) {
  "use strict"

  var project = function(objects, property) {
    return objects.map(function(x) {return x[property]})
  }

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

  return {
    finishes: [],
    clone: function(rules) {
      var dup = Object.create(this)
      dup.rules = rules
      dup.finishes = finishes(rules)
      return dup
    },
    current: function() {
      return project(this.rules.gradeType(), 'Bolt Finish')
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
      return $('#finish').find(selector)
    },
    $el: function() {
      return $('#finish')
    },
    wire: function() {
      this.$el().on('click', 'li a', function() {
        appstate.data.bolt.finish = $(this).find('h2').text()
        appstate.save()
      })
      return this.render().update()
    },
    render: function() {
      var $doc = $(document.createDocumentFragment())
      this.finishes.forEach(function(finish) {
        var $item = $('<li><a href="#bolt-id" data-rel="back"></a></li>').
          attr('title', finish.name).
          appendTo($doc)
        var $container = $item.find('a')
        $('<img>').attr('src', 'images/finishes/mock.png').appendTo($container)
        $('<h2></h2>').html(finish.name).appendTo($container)
        $('<p></p>').html(finish.note).appendTo($container)
      })
      var $finishes = this.$('.finishes').empty().append($doc.children())
      try {
        $finishes.listview('refresh')
      } catch(e) {
        console.error(e)
      }
      return this
    }
  }
})
