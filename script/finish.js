define([], function() {
  return {
    finishColors: {
      'Plain': 'plain',
      'Galvanized': 'galvanized',
      'Zn/Al': 'zn-al',
      'Weathering': 'weathering'
    },
    colorForFinish: function(finish) {
      for (var string in this.finishColors) {
        if (finish.match(string)) {
          return this.finishColors[string]
        }
      }
      return this.finishColors.Plain
    },
    colorFor: function(bolt) {
      if (bolt.type == '3' && bolt.finish.match('Plain')) {
        return this.finishColors.Weathering
      } else {
        return this.colorForFinish(bolt.finish)
      }
    }
  }
})
