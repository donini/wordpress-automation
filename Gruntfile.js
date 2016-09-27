module.exports = function( grunt ) {
	'use strict';

	// LOAD ALL GRUNT TASKS
	require('matchdep').filterDev('grunt-*').forEach(grunt.loadNpmTasks);

	//DEPLOY VARIABLES
	var deployConfig = {
		url: '',
		database: '',
		user: '',
		pass: '',
		server: ''
	};

	// PROJECT INIT
	grunt.initConfig( {
		deployConfig: deployConfig,
		pkg:    grunt.file.readJSON( 'package.json' ),
		// SHELL COMMANDS
	    shell: {
	        downloadInstallWP: {
	            command: 'wp core download --path=source --locale=<%= pkg.locale %>'
	        },
	        configureDatabaseWP: {
	            command: [
	            	'cd source',
	            	'wp core config --dbname=<%= pkg.database.dbname %> --dbuser=<%= pkg.database.dbuser %> --dbpass=<%= pkg.database.dbpassword %> --dbhost=<%= pkg.database.dbhost %> --dbprefix=<%= pkg.database.dbprefix %> --extra-php <<PHP'
            	].join('&&')
	        },
	        initialConfigsWP: {
	        	command: [
		        	'cd source',
		            'wp db create',
		        	'wp core install --url=<%= pkg.homepage %> --title=<%= pkg.title %> --admin_user=<%= pkg.admin_user %> --admin_password=<%= pkg.admin_pass %> --admin_email=<%= pkg.admin_email %>'
	        	].join('&&')
	        },
	        updateWP: {
	        	command: [
	        		'cd source',
	        		'wp core update'
	        	].join('&&')
	        },
	        clearThemesWP: {
	        	command: [
	        	'cd source',
	        	'wp theme activate DONFramework',
	        	'wp theme delete twentyfifteen',
	        	'wp theme delete twentyfourteen',
	        	'wp theme delete twentysixteen',
	        	'cd ../',
	        	'rm -r DONFramework.zip'
	        	].join('&&')
	        },
	        setActiveThemeWP: {
	        	command: [
	        	'cd source',
	        	'wp theme activate <%= pkg.name %>'
	        	].join('&&')
	        },
	        dumpDatabaseWP: {
	        	command: [
	        		'cd build',
	        		'mkdir database',
	        		'cd ../source',
	        		'wp db export --add-drop-table ../build/database/dump_<%= pkg.name %>.sql'
	        	].join('&&')
	        }
	    },
	    // CONCAT JS
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
		// VALIDADE JS
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
		// COMPACT JS
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
		// GENERATE SPRITES
		sprites: {
			theme: {
				src: ['source/wp-content/themes/<%= pkg.name %>/images/src/*.png'],
				css: 'source/wp-content/themes/<%= pkg.name %>/assets/css/sass/_don_child_sprite.scss',
				map: 'source/wp-content/themes/<%= pkg.name %>/images/don_child_sprite.png'
			}
		},
		// COMPILE SASS
		sass: {
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
		// MINIFY CSS
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
		// REPLACE SOME STRINGS IN FILES
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
			setThemePath: {
				files: {    
					'source/wp-content/themes/<%= pkg.name %>/functions.php' : 'source/wp-content/themes/<%= pkg.name %>/functions.php' 
				},
				options: {
					replacements: [{
						pattern: /--TEMPLATE--/ig,
						replacement: '<%= pkg.name %>'
					}]
				}
			},
			changeVersion: {
				files: {
					'source/wp-content/themes/<%= pkg.name %>/functions.php' : 'source/wp-content/themes/<%= pkg.name %>/functions.php'
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
			}
		},
		// UNZIP MASTER THEME
		unzip: {
			'source/wp-content/themes/': 'DONFramework.zip'
		},
		// COPY CHILD THEME AND DEPLOY FILES
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
		// WATCH FOR FILES CHANGES
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
				'source/wp-content/themes/<%= pkg.name %>/**/*.{php,html,jpg,jpeg,png,gif}',
				'source/wp-content/themes/DONFramework/**/*.{php,html}'
				]
			}
		},
		// CLEAN TEMP FILES
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
		// PROMPT START MENU
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
							value: 'downloadInstallWP',
							name: '1) Download WordPress'
						},
						{
							value: 'configureDatabaseWP',
							name: '2) Configure WordPress'
						},
						{
							value: 'initialConfigsWP',
							name: '3) Install WordPress'
						},
						{
							value: 'updateWP',
							name: '4) Update WordPress to last version'
						},
						{
							value: 'create',
							name:  '5) Create a new child theme'
						},
						{
							value: 'buildAssets',
							name: '6) Build assets'
						},
						{
							value: 'deploy',
							name: '7) Deploy application'
						},
						{
							value: 'changeVersion',
							name: '8) Change project version'
						},
						{
							value: 'watch',
							name: '8) Watch for file changes'
						},
						{
							value: 'exit',
							name: '0) Exit'
						}
						]
					}
					]
				}
			},
			downloadInstall: {
				options: {
					questions: [
					{
						config: 'pkg.locale',
						default: 'en_US',
						type: 'input',
						message: 'What is the language of WordPress you want?'
					}
					]
				}
			},
			configureDatabase: {
				options: {
					questions: [
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
					},
					{
						config: 'pkg.database.dbprefix',
						type: 'input',
						default: 'wpd_',
						message: 'Tables prefix:'
					}
					]
				}
			},
			initialConfigs: {
				options: {
					questions: [
					{
						config: 'pkg.homepage',
						type: 'input',
						message: 'What is the address of your site?'
					},
					{
						config: 'pkg.title',
						type: 'input',
						message: 'What is the title of your site?'
					},
					{
						config: 'pkg.admin_user',
						type: 'input',
						default: 'admin',
						message: 'What is the name of admin user?'
					},
					{
						config: 'pkg.admin_pass',
						type: 'input',
						default: '12345',
						message: 'What is the password of the admin user?'
					},
					{
						config: 'pkg.admin_email',
						type: 'input',
						default: 'admin@wordpress.local',
						message: 'What is the email of the admin user?'
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

	// DEFAULT TASK
	grunt.registerTask( 'default', function(){
		var version = grunt.config('pkg.framework_version');
		grunt.log.ok('DONFramework - '+version.cyan);
		grunt.task.run(['prompt:startMenu', '-']);
	});
	

	/*****************************************************************************************************************
	*													*
	*	PRIVATE TASK LIST 								*
	*													*
	******************************************************************************************************************/
		// STARTUP MENU HANDLING
		grunt.registerTask('-', function(){
			var pkg = grunt.config('pkg');
			grunt.file.write('package.json', JSON.stringify(pkg,null,2));

			var nextTask = grunt.config('don.startMenu');
			if(nextTask !== 'exit')
				grunt.task.run([nextTask, 'default']);
		});

		// DOWNLOAD WORDPRESS
		grunt.registerTask( 'downloadInstallWP', function(){
			var tasks = ['prompt:downloadInstall','shell:downloadInstallWP'];
			grunt.task.run(tasks);
		}).registerTask( 'getwp', function(){
			var tasks = ['prompt:downloadInstall','shell:downloadInstallWP'];
			grunt.task.run(tasks);
		});

		// CONFIGURE WP
		grunt.registerTask( 'configureDatabaseWP', function(){
			var tasks = ['prompt:configureDatabase','shell:configureDatabaseWP'];
			grunt.task.run(tasks);
		}).registerTask( 'configwp', function(){
			var tasks = ['prompt:configureDatabase','shell:configureDatabaseWP'];
			grunt.task.run(tasks);
		});

		// INSTALL WP
		grunt.registerTask( 'initialConfigsWP', function(){
			var tasks = ['prompt:initialConfigs','shell:initialConfigsWP'];
			grunt.task.run(tasks);
		}).registerTask( 'installwp', function(){
			var tasks = ['prompt:initialConfigs','shell:initialConfigsWP'];
			grunt.task.run(tasks);
		});

		// UPDATE WP
		grunt.registerTask( 'updateWP', function(){
			var tasks = ['shell:updateWP'];
			grunt.task.run(tasks);
		}).registerTask( 'updatewp', function(){
			var tasks = ['shell:updateWP'];
			grunt.task.run(tasks);
		});

		// CREATES A NEW CHILD THEME
		grunt.registerTask( 'create', function(){
			var tasks = ['prompt:create', 'unzip', 'shell:clearThemesWP', 'copy:main', 'string-replace:main', 'string-replace:setThemePath', 'shell:setActiveThemeWP', 'string-replace:changeVersion'];
			grunt.task.run(tasks);
		}).registerTask( 'c', function(){
			var tasks = ['prompt:create', 'unzip', 'shell:clearThemesWP', 'copy:main', 'string-replace:main', 'string-replace:setThemePath', 'shell:setActiveThemeWP', 'string-replace:changeVersion'];
			grunt.task.run(tasks);
		});

		// CALL WATCH
		grunt.registerTask( 'w', function(){
			var tasks = ['watch'];
			grunt.task.run(tasks);
		})

		// CHANGE PROJECT VERSION
		grunt.registerTask( 'changeVersion', function(){
			var tasks = ['prompt:changeVersion', 'string-replace:changeVersion'];
			grunt.task.run(tasks);
		}).registerTask( 'cv', function(){
			var tasks = ['prompt:changeVersion', 'string-replace:changeVersion'];
			grunt.task.run(tasks);
		});

		// BUILD ALL ASSETS
		grunt.registerTask('buildAssets', function(){
			var tasks = ['sprites', 'buildStyle', 'buildScript'];
			grunt.task.run(tasks);
		}).registerTask('ba', function(){
			var tasks = ['sprites', 'buildStyle', 'buildScript'];
			grunt.task.run(tasks);
		});

		// COMPILE SASS
		grunt.registerTask('buildStyle', function(){
			var tasks = ['sass'];
			grunt.task.run(tasks);
		}).registerTask('bs', function(){
			var tasks = ['sass'];
			grunt.task.run(tasks);
		});

		// COMPILE JS
		grunt.registerTask('buildScript', function(){
			var tasks = ['jshint', 'concat'];
			grunt.task.run(tasks);
		}).registerTask('bj', function(){
			var tasks = ['jshint', 'concat'];
			grunt.task.run(tasks);
		});

		// BUILD AND DEPLOY FILES
		grunt.registerTask('deploy', function(){
			var tasks = ['prompt:deploy', 'clean:preDeploy', 'buildAssets', 'uglify', 'cssmin', 'copy:deploy', 'clean:posDeploy', 'string-replace:deployWpconfig', 'shell:dumpDatabaseWP'];
			grunt.option('force', true);
			grunt.task.run(tasks);
		}).registerTask('d', function(){
			var tasks = ['prompt:deploy', 'clean:preDeploy', 'buildAssets', 'uglify', 'cssmin', 'copy:deploy', 'clean:posDeploy', 'string-replace:deployWpconfig', 'shell:dumpDatabaseWP'];
			grunt.option('force', true);
			grunt.task.run(tasks);
		});

		grunt.util.linefeed = '\n';
	};