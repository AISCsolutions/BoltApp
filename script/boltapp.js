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
  'manufacturer',
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
  Manufacturer
) {
  "use strict"

  appstate.load()

  return {
    dimensions: Dimensions,
    ready: function() {
      if (! $.support.fixedPosition) { ui.softwareScroll() }

      $('#bolt-id').on('pagebeforeshow', BoltId.wire.bind(BoltId))

      Dimensions.wire()
      $('#dimensions').on('pagebeforeshow', Dimensions.wire.bind(Dimensions))

      var nw = NutsAndWashers.clone('#nuts-and-washers', rules)
      $('#nuts-and-washers').on('pagebeforeshow', nw.wire.bind(nw))
      var resizeNW = ui.setContentHeight.bind(ui, '#nuts-and-washers .split')
      $('#nuts-and-washers').on('pagebeforeshow', resizeNW)

      var nwl = NutsAndWashers.clone('#nuts-and-washers-list', rules)
      $('#nuts-and-washers-list').on('pagebeforeshow', nwl.wire.bind(nwl))

      $('#grade').on('pagebeforeshow', Grade.wire.bind(Grade))

      var finish = Finish.clone(rules)
      $('#finish').on('pagebeforeshow', finish.wire.bind(finish))

      $('#manufacturer').on('pagebeforeshow', Manufacturer.wire.bind(Manufacturer))

      $.mobile.activePage.trigger('pagebeforeshow').trigger('pageshow') // sometimes it beats us
    }
  }
})
