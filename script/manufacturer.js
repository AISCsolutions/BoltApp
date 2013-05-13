define(['tables/manufacturers'], function(manufacturers) {
  "use strict";

  var mfgs = {}
  manufacturers.forEach(function(mfg) {
    mfgs[mfg.bolt] = mfg
  })

  return mfgs
})
