define([
  'jquery',
  'appstate',
  'rules',
  'shared_ui',
  'bolt_id',
  'dimensions',
  'nuts_and_washers',
  'grades',
  'finishes',
  'manufacturers',
  'es5-shim',
  'jquery.mobile-1.3.0'
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
  "use strict"

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

      $.mobile.activePage.trigger('pagebeforeshow').trigger('pageshow') // sometimes it beats us
    }
  }
})
