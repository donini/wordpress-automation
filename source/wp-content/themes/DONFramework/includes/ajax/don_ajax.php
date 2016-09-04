<?php
/*
*	Functions and definitions to handle ajax
*/


function don_child_ajax_init(){
	wp_localize_script( 'don_child', 'DONAjax', array( 
		'ajaxurl' => admin_url( 'admin-ajax.php' ),
		'siteurl' => site_url(),
		'themeurl' => get_stylesheet_uri() 
		) );
}
add_action( 'wp_head', 'don_child_ajax_init' );

?>