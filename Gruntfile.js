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
    },
    htmlmin: {
      target: {
        options: {
          removeComments: true,
          collapseWhitespace: true
        },
        files: {
          '../built/index.html': './index.html',
        }
      }
    },
    clean: {
      options: {
        force: true
      },
      images: ['../built/images'],
    },
    imagemin: {
      target: {
        options: {
          optimizationLevel: 3
        },
        files: [
          {
            expand: true,
            src: ['images/**/*'],
            filter: 'isFile',
            dest: '../built/'
          }
        ]
      }
    }
  });

  grunt.loadNpmTasks('grunt-cssjoin')
  grunt.loadNpmTasks('grunt-css')
  grunt.loadNpmTasks('grunt-contrib-htmlmin')
  grunt.loadNpmTasks('grunt-contrib-clean')
  grunt.loadNpmTasks('grunt-contrib-imagemin')

  grunt.registerTask('default', ['csslint'])
  grunt.registerTask('build', ['cssjoin', 'cssmin', 'htmlmin'])
  grunt.registerTask('rebuild-images', ['clean:images', 'imagemin'])
};
