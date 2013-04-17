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

  return {
    ready: function() {
      this.body = new Body('body', {bolt: appstate.get('bolt')})
      this.boltid = new BoltId('#bolt-id', {appstate: appstate})
      this.dimensions = new Dimensions('#dimensions', {appstate: appstate, body: this.body})
      this.nw = new NutsAndWashers('#nuts-and-washers', {bolt: appstate.get('bolt'), rules: Rules})
      this.grades = new Grades('#grade [data-role="content"]')
      this.finishes = new Finishes('#finish [data-role="content"]', {rules: Rules})
      this.manufacturers = new Manufacturers('#manufacturer')

      if (mobile.activePage) { // sometimes it beats us
        mobile.activePage.trigger('pagebeforeshow').trigger('pageshow')
      }
    }
  }
})
