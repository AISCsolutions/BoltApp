define(['measurements'], function(measurements) {
  module('measurements')

  test('parse measurements', function() {
    equal(measurements.length, 9)
  })
})
