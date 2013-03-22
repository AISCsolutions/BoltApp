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
  }

  return {
    wire: wireManufacturer
  }
})
