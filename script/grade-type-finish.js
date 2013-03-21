define(['csv'], function(csv) {
  var parse = function(table) {
    var records = []

    var headers = table[1]
    table.slice(2).forEach(function(row) {
      var gtv = {}
      row.forEach(function(d, i) {
        gtv[headers[i]] = d
      })
      records.push(gtv)
    })

    console.log(records)
    return records
  }

  return {
    parse: parse,
    load: function(callback) {
      csv.load('data/grade-type-finish.csv', function(data) {
        callback(parse(data))
      })
    }
  }
})
