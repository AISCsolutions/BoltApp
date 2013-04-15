define([
  'jquery',
  'jquerymobile',
  'appstate',
  'rules',
  'controls/body',
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
  mobile,
  appstate,
  Rules,
  Body,
  BoltId,
  Dimensions,
  NutsAndWashers,
  Grades,
  Finishes,
  Manufacturers
) {
  "use strict";

  appstate.load()

  var body = new Body('body', {bolt: appstate.get('bolt')})
  var dimensions = new Dimensions('#dimensions', {appstate: appstate, body: body})

  return {
    dimensions: dimensions,
    ready: function() {
      body.show()

      var boltid = new BoltId('#bolt-id')
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

      if (mobile.activePage) { // sometimes it beats us
        mobile.activePage.trigger('pagebeforeshow').trigger('pageshow')
      }
    }
  }
})
