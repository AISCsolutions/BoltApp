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
          out: '../build/script/require.js',
        }
      }
    },
    csslint: {
      target: {
        src: "style/boltapp.css",
        rules: {
          "import": false,
          "adjoining-classes": false,
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
        dest: '../build/style/style.css'
      }
    },
    htmlmin: {
      target: {
        options: {
          removeComments: true,
          collapseWhitespace: true
        },
        files: {
          '../build/index.html': './index.html',
        }
      }
    },
    clean: {
      options: {
        force: true
      },
      images: ['../build/images'],
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
            dest: '../build/'
          }
        ]
      }
    },
    copy: {
      target: {
        files: [
          {
            src: ['data/**', 'style/images/**'],
            dest: '../build/'
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
  grunt.registerTask('build', ['imagemin', 'requirejs', 'cssjoin', 'cssmin', 'htmlmin', 'copy'])
  grunt.registerTask('rebuild-images', ['clean:images', 'imagemin'])
};
