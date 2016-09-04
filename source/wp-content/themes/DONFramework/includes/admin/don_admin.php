<?php
/**
 * DONFramework functions and definitions for admin panel
 */

 /**
  * Cleans up the admin dashboard
  *
  * @uses
  *
  * @since 0.1.0
  */
 function don_remove_dashboard_widgets() {
 	global $wp_meta_boxes;

 	unset($wp_meta_boxes['dashboard']['side']['core']['dashboard_quick_press']);
 	unset($wp_meta_boxes['dashboard']['normal']['core']['dashboard_incoming_links']);
 	unset($wp_meta_boxes['dashboard']['normal']['core']['dashboard_plugins']);
 	unset($wp_meta_boxes['dashboard']['normal']['core']['dashboard_recent_drafts']);
 	unset($wp_meta_boxes['dashboard']['normal']['core']['dashboard_recent_comments']);
 	unset($wp_meta_boxes['dashboard']['side']['core']['dashboard_primary']);
 	unset($wp_meta_boxes['dashboard']['side']['core']['dashboard_secondary']);
 	unset($wp_meta_boxes['dashboard']['normal']['core']['dashboard_activity']);
 	unset($wp_meta_boxes['dashboard']['normal']['core']['dashboard_right_now']);
 }
 add_action('wp_dashboard_setup', 'don_remove_dashboard_widgets' );

 ?>