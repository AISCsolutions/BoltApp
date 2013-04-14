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

  var dimensions = new Dimensions

  return {
    dimensions: dimensions,
    ready: function() {
      //if (! $.support.fixedPosition) { ui.softwareScroll() }

      ui.setup(appstate.data.bolt)

      var boltid = new BoltId()
      boltid.wire()
      $('#bolt-id').on('pagebeforeshow', boltid.show.bind(boltid))

      dimensions.wire()
      $('#dimensions').on('pageshow', dimensions.show.bind(dimensions))
      $(window).on('resize', dimensions.show.bind(dimensions))

      var nw = new NutsAndWashers().init('#nuts-and-washers', {appstate: appstate, rules: Rules})
      nw.wire()
      $('#nuts-and-washers').on('pagebeforeshow', nw.show.bind(nw))
      $('#nuts-and-washers').on('pageshow', function() {ui.finishChanged(appstate.data.bolt)})

      var grades = new Grades().init('#grade [data-role="content"]')
      grades.wire()
      $('#grade').on('pagebeforeshow', grades.show.bind(grades))

      var finishes = new Finishes().init('#finish [data-role="content"]', {rules: Rules})
      finishes.wire()
      $('#finish').on('pagebeforeshow', finishes.show.bind(finishes))

      var manufacturers = new Manufacturers().init('#manufacturer').wire()

      if ($.mobile.activePage) { // sometimes it beats us
        $.mobile.activePage.trigger('pagebeforeshow').trigger('pageshow')
      }
    }
  }
})
