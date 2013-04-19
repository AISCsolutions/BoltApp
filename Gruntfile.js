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
        src: [
          "style/global.css",
          "style/bolt-id.css",
          "style/nuts-and-washers.css",
          "style/manufacturers.css",
          "style/grade.css",
          "style/finish.css",
          "style/zoom.css"
        ],
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
        newcap: false, // constructor syntax

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
    htmlcompressor: {
      target: {
        files: {
          '../build/index.html': './index.html',
        },
        options: {
          type: 'html',
          preserveServerScript: true
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
            src: ['images/**/*.png', 'images/**/*.jpeg'],
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
            src: ['.htaccess', 'data/**', 'style/images/**', 'style/fonts/**', 'images/**/*.svg'],
            dest: '../build/'
          },
        ]
      }
    },
    svgo: {
      target: {
        files: '../build/images/**/*.svg'
      }
    },
    manifest: {
      target: {
        options: {
          basePath: "./",
          verbose: false,
          timestamp: true
        },
        files: [
          {
            src: [
                "index.html",
                "style/style.css",
                "script/require.js",
                "style/fonts/**/*.*",
                "style/images/**/*.*",
                "images/**/*.*",
            ],
            dest: "../build/cache.manifest",
            filter: "isFile",
          }
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
  grunt.loadNpmTasks('grunt-htmlcompressor')
  grunt.loadNpmTasks('grunt-contrib-clean')
  grunt.loadNpmTasks('grunt-contrib-imagemin')
  grunt.loadNpmTasks('svgo-grunt')
  grunt.loadNpmTasks('grunt-contrib-copy')
  grunt.loadNpmTasks('grunt-manifest')

  grunt.registerTask('default', ['csslint', 'jshint:default'])
  grunt.registerTask('live', ['livereload-start', 'connect:livereload', 'regarde:livereload'])
  grunt.registerTask('build', ['imagemin', 'requirejs', 'cssjoin', 'cssmin', 'htmlcompressor', 'copy', 'svgo', 'manifest'])
  grunt.registerTask('rebuild-images', ['clean:images', 'imagemin'])
};
