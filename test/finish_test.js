define(['finish'], function(finish) {
  module('finish')
  test('plain uncoated', function() {
    equal(finish.colorForFinish('Plain (uncoated)'), finish.finishColors.Plain)
  })
  test('Galvanized', function() {
    equal(finish.colorForFinish('Mechanically Galvanized'), finish.finishColors.Galvanized)
  })

  test('type 1', function() {
    equal(finish.colorFor({type: '1', finish: 'Plain'}), finish.finishColors.Plain)
  })
  test('type 3', function() {
    equal(finish.colorFor({type: '3', finish: 'Plain'}), finish.finishColors.Weathering)
  })
})
