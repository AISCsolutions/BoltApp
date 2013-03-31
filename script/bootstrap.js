require.config({
  paths: {
    jquery: 'lib/ext/jquery',
    jquerymobile: 'lib/ext/jquery.mobile.custom',
    //jquerymobile: 'lib/ext/jquery.mobile-1.3.0',
  }
})
require(['boltapp', 'jquery', 'jquerymobile', 'lib/ext/es5-shim'], function(BoltApp, $) {
  "use strict";

  $(function() {
    BoltApp.ready()
    //BoltApp.dimensions.washerDiagram.interactivePlace('Taper In Thickness')
  })
})
