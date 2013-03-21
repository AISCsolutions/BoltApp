define(['grade_type_finish', 'csv'], function(gtf, csv) {
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
    equal(data.length, 15)
  })

  test('parse data', function() {
    equal(gtf.parse(data).length, 13)
  })
})
