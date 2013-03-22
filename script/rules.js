define(['grade_type_finish', 'appstate'], function(gradeTypeFinish, appstate) {
  var gtf = []

  var project = function(objects, property) {
    return objects.map(function(x) {return x[property]})
  }

  return {
    load: function(callback) {
      gradeTypeFinish.load(function(data) {
        gtf = data
        callback(data)
      })
    },
    gradeTypeFinish: function() {
      var bolt = appstate.data.bolt
      for (var i in gtf) {
        if (gtf[i]['ASTM Desig.'] == bolt.grade
         && gtf[i]['Bolt Type'] == bolt.type
         && gtf[i]['Bolt Finish'] == bolt.finish) {
           return gtf[i]
         }
       }

       console.log("Bolt grade/type/finish combination not found " + bolt.grade + " " + bolt.type + " " + bolt.finish)
    },
    gradeType: function() {
      var bolt = appstate.data.bolt
      var current = []
      for (var i in gtf) {
        if (gtf[i]['ASTM Desig.'] == bolt.grade
         && gtf[i]['Bolt Type'] == bolt.type) {
           current.push(gtf[i])
         }
       }
       return current
    },
    gradeFinish: function() {
      var bolt = appstate.data.bolt
      var current = []
      for (var i in gtf) {
        if (gtf[i]['ASTM Desig.'] == bolt.grade
         && gtf[i]['Bolt Finish'] == bolt.finish) {
           current.push(gtf[i])
         }
       }
       return current
    },
    typeFinish: function() {
      var bolt = appstate.data.bolt
      var current = []
      for (var i in gtf) {
        if (gtf[i]['Bolt Type'] == bolt.type
         && gtf[i]['Bolt Finish'] == bolt.finish) {
           current.push(gtf[i])
         }
       }
       return current
    },
    isGradeLegal: function(grade) {
      return project(this.typeFinish(), 'ASTM Desig.').indexOf(grade) >= 0
    },
    isTypeLegal: function(type) {
      return project(this.gradeFinish(), 'Bolt Type').indexOf(type) >= 0
    },
    isFinishLegal: function(finish) {
      return project(this.gradeType(), 'Bolt Finish').indexOf(finish) >= 0
    }
  }
})
