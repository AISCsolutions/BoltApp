define([
  'jquery',
  'appstate',
  'rules',
  'bolt_id',
  'dimensions',
  'nuts_and_washers',
  'grade',
  'finish',
  'manufacturer'
], function(
  $,
  appstate,
  rules,
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
      BoltId.wire()
      $('#bolt-id').on('pagebeforeshow', BoltId.wire.bind(BoltId))

      Dimensions.wire()
      $('#dimensions').on('pageshow', Dimensions.wire.bind(Dimensions))

      var nw = NutsAndWashers.clone(rules)
      var setupNutsAndWashers = nw.wire.bind(nw)
      $('#nuts-and-washers').on('pagebeforeshow', setupNutsAndWashers)
      $('#nuts-and-washers').on('pageshow', setupNutsAndWashers)
      $(window).on('navigate', nw.setContentHeight)

      $('#grade').on('pagebeforeshow', Grade.wire.bind(Grade))

      var finish = Finish.clone(rules)
      $('#finish').on('pageshow', finish.wire.bind(finish))

      $('#manufacturer').on('pagebeforeshow', Manufacturer.wire.bind(Manufacturer))
    }
  }
})
