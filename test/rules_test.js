define(['rules'], function(Rules) {
  module('rules')

  var rules = Rules.bolt({grade: 'A325', type: '1', finish: 'Plain'})

  test('forEach', function() {
    expect(14)
    Rules.forEach(function() {ok(true)})
  })

  test('length', function() {
    equal(Rules.length, 14)
    equal(rules.length, 1)
  })

  test('perfect', function() {
    equal(Rules.perfect(), undefined)
    equal(rules.perfect()['Bolt Grade'], 'A325')
  })

  test('grade', function() {
    equal(Rules.grade('A325').length, 5)
  })

  test('type', function() {
    equal(Rules.type('3').length, 4)
  })

  test('finish', function() {
    equal(Rules.finish('Galvanized (Mechanical)').length, 2)
  })

  test('loosen', function() {
    equal(rules.anyGrade().length, 4)
  })

  test('allowsGrade', function() {
    ok(rules.allowsGrade('A325'))
    ok(Rules.allowsGrade('A490'))
    ok(!rules.allowsGrade('A490'))
  })

  test('allowsType', function() {
    ok(rules.allowsType('1'))
    ok(Rules.allowsType('3'))
    ok(!rules.allowsType('3'))
  })

  test('allowsFinish', function() {
    ok(rules.allowsFinish('Plain'))
    ok(Rules.allowsFinish('Plain'))
    ok(Rules.allowsFinish('Galvanized (Mechanical)'))
  })

  test('allowedGrades', function() {
    deepEqual(rules.allowedGrades(), ['A325'])
  })

  test('allowedTypes', function() {
    deepEqual(rules.allowedTypes(), ['1'])
  })

  test('allowedFinishes', function() {
    deepEqual(rules.allowedFinishes(), ['Plain'])
  })
})
