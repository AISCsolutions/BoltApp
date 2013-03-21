define(['grade-type-finish', 'csv'], function(gtv, csv) {
  QUnit.config.testTimeout = 1000;

  var data = []

  module('grade-type-finish', {
    setup: function() {
      stop()
      csv.load('../data/grade-type-finish-table-2-1.csv', function(received) {
        data = received
        start()
      })
    }
  })

  test('data received', function() {
    equal(data.length, 16)
  })

  test('parse data', function() {
    equal(gtv.parse(data).length, 14)
  })
})
