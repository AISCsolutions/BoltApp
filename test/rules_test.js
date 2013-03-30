define(['rules'], function(rules) {
  module('rules')

  test('gradeTypeFinish', function() {
    ok(rules.gradeTypeFinish())
  })

  test('gradeType', function() {
    equal(rules.gradeType().length, 4)
  })

  test('gradeFinish', function() {
    equal(rules.gradeFinish().length, 1)
  })

  test('typeFinish', function() {
    equal(rules.typeFinish().length, 2)
  })

  test('isGradeLegal', function() {
    ok(rules.isGradeLegal('A325'))
  })

  test('isTypeLegal', function() {
    ok(rules.isTypeLegal('1'))
  })

  test('isFinishLegal', function() {
    ok(rules.isFinishLegal('Plain (uncoated)'))
  })
})
