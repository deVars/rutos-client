module.exports = function(grunt) {
	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),
		watch: {
			scripts: {
				files: ['js/**/*.js', 'js/*.js'],
				tasks: ['uglify'],
				options: {
					debounceDelay: 500,
					spawn: true
				}
			},
			html: {
				files: ['views/**/*.html', 'views/*.html'],
				tasks: ['htmlmin'],
				options: {
					debounceDelay: 500,
					spawn: true
				}
			},
			css: {
				files: ['css/**/*.css', 'css/*.css'],
				tasks: ['cssmin'],
				options: {
					debounceDelay: 500,
					spawn: true
				}
			},
		},
		htmlmin: {
			options: {
				removeComments: true
			},
			file: {
				options: {
					collapseWhitespace: true,
				},
				files: {
					'release/views/': ['views/**/*.html'],
					// dest: 'release/views/'	
				}
			}
		},
		cssmin: {
			options: {},
			target: {
				files: {
					'release/css/app.min.css': ['css/app.css']
				}
			}
		},
		uglify: {
			options: {
				banner: '/**\n* dv Rutos Client v0.10.0\n* Roseller Velicaria, Jr. <r.velicaria.jr@gmail.com>\n*/\n\n',
				mangle: true,
				compress: true
			},
			default_target: {
				files: {
					'release/js/app.min.js': ['js/**/*.js', 'js/app.js']
				}
			}
		}
		
	});

	grunt.loadNpmTasks('grunt-contrib-htmlmin');
	grunt.loadNpmTasks('grunt-contrib-cssmin');
	grunt.loadNpmTasks('grunt-contrib-uglify');
	grunt.loadNpmTasks('grunt-contrib-watch');

	grunt.registerTask('default', ['htmlmin', 'cssmin', 'uglify']);
};
