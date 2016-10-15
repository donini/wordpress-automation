# WORDPRESS-AUTOMATION

This can be called "framework" that create automations for some common tasks in WordPress projects. It turn more easer the developer's life.

Functions included:

*   [Download WordPress](#1-download-wordpress)
*   [Configure WordPress](#2-configure-wordpress)
*   [Install WordPress](#3-install-wordpress)
*   [Update WordPress](#4-update-wordpress)
*   [Create new theme](#5-create-new-theme-development) 
*   [Build assets](#6-build-assets)
    *   [Build styles](#build-styles) into one minified file
    *   [Build javascript](#build-scripts) into one hint and minified file
*   Generate sprites of the images used in project
*   [Observe](#9-watch) files changes and automatically build assets and refreash browser
*   Prepare project to [deploy](#7-deploy-production)

All this options can be accessed by [start menu](#start-menu).

## Requirements

This libraries are required to run the automations, WP-CLI is required to run WordPress command line procedures, NodeJS is required to perform the GruntJS tasks such, wp-cli, hint javascript, generate sprites of images, live reload of project and SASS is required to perform pre-processing of css files.

*   WP-CLI ([All](http://wp-cli.org/docs/installing/))
*   NodeJS ([Windows](http://nodejs.org/download/ "Node for windows")|[MAC OS](http://shapeshed.com/setting-up-nodejs-and-npm-on-mac-osx/ "Node for MAC"))
*   SASS ([All](http://sass-lang.com/install "SASS for all"))

## Installation

After install all the requirements, type this command on terminal to install Gunt-CLI globally:

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

### 1) Download WordPress

This option will be download the lasted version of WordPress, if you want you can select the core language.

To initialize download, use:
```shell
grunt getwp
```


#### Parameters:

*What is the language of WordPress you want?:* default is en_US

![alt text](http://www.donini.me/github/wpbp/wpbp_download.png "Download WordPress")

### 2) Configure WordPress

This command just create the wp-config.php file with your settings.

To configure, use:
```shell
grunt configwp
```

![alt text](http://www.donini.me/github/wpbp/wpbp_configure.png "Configure WordPress")

#### Parameters:

*Database:* database name
*Database user:* username of database
*Database password:* password of user
*Database host:*  host of IP address
*Tables prefix host:*  default wpd_

### 3) Install WordPress

This command will be create the database and install WordPress with settings you entered in option 2.

To install, use:
```shell
grunt installwp
```

![alt text](http://www.donini.me/github/wpbp/wpbp_install.png "Install WordPress")

#### Parameters:

*What is the address of your site?* the url of of your project
*What is the title of your site?* the title of your project (if title has spaces, use doublequotes)
*What is the name of admin user?* the admin fo WordPress
*What is the password of the admin user?* the password of admin user
*What is the email of the admin user?* the e-mail of administrator

### 4) Update WordPress

This command update the core WordPress of your project.

To update, use:
```shell
grunt updatewp
```

### 5) Create new theme [DEVELOPMENT]

To create a new custom theme, use:
```shell
grunt create        [OR]        grunt c
```

![alt text](http://www.donini.me/github/wpbp/wpbp_create.png "Create new theme parameters")

#### Parameters:

*Theme name:* the name of your theme/project
*Project code:* the code of your project<sup>1</sup>

##### Observations:

<sup>1</sup> This will be your url path to access project. Ex. http://localhost/PROJECT_CODE

### 6) Build Assets

To build all styles<sup>2</sup>, javascript, minify images and create sprite file, type this:

```shell
grunt buildAssets        [OR]        grunt ba
```

<sup>2</sup> At this moment those files are not minified, it's just were unified.

#### Sub Commands

##### Build Styles

It's possible to build only the styles, this procedure will be process .scss  files and unify all css results into a single file. To do this, type:

```shell
grunt buildStyle        [OR]        grunt bs
```

##### Build Scripts

It's possible to build only the javascript, this procedure will be unify all .js results into a single file. To do this, type:

```shell
grunt buildScript        [OR]        grunt bj
```

### 7) Deploy [PRODUCTION]

This command prepare the project to deploy into production server, it build<sup>3</sup> everything and minify files, type:

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

<sup>3</sup> The result of the compilation will be found 'build' folder at root, this contains WordPress files and an dump of database. The source files (of assets) will not be sent to this folder.

### 8) Change version

It's possible to controll<sup>4</sup> the versions of your theme/project, type:

```shell
grunt changeVersion        [OR]        grunt cv
```

<sup>4</sup> Using this you prevent cache in assets files after each new deploy.

### 9) Watch

This is one of the collest features of this framework, this command observing files changing and build all assets and tiggers refresh to the browser automatically, type:

```shell
grunt watch        [OR]        grunt w
```

<sup>5</sup> Watch command observe changes only in .scss, .js, .php, .html, .png, .gif, .jpg files.

## Framework features

*   [Ready to build single-page](./READY-TO-BUILD-SINGLE-PAGE.md)
*   [Javascript helper variables](./JAVASCRIPT-HELPER-VARIABLES.md)

## Suggest new features and register issues

Use the Issues menu of this repository to register issues, doubts and suggest new features.

See [changelog](./CHANGELOG.md) of project.
