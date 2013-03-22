define(['jquery'], function($) {
  "use strict"

  // Schrotie http://schrotie.de/
  // https://purbayubudi.wordpress.com/2008/11/09/csv-parser-using-javascript/#comment-67
  var parseCsv = function(txt) {
    var rows = [];
    var value = "";
    var line = [];
    var mode = "std";
    for(var i = 0; i < txt.length; i++) {
      switch(mode) {
        case "std":
        switch(txt[i]) {
          case "'":
          case '"':
            mode = txt[i];
            continue;
          case ",":
           line.push(value);
           value = "";
           continue;
          case "\n":
          case "\r":
           line.push(value);
           value = "";
           rows.push(line);
           line = [];
           continue;
          default:
           value += txt[i];
           continue;
        }
        case "'":
        case '"':
          if(txt[i] == mode) {
            if(txt[i + 1] == txt[i]) {
              value += txt[i];
              i += 1;
              continue;
            }
            mode = "std";
            continue;
          }
          value += txt[i];
      }
    }
    if(i && value != '') {
      line.push(value);
      rows.push(line);
    }
    return rows;
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


