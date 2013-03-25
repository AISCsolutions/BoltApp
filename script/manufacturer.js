define(['jquery', 'appstate'], function($, appstate) {
  "use strict"

  var indexPositions = function() {
    var index = {}
    $('#manufacturer .index li').each(function() {
      index[$(this).html()] = 0
    })

    $('#manufacturer .manufacturers .name').each(function() {
      var name = $(this).html()
      var y = $(this).offsetParent().offset().top
      if (index[name[0]] == 0) {
        index[name[0]] = y
      }
    })

    var last = 0
    for (var l in index) {
      if (index[l] == 0) {
        index[l] = last
      } else {
        last = index[l]
      }
    }

    return index
  }

  var wireManufacturer = function() {
    $('#manufacturer').on('click',  'li a[href="#bolt-id"]', function() {
      appstate.data.bolt.manufacturer = {
        name: $(this).find('.name').html(),
        location: $(this).find('.location').html(),
        bolt: $(this).find('.bolt').attr('src'),
        website: $(this).parent().parent().parent().find('.website').attr('href')
      }
      appstate.save()
    })

    $('#manufacturer .index').on('click', 'li', function(event) {
      event.stopPropagation()
      var index = indexPositions()
      var letter = $(this).html()[0]
      $(window).scrollTop(index[letter])
    })
  }

  return {
    wire: wireManufacturer
  }
})
