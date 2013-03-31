'use strict';

var path = require('path');
var lrSnippet = require('grunt-contrib-livereload/lib/utils').livereloadSnippet;

var folderMount = function folderMount(connect, point) {
  return connect.static(path.resolve(point));
};

module.exports = function(grunt) {
  var jshint_files = ['script/**/*.js', '!script/lib/ext/**/*.js', '!script/require.js', '!script/text.js']

  grunt.initConfig({
    connect: {
      livereload: {
        options: {
          port: 9001,
          middleware: function(connect, options) {
            return [lrSnippet, folderMount(connect, options.base)]
          }
        }
      }
    },
    regarde: {
      livereload: {
        // css is given the wrong path (no style/)
        files: ['index.html', 'script/**/*.js', 'images/**'],
        tasks: ['livereload']
      },
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
    jshint: {
      options: {
        //enforce
        curly: true, // no unbraced if, while
        immed: true, // ambiguous syntax with immediatel-invoked fucntion
        undef: true,
        browser: true, // treat window, document, etc as defined
        devel: true, // treat console as defined
        globals: {
          require: false,
          define: false,
          iScroll: false
        },
        indent: 2,
        trailing: true, // whitespace

        //relax
        asi: true, // semicolons
        sub: true, // possible to use dot notation
        multistr: true, // multiling strings (have 1)
      },
      default: jshint_files,
      unused: {
        options: { unused: true, },
        src: jshint_files,
      },
      complexity: {
        options: { maxcomplexity: 3 },
        src: jshint_files,
      },
    },
    requirejs: {
      target: {
        options: {
          baseUrl: 'script',
          mainConfigFile: 'script/bootstrap.js',
          skipDirOptimize: true,
          stubModules: ['text'],

          name: 'lib/ext/almond',
          include: 'bootstrap',
          out: '../build/script/require.js',
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

  grunt.loadNpmTasks('grunt-regarde')
  grunt.loadNpmTasks('grunt-contrib-connect')
  grunt.loadNpmTasks('grunt-contrib-livereload')
  grunt.loadNpmTasks('grunt-contrib-jshint')
  grunt.loadNpmTasks('grunt-contrib-requirejs')
  grunt.loadNpmTasks('grunt-cssjoin')
  grunt.loadNpmTasks('grunt-css')
  grunt.loadNpmTasks('grunt-contrib-htmlmin')
  grunt.loadNpmTasks('grunt-contrib-clean')
  grunt.loadNpmTasks('grunt-contrib-imagemin')
  grunt.loadNpmTasks('grunt-contrib-copy')

  grunt.registerTask('default', ['csslint', 'jshint:default'])
  grunt.registerTask('live', ['livereload-start', 'connect:livereload', 'regarde:livereload'])
  grunt.registerTask('build', ['imagemin', 'requirejs', 'cssjoin', 'cssmin', 'htmlmin', 'copy'])
  grunt.registerTask('rebuild-images', ['clean:images', 'imagemin'])
};
