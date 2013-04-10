define(['finish'], function(finish) {
  module('finish')
  test('plain', function() {
    equal(finish.colorForFinish('Plain'), 'plain')
  })
  test('Galvanized', function() {
    equal(finish.colorForFinish('Galvanized (Mechanical)'), 'galvanized-mechanical')
  })

  test('type 1', function() {
    equal(finish.colorFor({type: '1', finish: 'Plain'}), 'plain')
  })
  test('type 3', function() {
    equal(finish.colorFor({type: '3', finish: 'Plain'}), 'weathering')
  })
})
