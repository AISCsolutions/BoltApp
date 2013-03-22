define(['csv'], function(csv) {
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

  var parse = function(data) {
    return fixup(parseCSV(data))
  }

  return {
    parse: parse,
    load: function(callback) {
      csv.load('data/grade-type-finish-table-2-1.csv', function(data) {
        callback(parse(data))
      })
    }
  }
})
