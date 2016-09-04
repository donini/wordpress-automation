<?php
/**
 * DON Framework functions and definitions
 *
 */

/*
*
*	LOAD EXTERNAL MODULES
*
*/
require_once('includes/admin/don_admin.php');
require_once('includes/helper/don_helpers.php');
require_once('includes/ajax/don_ajax.php');


 /**
  * Set up theme defaults and register supported WordPress features.
  *
  */
 function don_setup() {

 	// Add Menu Support
 	add_theme_support('menus');
  add_theme_support( 'post-thumbnails' );
  load_theme_textdomain( 'don', get_template_directory() . '/languages' );
}
add_action( 'after_setup_theme', 'don_setup' );

 /**
  * Enqueue scripts and styles for front-end.
  */
 function don_scripts_styles() {

  if ( defined( 'SCRIPT_DEBUG' ) && true === SCRIPT_DEBUG ) {
    wp_enqueue_script('liveReload', 'http://localhost:35729/livereload.js?snipver=1');
    $postfix = '';
  }
  else
  {
    $postfix = '.min';
  }

	wp_deregister_script('jquery'); // Deregister WordPress jQuery
	wp_register_script('jquery', 'http://ajax.googleapis.com/ajax/libs/jquery/1.10.2/jquery.min.js', array(), '1.9.1', true); // Google CDN jQuery
	wp_enqueue_script('jquery'); // Enqueue it!

	wp_register_script('modernizr', 'http://cdnjs.cloudflare.com/ajax/libs/modernizr/2.6.2/modernizr.min.js', array(), '2.6.2', false); // Modernizr
	wp_enqueue_script('modernizr'); // Enqueue it!
}
add_action( 'wp_enqueue_scripts', 'don_scripts_styles' );

 /**
  * Add humans.txt to the <head> element.
  */
 function don_header_meta() {
 	$humans = '<link type="text/plain" rel="author" href="' . get_template_directory_uri() . '/humans.txt" />';

 	echo apply_filters( 'don_humans', $humans );
 }
 add_action( 'wp_head', 'don_header_meta' );

 // Remove Admin bar
 function remove_admin_bar()
 {
  return false;
}
add_filter('show_admin_bar', 'remove_admin_bar'); // Remove Admin bar

// Add page slug to body class, love this - Credit: Starkers Wordpress Theme
function add_slug_to_body_class($classes)
{
  global $post;
  if (is_home()) {
    $key = array_search('blog', $classes);
    if ($key > -1) {
      unset($classes[$key]);
    }
  } elseif (is_page()) {
    $classes[] = sanitize_html_class($post->post_name);
  } elseif (is_singular()) {
    $classes[] = sanitize_html_class($post->post_name);
  }

  return $classes;
}
add_filter('body_class', 'add_slug_to_body_class'); // Add slug to body class (Starkers build)

 // Remove Actions
remove_action('wp_head', 'feed_links_extra', 3); // Display the links to the extra feeds such as category feeds
remove_action('wp_head', 'feed_links', 2); // Display the links to the general feeds: Post and Comment Feed
remove_action('wp_head', 'rsd_link'); // Display the link to the Really Simple Discovery service endpoint, EditURI link
remove_action('wp_head', 'wlwmanifest_link'); // Display the link to the Windows Live Writer manifest file.
remove_action('wp_head', 'index_rel_link'); // Index link
remove_action('wp_head', 'parent_post_rel_link', 10, 0); // Prev link
remove_action('wp_head', 'start_post_rel_link', 10, 0); // Start link
remove_action('wp_head', 'adjacent_posts_rel_link', 10, 0); // Display relational links for the posts adjacent to the current post.
remove_action('wp_head', 'wp_generator'); // Display the XHTML generator that is generated on the wp_head hook, WP version
remove_action('wp_head', 'start_post_rel_link', 10, 0);
remove_action('wp_head', 'adjacent_posts_rel_link_wp_head', 10, 0);
remove_action('wp_head', 'rel_canonical');
remove_action('wp_head', 'wp_shortlink_wp_head', 10, 0);

/*
Prevents wordpress of trying to update theme
*/
function don_dont_update_theme( $r, $url ) {
  if ( 0 !== strpos( $url, 'http://api.wordpress.org/themes/update-check' ) ){
    return $r; // Not a theme update request. Bail immediately.
  }
  $themes = unserialize( $r['body']['themes'] );
  unset( $themes[ get_option( 'template' ) ] );
  unset( $themes[ get_option( 'stylesheet' ) ] );
  $r['body']['themes'] = serialize( $themes );
  return $r;
}
add_filter( 'http_request_args', 'don_dont_update_theme', 5, 2 );

/*Removes generator tag*/
function don_remove_version() {
  return '';
}
add_filter('the_generator', 'don_remove_version');