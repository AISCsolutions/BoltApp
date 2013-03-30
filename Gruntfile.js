module.exports = function(grunt) {

  grunt.initConfig({
    requirejs: {
      target: {
        options: {
          baseUrl: 'script',
          mainConfigFile: 'script/bootstrap.js',
          skipDirOptimize: true,
          stubModules: ['text'],

          name: 'lib/almond',
          include: 'bootstrap',
          out: '../built/script/require.js',
        }
      }
    },
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
        files: [
          {
            src: 'style/style.css',
            dest: '../built/joined.css'
          }
        ]
      }
    },
    cssmin: {
      target: {
        src: '../built/joined.css',
        dest: '../built/style/style.css'
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
    },
    copy: {
      target: {
        files: [
          {
            src: ['data/**'],
            dest: '../built/'
          },
        ]
      }
    }
  });

  grunt.loadNpmTasks('grunt-contrib-requirejs')
  grunt.loadNpmTasks('grunt-cssjoin')
  grunt.loadNpmTasks('grunt-css')
  grunt.loadNpmTasks('grunt-contrib-htmlmin')
  grunt.loadNpmTasks('grunt-contrib-clean')
  grunt.loadNpmTasks('grunt-contrib-imagemin')
  grunt.loadNpmTasks('grunt-contrib-copy')

  grunt.registerTask('default', ['csslint'])
  grunt.registerTask('build', ['requirejs', 'cssjoin', 'cssmin', 'htmlmin', 'imagemin', 'copy'])
  grunt.registerTask('rebuild-images', ['clean:images', 'imagemin'])
};
