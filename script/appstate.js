define(['lib/store'], function(Store) {
  "use strict";

  var defaultState = {
    bolt: {
      grade: 'A325',
      type: '1',
      finish: 'Plain (uncoated)',
      manufacturer: {
        name: 'Unytite, Inc',
        location: 'Peru IL',
        website: 'http://www.unytiteusa.com/',
        bolt: 'images/bolts/mfg-unytite-a.png'
      },
      diameter: 1
    },
    diagram: 'bolt'
  }

  var diameterInches = {
    '0.5': '1/2',
    '0.625': '5/8',
    '0.75': '3/4',
    '0.875': '7/8',
    '1': '1',
    '1.125': '1 1/8',
    '1.25': '1 1/4',
    '1.375': '1 3/8',
    '1.5': '1 1/2'
  }

  var store = new Store('boltapp.state')

  return {
    load: function() {
      var state = store.load()

      if (typeof(state['bolt']) != 'undefined') {
        this.data = state
      }

      return this.data
    },
    save: function() {
      store.save(this.data)
    },
    diameterInches: diameterInches,
    diameterFraction: function() {
      return diameterInches[this.data.bolt.diameter.toString()]
    },
    data: defaultState
  }
})
