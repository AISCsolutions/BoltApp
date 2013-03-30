define(['grade_type_finish'], function(gtf) {
  "use strict"

  var project = function(objects, property) {
    return objects.map(function(x) {return x[property]})
  }

  var filters = [
    'Bolt Grade',
    'Bolt Type',
    'Bolt Finish'
  ]

  var constrain = function(attr) {
    return function(value) {
      var rules = this.clone()
      rules['_'+attr] = value
      return rules
    }
  }
  var loosen = constrain

  var allows = function(field) {
    return function(value) {
      return project(this.legal(), field).indexOf(value) >= 0
    }
  }

  return {
    clone: function() {
      return Object.create(this)
    },
    bolt: function(bolt) {
      var rules = this.clone()
      rules._grade = bolt.grade
      rules._type = bolt.type
      rules._finish = bolt.finish
      return rules
    },
    forEach: function(f) {
      for (var i in gtf) {
        if (this._grade && gtf[i]['Bolt Grade'] != this._grade) {continue}
        if (this._type && gtf[i]['Bolt Type'] != this._type) {continue}
        if (this._finish && gtf[i]['Bolt Finish'] != this._finish) {continue}
        f(gtf[i], i, gtf)
       }
    },
    legal: function() {
      var set = []
      this.forEach(function(item) {set.push(item)})
      return set
    },
    perfect: function() {
      var legal = this.legal()
      if (legal.length == 1) { return legal[0] }
    },
    grade: constrain('grade'),
    type: constrain('type'),
    finish: constrain('finish'),
    anyGrade: loosen('grade'),
    anyType: loosen('type'),
    anyFinish: loosen('finish'),
    allowsGrade: allows('Bolt Grade'),
    allowsType: allows('Bolt Type'),
    allowsFinish: allows('Bolt Finish')
  }
})
