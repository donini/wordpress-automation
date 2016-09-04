module.exports = function( grunt ) {
	'use strict';

	// Load all grunt tasks
	require('matchdep').filterDev('grunt-*').forEach(grunt.loadNpmTasks);

	//deploy variables
	var deployConfig = {
		url: '',
		database: '',
		user: '',
		pass: '',
		server: ''
	};

	// Project configuration
	grunt.initConfig( {
		deployConfig: deployConfig,
		pkg:    grunt.file.readJSON( 'package.json' ),
		concat: {
			options: {
				stripBanners: true,
				banner: '/*! <%= pkg.title %> - v<%= pkg.version %> - \n'+
				'DONFramework - v<%= pkg.framework_version %>\n'+
				'<%= grunt.template.today("yyyy-mm-dd") %>\n' +
				' * <%= pkg.homepage %>\n' +
				' * Copyright (c) Rodrigo Donini <%= grunt.template.today("yyyy") %>;' +
				' */\n'
			},
			theme: {
				src: ['source/wp-content/themes/<%= pkg.name %>/assets/js/src/*.js'],
				dest: 'source/wp-content/themes/<%= pkg.name %>/assets/js/don_child.js'
			},
			themePlugins:{
				src: ['source/wp-content/themes/<%= pkg.name %>/assets/js/vendor/**/*.js'],
				dest: 'source/wp-content/themes/<%= pkg.name %>/assets/js/don_child_plugins.js'
			}
		},
		jshint: {
			browser: {
				all: [
				'source/wp-content/themes/<%= pkg.name %>/assets/js/src/**/*.js',
				'source/wp-content/themes/<%= pkg.name %>/assets/js/test/**/*.js'
				],
				options: {
					jshintrc: '.jshintrc'
				}
			},
			grunt: {
				all: [
				'Gruntfile.js'
				],
				options: {
					jshintrc: '.gruntjshintrc'
				}
			}   
		},
		uglify: {
			all: {
				files: [
				{
					'source/wp-content/themes/<%= pkg.name %>/assets/js/don_child.min.js': ['source/wp-content/themes/<%= pkg.name %>/assets/js/don_child.js']
				},
				{
					'source/wp-content/themes/<%= pkg.name %>/assets/js/don_plugins.min.js': ['source/wp-content/themes/<%= pkg.name %>/assets/js/don_child_plugins.js']
				}
				],
				options: {
					banner: '/*! <%= pkg.title %> - v<%= pkg.version %> - \n'+
					'DONFramework - v<%= pkg.framework_version %>\n'+
					'<%= grunt.template.today("yyyy-mm-dd") %>\n' +
					' * <%= pkg.homepage %>\n' +
					' * Copyright (c) Rodrigo Donini <%= grunt.template.today("yyyy") %>;' +
					' */\n',
					mangle: {
						except: ['jQuery']
					}
				}
			}
		},
		sprites: {
			theme: {
				src: ['source/wp-content/themes/<%= pkg.name %>/images/src/*.png'],
				css: 'source/wp-content/themes/<%= pkg.name %>/assets/css/sass/_don_child_sprite.scss',
				map: 'source/wp-content/themes/<%= pkg.name %>/images/don_child_sprite.png'
			}
		},
		sass:   {
			all: {
				files: 
				[{
					expand: true,
					cwd: 'source/wp-content/themes/<%= pkg.name %>/assets/css/sass/',
					src: ['*.scss'],
					dest: 'source/wp-content/themes/<%= pkg.name %>/assets/css/',
					ext: '.css'
				}]
			}
		},
		
		cssmin: {
			options: {
				banner: '/*! <%= pkg.title %> - v<%= pkg.version %> - \n'+
				'DONFramework - v<%= pkg.framework_version %>\n'+
				'<%= grunt.template.today("yyyy-mm-dd") %>\n' +
				' * <%= pkg.homepage %>\n' +
				' * Copyright (c) Rodrigo Donini <%= grunt.template.today("yyyy") %>;' +
				' */\n'
			},
			minify: {
				'source/wp-content/themes/<%= pkg.name %>/assets/css/don_child.min.css' : ['source/wp-content/themes/<%= pkg.name %>/assets/css/don_child.css']
			}
		},
		'string-replace': {
			main: {
				files: {    
					'source/wp-content/themes/<%= pkg.name %>/style.css' : 'source/wp-content/themes/DONFramework/style.css' 
				},
				options: {
					replacements: [{
						pattern: /DONFramework/ig,
						replacement: '<%= pkg.name %>'
					},
					{
						pattern: /--TEMPLATE--/ig,
						replacement: 'Template:     DONFramework'
					}]
				}
			},
			wpconfig: {
				files: {
					'source/wp-config.php' : 'source/wp-config.php'
				},
				options: {
					replacements: [{
						pattern: /'DB_NAME', '(\w)*'/ig,
						replacement: "'DB_NAME', '<%= pkg.database.dbname %>'"
					},
					{
						pattern: /'DB_USER', '(\w)*'/ig,
						replacement: "'DB_USER', '<%= pkg.database.dbuser %>'"
					},
					{
						pattern: /'DB_PASSWORD', '(\w)*'/ig,
						replacement: "'DB_PASSWORD', '<%= pkg.database.dbpassword %>'"
					}
					,
					{
						pattern: /'DB_HOST', '(\w)*'/ig,
						replacement: "'DB_HOST', '<%= pkg.database.dbhost %>'"
					}]
				}
			},
			localScript:{
				files: {
					'database/' : 'database/*.sql'
				},
				options: {
					replacements: [
					{
						pattern: /\(1, 'siteurl', '(\w|\/|\:)*', 'yes'\)/ig,
						replacement: "(1, 'siteurl', 'http://localhost/<%= pkg.code %>', 'yes')"
					},
					{
						pattern: /\(36, 'home', '(\w|\/|\:)*', 'yes'\)/ig,
						replacement: "(36, 'home', 'http://localhost/<%= pkg.code %>', 'yes')"
					}]
				}
			},
			changeVersion: {
				files: {
					'source/wp-config.php' : 'source/wp-config.php'
				},
				options: {
					replacements: [{
						pattern: /define\( 'DON_VERSION', '((\d)+.(\d)+.(\d)+)*' \);/ig,
						replacement: "define( 'DON_VERSION', '<%= pkg.framework_version %>' );"
					},
					{
						pattern: /define\( 'DON_CHILD_VERSION', '((\d)+.(\d)+.(\d)+)*' \);/ig,
						replacement: "define( 'DON_CHILD_VERSION', '<%= pkg.version %>' );"
					}]
				}
			},
			deployWpconfig: {
				files: {
					'build/files/wp-config.php' : 'build/files/wp-config.php'
				},
				options: {
					replacements: [{
						pattern: /'DB_NAME', '(\w)*'/ig,
						replacement: "'DB_NAME', '<%= deployConfig.database %>'"
					},
					{
						pattern: /'DB_USER', '(\w)*'/ig,
						replacement: "'DB_USER', '<%= deployConfig.user %>'"
					},
					{
						pattern: /'DB_PASSWORD', '(\w)*'/ig,
						replacement: "'DB_PASSWORD', '<%= deployConfig.pass %>'"
					}
					,
					{
						pattern: /'DB_HOST', '(\w)*'/ig,
						replacement: "'DB_HOST', '<%= deployConfig.server %>'"
					}]
				}
			},
			deployScript:{
				files: {
					'build/database/' : 'build/database/*.sql'
				},
				options: {
					replacements: [
					{
						pattern: /\(1, 'siteurl', '(\w|\/|\:)*', 'yes'\)/ig,
						replacement: "(1, 'siteurl', '<%= deployConfig.url %>', 'yes')"
					},
					{
						pattern: /\(36, 'home', '(\w|\/|\:)*', 'yes'\)/ig,
						replacement: "(36, 'home', '<%= deployConfig.url %>', 'yes')"
					}]
				}
			}
		},
		copy: {
			main:{
				files: [
				// Replace folder name
				{expand: true, cwd: 'source/wp-content/themes/DONFramework', src: 'style.css', dest: 'source/wp-content/themes/<%= pkg.name %>/'},
				{expand: true, cwd: 'source/wp-content/themes/DONFramework', src: 'screenshot.png', dest: 'source/wp-content/themes/<%= pkg.name %>/'},
				{expand: true, cwd: 'source/wp-content/themes/DONFramework/child_theme', src: '**', dest: 'source/wp-content/themes/<%= pkg.name %>/'}
				]
			},
			deploy:{
				files:[
				{expand:true, cwd: 'source/', src:'**', dest:'build/files/'},
				{expand:true, cwd: 'database/', src:'**', dest:'build/database/'}
				]
			}
		},
		watch:{
			options:{
				livereload: true
			},
			sass:{
				files: ['source/wp-content/themes/DONFramework/assets/css/sass/*.scss','source/wp-content/themes/<%= pkg.name %>/assets/css/sass/*.scss'],
				tasks: ['buildStyle'],
				options:{
					livereload: true
				}
			},
			scripts:{
				files: ['source/wp-content/themes/DONFramework/assets/js/src/*.js',
				'source/wp-content/themes/DONFramework/assets/js/vendor/*.js',
				'source/wp-content/themes/<%= pkg.name %>/assets/js/src/*.js',
				'source/wp-content/themes/<%= pkg.name %>/assets/js/vendor/*.js'],
				tasks: ['buildScript'],
				options:{
					livereload: true
				}
			},
			imagesDon:{
				files: ['source/wp-content/themes/DONFramework/images/src/*.png'],
				tasks: ['sprites:don'],
				options:{
					livereload: true
				}
			},
			imagesTheme:{
				files: ['source/wp-content/themes/<%= pkg.name %>/images/src/*.png'],
				tasks: ['sprites:theme'],
				options:{
					livereload: true
				}
			},
			livereload:{
				files:[
				'source/wp-content/themes/<%= pkg.name %>/**/*.{php,html,jpg,jpeg}',
				'source/wp-content/themes/DONFramework/**/*.{php,html}'
				]
			}
		},
		clean: {
			preDeploy: {
				src: [ 'build' ]
			},
			posDeploy: {
				src: [ 
				'build/files/wp-content/themes/DONFramework/child_theme',
				'build/files/wp-content/themes/<%= pkg.name %>/assets/css/sass',
				'build/files/wp-content/themes/<%= pkg.name %>/assets/js/src',
				'build/files/wp-content/themes/<%= pkg.name %>/assets/js/vendor',
				'build/files/wp-content/themes/<%= pkg.name %>/images/src',
				'build/**/*md'
				]
			},
		},
		prompt: {
			startMenu: {
				options: {
					questions: [
					{
						config: 'don.startMenu',
						type: 'list',
						message: 'What would you like to do?',
						default: 'exit',
						choices: [
						{
							value: 'create',
							name:  'Create a new child theme'
						},
						{
							value: 'buildAssets',
							name: 'Build assets'
						},
						{
							value: 'deploy',
							name: 'Deploy application'
						},
						{
							value: 'changeVersion',
							name: 'Change project version'
						},
						{
							value: 'watch',
							name: 'Watch for file changes'
						},
						{
							value: 'prepareScript',
							name: 'Prepare local script for running'
						},
						{
							value: 'exit',
							name: 'Exit'.green
						}
						]
					}
					]
				}
			},
			create: {
				options: {
					questions: [
					{
						config: 'pkg.name',
						type: 'input',
						message: 'Theme name:',
						validate: function (value) {
							var valid = (value !== '');
							return valid || 'Theme name cannot be empty!'.red.underline;
						}
					},
					{
						config: 'pkg.code',
						type: 'input',
						message: 'Project code:',
						validate: function (value) {
							var valid = (value !== '');
							return valid || 'Project code cannot be empty!'.red.underline;
						}
					},
					{
						config: 'pkg.database.dbname',
						type: 'input',
						message: 'Database:',
						validate: function (value) {
							var valid = (value !== '');
							return valid || 'Database name cannot be empty!'.red.underline;
						}
					},
					{
						config: 'pkg.database.dbuser',
						type: 'input',
						message: 'Database user:',
						validate: function (value) {
							var valid = (value !== '');
							return valid || 'Database user cannot be empty!'.red.underline;
						}
					},
					{
						config: 'pkg.database.dbpassword',
						type: 'input',
						message: 'Database password:'
					},
					{
						config: 'pkg.database.dbhost',
						type: 'input',
						message: 'Database host:',
						validate: function (value) {
							var valid = (value !== '');
							return valid || 'Database host cannot be empty!'.red.underline;
						}
					}
					]
				}
			},
			changeVersion: {
				options: {
					questions: [
					{
						config: 'pkg.version',
						type: 'input',
						message: 'Current project version = ' + '<%= pkg.version %>'.blue + '. Change current project version to: ',
						validate: function (value) {
							var valid = /(\d)*\.(\d)*\.(\d)*/g.test(value)
							return valid || 'Version number must be number.number.number'.red.underline;
						}
					}
					]
				}
			},
			deploy: {
				options: {
					questions: [
					{
						config: 'deployConfig.url',
						type: 'input',
						message: 'Deploy url: ',
						validate: function (value) {
							var valid = (value !== '');
							return valid || 'Parameter cannot be null'.red.underline;
						}
					},
					{
						config: 'deployConfig.database',
						type: 'input',
						message: 'Deploy database: ',
						validate: function (value) {
							var valid = (value !== '');
							return valid || 'Parameter cannot be null'.red.underline;
						}
					},
					{
						config: 'deployConfig.user',
						type: 'input',
						message: 'Deploy database user: ',
						validate: function (value) {
							var valid = (value !== '');
							return valid || 'Parameter cannot be null'.red.underline;
						}
					},
					{
						config: 'deployConfig.pass',
						type: 'input',
						message: 'Deploy database password: ',
						validate: function (value) {
							var valid = (value !== '');
							return valid || 'Parameter cannot be null'.red.underline;
						}
					},
					{
						config: 'deployConfig.server',
						type: 'input',
						message: 'Deploy database server: ',
						validate: function (value) {
							var valid = (value !== '');
							return valid || 'Parameter cannot be null'.red.underline;
						}
					}
					]
				}
			}
		}
	} );

	// Default task.
	grunt.registerTask( 'default', function(){
		var version = grunt.config('pkg.framework_version');
		grunt.log.ok('DONFramework - v'+version);
		grunt.task.run(['prompt:startMenu', '-']);
	});
	

	/*****************************************************************************************************************
	*													*
	*	PRIVATE TASK LIST 									*
	*													*
	******************************************************************************************************************/
		// Startup menu handling
		grunt.registerTask('-', function(){
			var pkg = grunt.config('pkg');
			grunt.file.write('package.json', JSON.stringify(pkg,null,2));

			var nextTask = grunt.config('don.startMenu');
			if(nextTask !== 'exit')
				grunt.task.run([nextTask, 'default']);
		});

		//Creates a new child theme
		grunt.registerTask( 'create', function(){
			var tasks = ['prompt:create', 'copy:main', 'string-replace:main', 'string-replace:wpconfig', 'string-replace:localScript', 'string-replace:changeVersion'];
			grunt.task.run(tasks);
		}).registerTask( 'c', function(){
			var tasks = ['prompt:create', 'copy:main', 'string-replace:main', 'string-replace:wpconfig', 'string-replace:localScript', 'string-replace:changeVersion'];
			grunt.task.run(tasks);
		});

		// Call watch
		grunt.registerTask( 'w', function(){
			var tasks = ['prompt:create', 'copy:main', 'string-replace:main', 'string-replace:wpconfig', 'string-replace:localScript', 'string-replace:changeVersion'];
			grunt.task.run(tasks);
		})

		//Changes project version
		grunt.registerTask( 'changeVersion', function(){
			var tasks = ['prompt:changeVersion', 'string-replace:changeVersion'];
			grunt.task.run(tasks);
		}).registerTask( 'cv', function(){
			var tasks = ['prompt:changeVersion', 'string-replace:changeVersion'];
			grunt.task.run(tasks);
		});

		grunt.registerTask('buildAssets', function(){
			var tasks = ['sprites', 'buildStyle', 'buildScript'];
			grunt.task.run(tasks);
		}).registerTask('ba', function(){
			var tasks = ['sprites', 'buildStyle', 'buildScript'];
			grunt.task.run(tasks);
		});

		//Compile sass
		grunt.registerTask('buildStyle', function(){
			var tasks = ['sass'];
			grunt.task.run(tasks);
		}).registerTask('bs', function(){
			var tasks = ['sass'];
			grunt.task.run(tasks);
		});

		//Compile js
		grunt.registerTask('buildScript', function(){
			var tasks = ['jshint', 'concat'];
			grunt.task.run(tasks);
		}).registerTask('bj', function(){
			var tasks = ['jshint', 'concat'];
			grunt.task.run(tasks);
		});

		//Minify
		grunt.registerTask('deploy', function(){
			var tasks = ['prompt:deploy', 'clean:preDeploy', 'buildAssets', 'uglify', 'cssmin', 'copy:deploy', 'clean:posDeploy', 'string-replace:deployWpconfig', 'string-replace:deployScript'];
			grunt.option('force', true);
			grunt.task.run(tasks);
		}).registerTask('d', function(){
			var tasks = ['prompt:deploy', 'clean:preDeploy', 'buildAssets', 'uglify', 'cssmin', 'copy:deploy', 'clean:posDeploy', 'string-replace:deployWpconfig', 'string-replace:deployScript'];
			grunt.option('force', true);
			grunt.task.run(tasks);
		});

		//Prepare local script
		grunt.registerTask('prepareScript', function(){
			var pkg = grunt.file.readJSON( 'package.json' );
			grunt.log.ok('Preparing script for:\nProject code:'+pkg.code+'\n');
			grunt.task.run('string-replace:localScript');
		});

		grunt.util.linefeed = '\n';
	};