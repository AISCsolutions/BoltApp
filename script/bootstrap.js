require.config({paths: {jquery: 'lib/jquery'}})
require(['boltapp', 'jquery', 'lib/jquery.mobile-1.3.0', 'lib/es5-shim'], function(BoltApp, $) {
  "use strict"

  $(function() {
    BoltApp.ready()
    //BoltApp.dimensions.washerDiagram.interactivePlace('Taper In Thickness')
  })
})
