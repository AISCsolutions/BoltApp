define([], function() {
  return {
    finishColors: {
      'Plain': '#888',
      'Galvanized': '#aaa',
      'Zn/Al': '#aaf',
      'Weathering': '#c75'
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
      if (bolt.type == '3') {
        return this.finishColors.Weathering
      } else {
        return this.colorForFinish(bolt.finish)
      }
    }
  }
})
