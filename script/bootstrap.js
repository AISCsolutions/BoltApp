require.config({
  paths: {
    jquery: 'lib/jquery',
    jquerymobile: 'lib/jquery.mobile.custom',
    //jquerymobile: 'lib/jquery.mobile-1.3.0',
  }
})
require(['boltapp', 'jquery', 'jquerymobile', 'lib/es5-shim'], function(BoltApp, $) {
  "use strict"

  $(function() {
    BoltApp.ready()
    //BoltApp.dimensions.washerDiagram.interactivePlace('Taper In Thickness')
  })
})
