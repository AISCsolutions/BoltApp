require.config({
  paths: {
    jquerymobile: 'lib/ext/jquery.mobile.custom',
    //jquerymobile: 'lib/ext/jquery.mobile-1.3.0',
    jquery: 'lib/ext/jquery',
    can: 'lib/ext/can'
  }
})
require(['boltapp', 'jquery', 'jquerymobile', 'lib/ext/es5-shim'], function(BoltApp, $) {
  "use strict";

  $(function() {
    BoltApp.ready()
    //BoltApp.dimensions.standardBoltDiagram.interactivePlace('Thread Length')
  })
})
