var csv = define(['jquery'], function($) {
  var parseCsv = function(contents) {
    var lines = contents.split("\n")
    var rows = lines.map(function(row) {
      return row.split(',').map(function(d) {return d.replace(/^"|"$/g, '')})
    })
    return rows
  }

  return {
    parse: parseCsv,
    load: function(path, callback) {
      var received = function(data) { callback(parseCsv(data)) }

      $.ajax({
        url: path,
        success: received,
        dataType: 'text'
      });
    }
  }
})
