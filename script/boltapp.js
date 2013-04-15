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
      ui.setup(appstate.data.bolt)

      var boltid = new BoltId()
      $('#bolt-id').on('pagebeforeshow', boltid.show.bind(boltid))

      $('#dimensions').on('pageshow', dimensions.show.bind(dimensions))
      $(window).on('resize', dimensions.show.bind(dimensions))

      var nw = new NutsAndWashers('#nuts-and-washers', {appstate: appstate, rules: Rules})
      $('#nuts-and-washers').on('pagebeforeshow', nw.show.bind(nw))

      var grades = new Grades('#grade [data-role="content"]')
      $('#grade').on('pagebeforeshow', grades.show.bind(grades))

      var finishes = new Finishes('#finish [data-role="content"]', {rules: Rules})
      $('#finish').on('pagebeforeshow', finishes.show.bind(finishes))

      var manufacturers = new Manufacturers('#manufacturer')

      if ($.mobile.activePage) { // sometimes it beats us
        $.mobile.activePage.trigger('pagebeforeshow').trigger('pageshow')
      }
    }
  }
})
