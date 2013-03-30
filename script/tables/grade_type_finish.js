define(['csv', 'text!../../data/grade-type-finish-table-2-1.csv'], function(csv, string) {
  "use strict"

  var parseCSV = function(table) {
    var records = []

    var headers = table[1]
    table.slice(2).forEach(function(row) {
      var gtf = {}
      row.forEach(function(d, i) {
        gtf[headers[i]] = d
      })
      records.push(gtf)
    })

    return records
  }

  return parseCSV(csv.parse(string))
})
