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
        }

    });

    grunt.loadNpmTasks('grunt-browserify');
    grunt.loadNpmTasks('grunt-contrib-watch');

    grunt.registerTask('build', ['browserify']);
    grunt.registerTask('default', ['watch']);
};