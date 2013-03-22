define(['jquery', 'appstate'], function($, appstate) {
  "use strict"

  var wireDiameter = function(callback) {
    $('#diameter').on('change', function() {
      var value = $(this).val()
      if (appstate.data.bolt.diameter != value) {
        appstate.data.bolt.diameter = value
        appstate.save()
        callback()
      }
    })
    $('#diameter').val(appstate.data.bolt.diameter).change()
  }

  return {
    wire: wireDiameter
  }
})
