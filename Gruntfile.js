module.exports = function(grunt) {

  grunt.initConfig({
    csslint: {
      target: {
        src: "style/boltapp.css",
        rules: {
          "import": false,
        }
      }
    },
    cssjoin: {
      target: {
        files: {
          src: 'style/style.css',
          dest: '../built/joined.css'
        }
      }
    },
    cssmin: {
      target: {
        src: '../built/joined.css',
        dest: '../built/style.css'
      }
    }
  });

  grunt.loadNpmTasks('grunt-css')
  grunt.loadNpmTasks('grunt-cssjoin')

  grunt.registerTask('default', ['csslint'])
  grunt.registerTask('build', ['cssjoin', 'cssmin'])
};
