define(['tables/manufacturers'], function(manufacturers) {
  mfgs = {}
  manufacturers.forEach(function(mfg) {
    mfgs[mfg.bolt] = mfg
  })

  return mfgs
})
