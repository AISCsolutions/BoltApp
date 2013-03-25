define(['jquery', 'appstate'], function($, appstate) {
  "use strict"

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

    console.log($('#manufacturer .index'))
    $('#manufacturer .index').on('click', 'li', function(event) {
      event.stopPropagation()
      var letter = $(this).html()
      console.log(letter)
      $('#manufacturer .name').each(function() {
        var name = $(this).html()
        if (name[0] == letter) {
          console.log(name)

          $(window).scrollTop($(this).parent().parent().parent().parent()[0].offsetTop)
          return false
        }
      })
    })
  }

  return {
    wire: wireManufacturer
  }
})
