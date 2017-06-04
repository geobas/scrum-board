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
			},
			heroku: {
				files: {
					'index.html': 'src/board.htm',
				}
			}
		},

		concurrent: {
			dev: {
				tasks: ['nodemon', 'watch'],
				options: {
					logConcurrentOutput: true
				}
			}
		},

		nodemon: {
			dev: {
				script: 'index.js',
				options: {
					env: {
						PORT: '3001'
					},

					// omit this property if you aren't serving HTML files and
					// don't want to open a browser tab on start
					callback: function (nodemon) {
						nodemon.on('log', function (event) {
							console.log(event.colour);
						});

						// opens browser on initial server start
						nodemon.on('config:update', function () {
							// Delay before server listens on port
							setTimeout(function() {
								require('open')('http://localhost:3001', 'firefox');
							}, 1000);
						});

						// refreshes browser when server reboots
						nodemon.on('restart', function () {
							// Delay before server listens on port
							setTimeout(function() {
								require('fs').writeFileSync('.rebooted', 'rebooted');
							}, 7000);
						});
					}
				}
			}
		},

		watch: {
			express: {
				files: ['index.js', 'models/*.js', 'src/*.js', '.rebooted'],
				tasks: ['browserify']
			},
			options: {
				livereload: true
			}
		}

	});

	grunt.loadNpmTasks('grunt-browserify');
	grunt.loadNpmTasks('grunt-contrib-watch');
	grunt.loadNpmTasks('grunt-targethtml');
	grunt.loadNpmTasks('grunt-available-tasks');
	grunt.loadNpmTasks('grunt-concurrent');
	grunt.loadNpmTasks('grunt-contrib-nodemon');

	grunt.registerTask('build:dev', ['browserify', 'targethtml:dev']);
	grunt.registerTask('build:prod', ['browserify', 'targethtml:prod']);
	grunt.registerTask('heroku', ['browserify', 'targethtml:heroku']);
	grunt.registerTask('list', ['availabletasks']);
	grunt.registerTask('default', ['concurrent:dev']);
};