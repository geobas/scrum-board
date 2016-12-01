module.exports = function(grunt) {
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),

        availabletasks: {
            tasks: {
                options: {
                    showTasks: ['user']
                }
            }
        },

        browserify: {
            options: {
                transform: [ ["babelify", { presets: ["es2015", "react"] }] ]
            },
            dist: {
                files: {
                    "build/app.built.js": "src/App.js",
                }
            }
        },

        watch: {
            react: {
                files: 'src/*.js',
                tasks: ['browserify']
            },
            options: {
                livereload: true
            }
        },

        targethtml: {
            dev: {
                files: {
                    'board_dev.htm': 'src/board.htm',
                }
            },
            prod: {
                files: {
                    'board.htm': 'src/board.htm',
                }
            }
        },

        browserSync: {
            default_options: {
                bsFiles: {
                    src: [
                        "build/app.built.js"
                    ]
                },
                options: {
                    open: true,
                    port: 3000,
                    browser: [
                            "/usr/bin/firefox",
                    ],
                    watchTask: true,
                    proxy: "localhost/react_sandbox/board_dev.htm"
                }
            }
        }

    });

    grunt.loadNpmTasks('grunt-browserify');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-targethtml');
    grunt.loadNpmTasks('grunt-browser-sync');
    grunt.loadNpmTasks('grunt-available-tasks');

    grunt.registerTask('build:dev', ['browserify', 'targethtml:dev']);
    grunt.registerTask('build:prod', ['browserify', 'targethtml:prod']);
    grunt.registerTask('default', ['browserSync', 'watch']);
};