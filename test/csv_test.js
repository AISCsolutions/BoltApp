define(['lib/csv'], function(csv) {
  module('csv')
  test('parse a line', function() {
    deepEqual(csv.parse('one,two'), [['one', 'two']])
  })

  test('parse a quoted line', function() {
    deepEqual(csv.parse('"one","two"'), [['one', 'two']])
  })

  test('parse a line with blanks', function() {
    deepEqual(csv.parse('"one",,"two"'), [['one', '', 'two']])
  })

  test('parse a line embedded commas', function() {
    deepEqual(csv.parse('"one,two"'), [['one,two']])
  })

  test('parse multiple lines', function() {
    deepEqual(csv.parse('one,two\nthree,four'), [['one', 'two'], ['three', 'four']])
  })

  asyncTest('ajax loading measurements',  function() {
    expect(2)
    csv.load('../data/measurements.csv', function(data) {
      //console.log(data)
      ok(data)
      equal(data.length, 16)
      start()
    })
  })

  asyncTest('ajax loading grade-type-finish', function() {
    expect(2)
    csv.load('../data/grade-type-finish-table-2-1.csv', function(data) {
      //console.log(data)
      ok(data)
      equal(data.length, 16)
      start()
    })
  })

  asyncTest('ajax loading manufacturers', function() {
    expect(2)
    csv.load('../data/manufacturers.csv', function(data) {
      //console.log(data)
      ok(data)
      equal(data.length, 13)
      start()
    })
  })
})
