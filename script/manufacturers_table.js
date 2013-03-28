define(['csv', 'text!../data/manufacturers.csv'], function(csv, string) {
  "use strict"

  var parseCSV = function(table) {
    var records = []

    var headers = table[0].map(function(heading) {return heading.toLowerCase()})
    table.slice(1).forEach(function(row) {
      var mfg = {}
      row.forEach(function(d, i) {
        mfg[headers[i]] = d
      })
      mfg.bolt = 'images/bolts/'+mfg.bolt+'.png'
      records.push(mfg)
    })

    return records
  }

  return parseCSV(csv.parse(string))
})
