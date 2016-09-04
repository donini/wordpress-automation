<?php
/**
 * DON Framework helper functions to menu
 */

/*
Creates a nav menu
*/
function don_nav()
{
        wp_nav_menu(
        array(
                'theme_location'  => 'header-menu',
                'menu'            => '',
                'container'       => 'div',
                'container_class' => 'menu-{menu slug}-container',
                'container_id'    => '',
                'menu_class'      => 'menu',
                'menu_id'         => '',
                'echo'            => true,
                'fallback_cb'     => 'wp_page_menu',
                'before'          => '',
                'after'           => '',
                'link_before'     => '',
                'link_after'      => '',
                'items_wrap'      => '<ul>%3$s</ul>',
                'depth'           => 0,
                'walker'          => ''
                )
        );
}

/*
Register all menus
*/
function don_register_menu()
{
    register_nav_menus(array( // Using array to specify more menus if needed
        'header-menu' => __('Header Menu', 'don') // Main Navigation
    ));
}
add_action('init', 'don_register_menu');