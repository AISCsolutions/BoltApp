define(['jquery', 'appstate'], function($, appstate) {
  var wireManufacturer = function() {
    $('#manufacturer li a[href="#bolt-id"]').on('click', function() {
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
