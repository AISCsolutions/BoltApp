require.config({
  paths: {
    "jquery": "jquery",
    "jquerymobile": "jquery.mobile-1.3.0",
  },
});

require(['boltapp', 'jquery', 'jquerymobile'], function(BoltApp, $) {
  $(function() {
    BoltApp.ready()
    //BoltApp.washerDiagram.interactivePlace('Inside Diameter')
  })
})
