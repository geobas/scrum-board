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
			express: {
				files: ['index.js', 'models/*.js', 'src/*.js'],
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
			},
			heroku: {
				files: {
					'index.html': 'src/board.htm',
				}
			}
		},

		express: {
			options: {
				port: 3001,
			},
			dev: {
				options: {
					script: 'index.js'
				}
			},
			prod: {
				options: {
					script: 'path/to/prod/server.js',
					node_env: 'production'
				}
			},
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
					port: 3001,
					browser: [
							"/usr/bin/firefox",
					],
					watchTask: true,
					proxy: "http://localhost:3001/react_sandbox/board_dev.htm"
				}
			}
		}

	});

	grunt.loadNpmTasks('grunt-browserify');
	grunt.loadNpmTasks('grunt-contrib-watch');
	grunt.loadNpmTasks('grunt-targethtml');
	grunt.loadNpmTasks('grunt-browser-sync');
	grunt.loadNpmTasks('grunt-available-tasks');
	grunt.loadNpmTasks('grunt-express-server');

	grunt.registerTask('build:dev', ['browserify', 'targethtml:dev']);
	grunt.registerTask('build:prod', ['browserify', 'targethtml:prod']);
	grunt.registerTask('heroku', ['browserify', 'targethtml:heroku']);
	grunt.registerTask('list', ['availabletasks']);
	grunt.registerTask('default', ['express:dev', 'watch']);
};