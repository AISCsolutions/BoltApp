define(['fraction'], function(fraction) {
  module('fraction')
  test('whole', function() {
    equal(fraction.clone('1').toString(), '1')
  })

  test('half', function() {
    equal(fraction.clone('1/2').toString(), '<sup>1</sup>&frasl;<sub>2</sub>')
  })

  test('all', function() {
    equal(fraction.clone('1 1/2').toString(), '1 <sup>1</sup>&frasl;<sub>2</sub>')
  })
})
