# WORDPRESS-AUTOMATION

This boilerplate create automations for Wordpress projects. It turn more easer the developer's life.

Functions included:

*   [Create new theme](#create-new-theme-development) 
*   [Build styles](#build-styles) into one minified file
*   [Build javascript](#build-scripts) into one hint and minified file
*   Generate sprites of the images used in project
*   [Observe](#watch) files changes and automatically build assets and refreash browser
*   Prepare project to [deploy](#deploy-production)

All this options can be accessed by [start menu](#start-menu) of boilerplate.

## Cautions after clone
1. Update Wordpress core and plugins if newer version exists.
2. Uptdate database variables siteurl, home, admin_email. Helper script is [here](/database)
3. The Admin credentials are username: admin, password: 12345.

## Requirements

This libraries are required to run the boilerplate automations, NodeJS is required to perform the GruntJS tasks such, hint javascript, generate sprites of images, live reload of project and SASS is required to perform pre-professing of css files.

*   NodeJS ([Windows](http://nodejs.org/download/ "Node for windows")|[MAC OS](http://shapeshed.com/setting-up-nodejs-and-npm-on-mac-osx/ "Node for MAC"))
*   SASS ([All](http://sass-lang.com/install "SASS for all"))

## Installation

After installal the requirements, type this command on terminal to install Gunt-CLI globally:

```shell
npm install -g grunt-cli
```

And then this to install node dependences and prepare boilerplate to use:

```shell
npm install
```

## Commands

All commands must run on root folder:

### Start menu

To show the start menu, type:
```shell
grunt
```
and select the option you want.

![alt text](http://www.donini.me/github/wpbp/wpbp_startmenu.png "Start menu all options")

### Create new theme [DEVELOPMENT]

To create a new custom theme, use:
```shell
grunt create        [OR]        grunt c
```

![alt text](http://www.donini.me/github/wpbp/wpbp_create.png "Create new theme parameters")

#### Parameters:

*Theme name:* the name of your theme/project
*Project code:* the code of your project
*Database:* the host of your database
*Database user:* the user of your database
*Database password:* the password of user of your database
*Database host:* the schema name

##### Observations:

<sup>1</sup> This will be your url path to access project. Ex. http://localhost/PROJECT_CODE
<sup>2</sup> The informations of database will be add to wp-config.php automatically.
<sup>3</sup> After create new theme it will be necessary access wp-admin, and go to on  Appearance \ Customize menu, and select the current theme to your theme just created.

### Build Assets

To build all styles, javascript and create sprite file, type this:

```shell
grunt buildAssets        [OR]        grunt ba
```

<sup>4</sup> At this moment those files are not minified, it's just were unified.

### Build Styles

It's possible to build only the styles, this procedure will be process .scss  files and unify all css results into a single file. To do this, type:

```shell
grunt buildStyle        [OR]        grunt bs
```

### Build Scripts

It's possible to build only the javascript, this procedure will be unify all .js results into a single file. To do this, type:

```shell
grunt buildScript        [OR]        grunt bj
```

### Watch

This is one of the collest features of this boilerplate, this command observing files changing and build all assets and tiggers refresh to the browser automatically, type:

```shell
grunt watch        [OR]        grunt w
```

<sup>5</sup> Watch command observe changes only in .scss, .js, .php, .html, .png, .gif, .jpg files.

### Deploy [PRODUCTION]

This command prepare the project to deploy into production server, it build everything and minify files, type:

```shell
grunt deploy        [OR]        grunt d
```

![alt text](http://www.donini.me/github/wpbp/wpbp_deploy.png "Deploy parameters")

#### Parameters:

*Deploy url:* the final url of your project
*Deploy database:* database name
*Deploy database user:* username of database
*Deploy database password:* password of user
*Deploy database server:*  host of IP address

<sup>6</sup> The result of the compilation will be found 'build' folder at root. The source files (of assets) will not be sent to this folder.

### Change version

It's possible to controll the versions of your theme/project, type:

```shell
grunt changeVersion        [OR]        grunt cv
```

<sup>7</sup> Using this you prevent cache in assets files after each new deploy.

## Framework features

*   [Ready to build single-page](READY-TO-BUILD-SINGLE-PAGE.md)
*   [Javascript helper variables](JAVASCRIPT-HELPER-VARIABLES.md)

## Suggest new features and register issues

Use the Issues menu of this repository to register issues, doubts and suggest new features.