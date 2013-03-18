define(['store'], function(Store) {
  var defaultState = {
    bolt: {
      grade: 'A325',
      type: 'Type 1',
      finish: 'Plain',
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

  var store = Store('boltapp.state')

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
    data: defaultState
  }
})
