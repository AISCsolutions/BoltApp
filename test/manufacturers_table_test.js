define(['manufacturers_table'], function(manufacturers) {
  module('manufacturers_table')

  test('manufacturers', function() {
    equal(manufacturers.length, 12)
  })
})
