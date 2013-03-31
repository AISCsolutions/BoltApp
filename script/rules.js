define(['tables/grade_type_finish'], function(gtf) {
  "use strict";

  var project = function(objects, property) {
    return objects.map(function(x) {return x[property]})
  }

  var constrain = function(attr) {
    return function(value) {
      return this.clone(function() { this['_'+attr] = value })
    }
  }
  var loosen = constrain

  var allowed = function(field) {
    return function() {
      return project(this.set, field)
    }
  }

  var allows = function(field) {
    return function(value) {
      return project(this.set, field).indexOf(value) >= 0
    }
  }

  return {
    set: gtf,
    length: gtf.length,
    clone: function(init) {
      var rules = Object.create(this)
      if (init) {
        init.call(rules)
        rules.refresh()
      }
      return rules
    },
    bolt: function(bolt) {
      return this.clone(function() {
        this._grade = bolt.grade
        this._type = bolt.type
        this._finish = bolt.finish
      })
    },
    forEach: function(f) {
      for (var i in gtf) {
        if (this._grade && gtf[i]['Bolt Grade'] != this._grade) {continue}
        if (this._type && gtf[i]['Bolt Type'] != this._type) {continue}
        if (this._finish && gtf[i]['Bolt Finish'] != this._finish) {continue}
        f(gtf[i], i, gtf)
       }
    },
    refresh: function() {
      this.set = this.legal()
      this.length = this.set.length
    },
    legal: function() {
      var set = []
      this.forEach(function(item) {set.push(item)})
      return set
    },
    perfect: function() {
      if (this.set.length == 1) { return this.set[0] }
    },
    grade: constrain('grade'),
    type: constrain('type'),
    finish: constrain('finish'),
    anyGrade: loosen('grade'),
    anyType: loosen('type'),
    anyFinish: loosen('finish'),
    allowsGrade: allows('Bolt Grade'),
    allowsType: allows('Bolt Type'),
    allowsFinish: allows('Bolt Finish'),
    allowedGrades: allowed('Bolt Grade'),
    allowedTypes: allowed('Bolt Type'),
    allowedFinishes: allowed('Bolt Finish')
  }
})
