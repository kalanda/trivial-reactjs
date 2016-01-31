'use strict';

module.exports = function(grunt) {

    // Show elapsed time after tasks run
    //require('time-grunt')(grunt);

    // Load all Grunt tasks
    require('jit-grunt')(grunt);

    // Config for tasks
    grunt.initConfig({

        pkg: grunt.file.readJSON('package.json'),

        app: {
            source: 'src',
            dist: 'dist',
            baseurl: ''
        },

        watch: {
            html: {
              options: { livereload: true },
                files: ['<%= app.source %>/**/*.html'],
            },
            js: {
                options: { livereload: true },
                files: ['<%= app.source %>/assets/jsx/**/*.{jsx,js}'],
                tasks: ['browserify:server']
            },
            sass: {
                options: { livereload: true },
                files: ['<%= app.source %>/assets/scss/**/*.{scss,sass}'],
                tasks: ['sass:server', 'autoprefixer:server']
            },
            images: {
                options: { livereload: true },
                files: ['<%= app.source %>/assets/images/**/*.{gif,jpg,jpeg,png,svg,webp}'],
                tasks: ['copy:server_images']
            },
        },

        browserify: {
          server: {
            options: {
              browserifyOptions: {
                debug: true,
                extensions: ['.jsx','.js']
              },
              transform: [['babelify', {
                plugins: ['transform-react-jsx'],
                presets: ['es2015', 'react']
              }]]
            },
            files: {
              '.tmp/<%= app.baseurl %>/assets/js/build.js': '<%= app.source %>/assets/jsx/app.jsx'
            }
          },
          dist: {
            options: {
              browserifyOptions: {
                debug: false,
                extensions: ['.jsx','.js']
              },
              transform: [
                ['babelify', {
                  plugins: ['transform-react-jsx'],
                  presets: ['es2015', 'react']
                }]
              ]
            },
            files: {
              '<%= app.dist %>/assets/js/build.js': '<%= app.source %>/assets/jsx/app.jsx'
            }
          },
        },

        clean: {
            server: [
              '.tmp'
            ],
            dist: {
              files: [{
                  dot: true,
                  src: [
                      '.tmp',
                      '<%= app.dist %>/*',
                      '!<%= app.dist %>/.git*'
                  ]
              }]
            }
        },

        copy: {
            dist_html: {
                expand: true,
                cwd: '<%= app.source %>',
                src: ['*.html'],
                dest: '<%= app.dist %>/<%= app.baseurl %>'
            },
            dist_images: {
                expand: true,
                cwd: '<%= app.source %>',
                src: ['assets/images/**'],
                dest: '<%= app.dist %>/<%= app.baseurl %>'
            }
        },

        sass: {
            options: {
            },
            server: {
                options: {
                  outputStyle: 'expanded',
                  lineNumbers : true,
                  sourcemap: 'none',
                  sourceComments: true,
                },
                files: [{
                    expand: true,
                    cwd: '<%= app.source %>/assets/scss',
                    src: '**/*.{scss,sass}',
                    dest: '.tmp/<%= app.baseurl %>/assets/css',
                    ext: '.css'
                }]
            },
            dist: {
                options: {
                    outputStyle: 'compressed'
                },
                files: [{
                    expand: true,
                    cwd: '<%= app.source %>/assets/scss',
                    src: '**/*.{scss,sass}',
                    dest: '<%= app.dist %>/<%= app.baseurl %>/assets/css',
                    ext: '.css'
                }]
            }
        },

        autoprefixer: {
            options: {
                browsers : ['> 5%', 'last 2 version', 'ie 8', 'ie 9']
            },
            server: {
                files: [{
                    expand: true,
                    cwd: '.tmp/<%= app.baseurl %>/assets/css',
                    src: '**/*.css',
                    dest: '.tmp/<%= app.baseurl %>/assets/css'
                }]
            },
            dist: {
                files: [{
                    expand: true,
                    cwd: '<%= app.dist %>/<%= app.baseurl %>/assets/css',
                    src: '**/*.css',
                    dest: '<%= app.dist %>/<%= app.baseurl %>/assets/css'
                }]
            }
        },

        connect: {
            options: {
                port: 9000,
                livereload: 35729,
                hostname: '0.0.0.0',
            },
            livereload: {
                options: {
                    base: [
                        '.tmp',
                        '<%= app.source %>'
                    ]
                }
            },
            dist: {
                options: {
                    open: {
                        target: 'http://localhost:9000/<%= app.baseurl %>'
                    },
                    base: [
                        '<%= app.dist %>',
                        '.tmp'
                    ]
                }
            }
        },

        imagemin: {
            options: {
                progressive: true
            },
            dist: {
                files: [{
                    expand: true,
                    cwd: '<%= app.dist %>/<%= app.baseurl %>/assets/images',
                    src: '**/*.{jpg,jpeg,png,gif}',
                    dest: '<%= app.dist %>/<%= app.baseurl %>/assets/images'
                }]
            }
        },

        svgmin: {
            dist: {
                options: {
                  plugins: [
                      { removeViewBox: false },               // don't remove the viewbox atribute from the SVG
                      { removeUselessStrokeAndFill: false },  // don't remove Useless Strokes and Fills
                      { removeEmptyAttrs: false }             // don't remove Empty Attributes from the SVG
                  ]
                },
                files: [{
                    expand: true,
                    cwd: '<%= app.dist %>/<%= app.baseurl %>/assets/images',
                    src: '**/*.svg',
                    dest: '<%= app.dist %>/<%= app.baseurl %>/assets/images'
                }]
            }
        },

        jshint: {
            options: {
                reporter: require('jshint-stylish'),
                strict: false,
                es3: true,
                curly: false,
                eqeqeq: false,

                // RELAX
                // asi: true,
                // lastsemic: true,
                // eqnull: true,
                // globalstrict: true,
                // evil: true,
                browser: true,
                jquery: true
            },
            target: [
                '<%= app.source %>/assets/js/*.js',
                '!<%= app.source %>/assets/js/vendor/*.js' // exclude vendors
            ]
        },

        /*buildcontrol: {
            dist: {
                options: {
                    dir: '<%= app.dist %>/<%= app.baseurl %>',
                    remote: 'git@github.com:user/repo.git',
                    branch: 'gh-pages',
                    commit: true,
                    push: true,
                    connectCommits: false
                }
            }
        },*/
    });

    // Define Tasks
    grunt.registerTask('server', [
        'clean:server',
        'sass:server',
        'autoprefixer:server',
        'browserify:server',
        'connect:livereload',
        'watch'
    ]);

    grunt.registerTask('build', [
        'clean:dist',
        'copy:dist_html',
        'copy:dist_images',
        //'imagemin:dist',
        //'svgmin',
        'sass:dist',
        'autoprefixer:dist',
        'browserify:dist'
    ]);

    /*grunt.registerTask('deploy', [
        'build',
        'buildcontrol'
    ]);*/

    grunt.registerTask('default', [
        'server'
    ]);
};
