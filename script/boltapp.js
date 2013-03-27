define([
  'jquery',
  'appstate',
  'rules',
  'shared_ui',
  'bolt_id',
  'dimensions',
  'nuts_and_washers',
  'grade',
  'finish',
  'manufacturers',
  'es5-shim',
  'jquery.mobile-1.3.0'
], function(
  $,
  appstate,
  rules,
  ui,
  BoltId,
  Dimensions,
  NutsAndWashers,
  Grade,
  Finish,
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

      var nw = NutsAndWashers.clone('#nuts-and-washers', rules)
      $('#nuts-and-washers').on('pagebeforeshow', nw.wire.bind(nw))

      $('#grade').on('pagebeforeshow', Grade.wire.bind(Grade))

      var finish = Finish.clone(rules)
      $('#finish').on('pagebeforeshow', finish.wire.bind(finish))

      $('#manufacturer').on('pagebeforeshow', Manufacturers.wire.bind(Manufacturers))

      $.mobile.activePage.trigger('pagebeforeshow').trigger('pageshow') // sometimes it beats us
    }
  }
})
