define(['lib/store', 'can/observe'], function(Store, Observe) {
  "use strict";

  var defaultState = {
    bolt: {
      grade: 'A325',
      type: '1',
      finish: 'Plain',
      manufacturer: 'mfg-unytite-a',
      diameter: 1,
    },
    diagram: 'bolt',
    agreedToDisclaimer: false
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
        if (typeof(state['manufacturer']) != 'string') {
          state.manufacturer = defaultState.manufacturer
        }

        this.data.attr(state)
      }

      var appstate = this
      this.data.bind('change', function(){
        appstate.save()
      })

      return this.data
    },
    save: function() {
      store.save(this.data.attr())
    },
    get: function(prop) {
      return this.data.attr(prop)
    },
    set: function(prop, value) {
      this.data.attr(prop, value)
    },
    bind: function(prop, f) {
      this.data.bind(prop, f)
    },
    diameterInches: diameterInches,
    diameterFraction: function() {
      return diameterInches[this.data.bolt.diameter.toString()]
    },
    data: new Observe(defaultState)
  }
})
