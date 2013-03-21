define(['csv'], function(csv) {
  var parseMeasurements = function(table) {
    var dims = []
    var kind = ''
    var property = ''

    table.forEach(function(row) {
      if (row[0] != '') {
        kind = row[0]
      }

      property = row[1]

      row.slice(3).forEach(function(d, i) {
        if (!dims[i]) {
          dims[i] = {}
        }
        if (!dims[i][kind]) {
          dims[i][kind] = {}
        }
        dims[i][kind][property] = d
      })
    })

    return dims
  }

  return {
    parse: parseMeasurements,
    load: function(callback) {
      csv.load('data/measurements.csv', function(data) {
        callback(parseMeasurments(data))
      })
    }
  }
})
