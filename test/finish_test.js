define(['finish'], function(finish) {
  module('finish')
  test('plain uncoated', function() {
    equal(finish.colorForFinish('Plain (uncoated)'), 'plain')
  })
  test('Galvanized', function() {
    equal(finish.colorForFinish('Mechanically Galvanized'), 'galvanized')
  })

  test('type 1', function() {
    equal(finish.colorFor({type: '1', finish: 'Plain'}), 'plain')
  })
  test('type 3', function() {
    equal(finish.colorFor({type: '3', finish: 'Plain'}), 'weathering')
  })
})
