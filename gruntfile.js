module.exports = function(grunt) {
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),

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
        }

    });

    grunt.loadNpmTasks('grunt-browserify');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-targethtml');

    grunt.registerTask('build:dev', ['browserify', 'targethtml:dev']);
    grunt.registerTask('build', ['browserify', 'targethtml:prod']);
    grunt.registerTask('default', ['watch']);
};