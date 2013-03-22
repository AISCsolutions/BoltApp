define(['csv', 'text!../data/grade-type-finish-table-2-1.csv'], function(csv, string) {
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

  var fixup = function(records) {
    records.forEach(function(gtf) {
      var pair
      pair = gtf['Bolt Finish'].split(', ')
      gtf["Bolt Finish"] = pair[0]
      gtf["Bolt Finish Note"] = pair[1]

      pair = gtf['Nut Finish'].split(', ')
      gtf["Nut Finish"] = pair[0]
      gtf["Nut Finish Note"] = pair[1]

      pair = gtf['Washer Finish'].split(', ')
      gtf["Washer Finish"] = pair[0]
      gtf["Washer Finish Note"] = pair[1]
    })
    return records
  }

  return fixup(parseCSV(csv.parse(string)))
})
