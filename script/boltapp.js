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
  'manufacturer'
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
      ui.setup(appstate.data)
      $(window).on('pagebeforeshow', function() {ui.gradeChanged(appstate.data.bolt.grade)})

      BoltId.wire()
      $('#bolt-id').on('pagebeforeshow', BoltId.wire.bind(BoltId))

      Dimensions.wire()
      $('#dimensions').on('pageshow', Dimensions.wire.bind(Dimensions))

      var nw = NutsAndWashers.clone('#nuts-and-washers', rules)
      var setupNutsAndWashers = nw.wire.bind(nw)
      $('#nuts-and-washers').on('pagebeforeshow', setupNutsAndWashers)
      $('#nuts-and-washers').on('pageshow', setupNutsAndWashers)
      var resizeNW = ui.setContentHeight.bind(ui, '#nuts-and-washers .split')
      $('#nuts-and-washers').on('pageshow', resizeNW)
      $(window).on('navigate', resizeNW)

      var nwl = NutsAndWashers.clone('#nuts-and-washers-list', rules)
      var setupNutsAndWashersList = nwl.wire.bind(nwl)
      $('#nuts-and-washers-list').on('pagebeforeshow', setupNutsAndWashersList)
      $('#nuts-and-washers-list').on('pageshow', setupNutsAndWashersList)

      $('#grade').on('pagebeforeshow', Grade.wire.bind(Grade))

      var finish = Finish.clone(rules)
      $('#finish').on('pageshow', finish.wire.bind(finish))

      $('#manufacturer').on('pagebeforeshow', Manufacturer.wire.bind(Manufacturer))
    }
  }
})
