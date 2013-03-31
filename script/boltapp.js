define([
  'jquery',
  'appstate',
  'rules',
  'controls/shared_ui',
  'pages/bolt_id',
  'pages/dimensions',
  'pages/nuts_and_washers',
  'pages/grades',
  'pages/finishes',
  'pages/manufacturers',
  'lib/ext/es5-shim',
  'jquerymobile'
], function(
  $,
  appstate,
  Rules,
  ui,
  BoltId,
  Dimensions,
  NutsAndWashers,
  Grades,
  Finishes,
  Manufacturers
) {
  "use strict";

  appstate.load()

  return {
    dimensions: Dimensions,
    ready: function() {
      if (! $.support.fixedPosition) { ui.softwareScroll() }

      $('#bolt-id').on('pagebeforeshow', BoltId.wire.bind(BoltId))

      Dimensions.wire()
      $('#dimensions').on('pagebeforeshow', Dimensions.show.bind(Dimensions))
      $('#dimensions').on('pageshow', Dimensions.show.bind(Dimensions))
      $(window).on('resize', Dimensions.show.bind(Dimensions))

      var nw = NutsAndWashers.clone('#nuts-and-washers', appstate, Rules)
      $('#nuts-and-washers').on('pagebeforeshow', nw.wire.bind(nw))
      $('#nuts-and-washers').on('pageshow', function() {ui.finishChanged(appstate.data.bolt)})

      $('#grade').on('pagebeforeshow', Grades.wire.bind(Grades))

      var finishes = Finishes.clone(Rules)
      $('#finish').on('pagebeforeshow', finishes.wire.bind(finishes))

      $('#manufacturer').on('pagebeforeshow', Manufacturers.wire.bind(Manufacturers))

      if ($.mobile.activePage) { // sometimes it beats us
        $.mobile.activePage.trigger('pagebeforeshow').trigger('pageshow')
      }
    }
  }
})
