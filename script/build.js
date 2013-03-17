({
  appDir: "../",
  baseUrl: "script",
  dir: "../../build",

  paths: {
    'jquery': 'jquery',
    'jquerymobile': 'jquery.mobile-1.3.0'
  },

  modules: [
    {
      name: "bootstrap",
      exclude: ["jquery"]
    }
  ]
})
