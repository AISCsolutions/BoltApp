define(['jquery', 'appstate'], function($, appstate) {

  var finishes = function(combinations) {
    var kinds = {}
    combinations.forEach(function(c) {
      kinds[c['Bolt Finish']] = true
    })
    return Object.keys(kinds).sort().map(function(f) {return f.split(', ')})
  }

  return {
    finishes: [],
    clone: function(combinations) {
      var dup = Object.create(this)
      dup.finishes = finishes(combinations)
      return dup
    },
    $: function(selector) {
      return $('#finish').find(selector)
    },
    $el: function() {
      return $('#finish')
    },
    wire: function() {
      this.$el().on('click', 'li a', function() {
        console.log(this)
        appstate.data.bolt.finish = $(this).find('h2').text()
        appstate.save()
      })
    },
    render: function() {
      var $doc = $(document.createDocumentFragment())
      this.finishes.forEach(function(finish) {
        var $item = $('<li><a href="#bolt-id"></a></li>').appendTo($doc)
        var $container = $item.find('a')
        $('<img>').attr('src', 'images/finishes/mock.png').appendTo($container)
        $('<h2></h2>').html(finish[0]).appendTo($container)
        $('<p></p>').html(finish[1]).appendTo($container)
      })
      this.$('.finishes').empty().append($doc.children()).listview('refresh')
      return this
    }
  }
})
