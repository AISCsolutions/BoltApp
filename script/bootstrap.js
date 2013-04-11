require.config({
  paths: {
    jquerymobile: 'lib/ext/jquery.mobile.custom',
    //jquerymobile: 'lib/ext/jquery.mobile-1.3.0',
    jquery: 'lib/ext/jquery'
  }
})
require(['boltapp', 'jquery', 'lib/ext/svgeezy', 'jquerymobile', 'lib/ext/es5-shim'], function(BoltApp, $, svgeezy) {
  "use strict";

  $(function() {
    BoltApp.ready()
    //BoltApp.dimensions.standardBoltDiagram.interactivePlace('Thread Length')
    svgeezy.init(false, 'png')
  })
})
