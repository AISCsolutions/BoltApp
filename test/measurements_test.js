define(['measurements', 'csv'], function(measurements, csv) {
  QUnit.config.testTimeout = 1000;

  var data = []

  module('measurements', {
    setup: function() {
      stop()
      csv.load('../data/measurements.csv', function(received) {
        data = received
        start()
      })
    }
  })

  test('data received', function() {
    equal(data.length, 17)
  })

  test('parse measurements', function() {
    equal(measurements.parse(data).length, 9)
  })
})
