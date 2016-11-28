module.exports = function(grunt) {
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),

        babel: {
            options: {
                sourceMap: false,
            },
            dist: {
                files: {
                    "src/Note_babel.js": "src/Note.js",
                    "src/Board_babel.js": "src/Board.js",
                    "src/App_babel.js": "src/App.js"
                }
            }
        },

        browserify: {
            options: {
                transform: [ ["babelify", { presets: ["es2015"] }] ]
            },
            dist: {
                files: {
                    "src/Note_browserified.js": "src/Note_babel.js",
                    "src/Board_browserified.js": "src/Board_babel.js",
                    "src/App_browserified.js": "src/App_babel.js"
                }
            }
        },

        watch: {
            react: {
                files: 'src/*.js',
                tasks: ['browserify']
            }
        }

    });

    grunt.loadNpmTasks('grunt-babel');
    grunt.loadNpmTasks('grunt-browserify');
    grunt.loadNpmTasks('grunt-contrib-watch');

    grunt.registerTask('build', ['babel', 'browserify']);
    grunt.registerTask('default', ['watch']);
};