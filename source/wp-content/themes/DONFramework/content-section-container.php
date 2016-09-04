<?php
/**
  Template Name: Section-container
 *
 */

get_header(); ?>

<!-- Start the Loop. -->
<?php if ( have_posts() ) : while ( have_posts() ) : the_post(); ?>

	<?php
	$mypages = get_pages( array( 'child_of' => get_the_ID(), 'sort_order' => 'asc', 'sort_column' => 'menu_order' ) );
	foreach( $mypages as $page ) {

		$name = $page->post_name;
		$template_name = get_post_meta( $page->ID, '_wp_page_template', true );

		// default page template_part content-page.php
		$slug = 'page';

		// check if there is a template for the page, otherwise, check if there is a page-slug for it.
		if ( locate_template( $template_name , $load, $require_once ) != '' )
			$slug = $template_name;
		else if ( locate_template( 'page-' . $name . '.php' , $load, $require_once ) != '' )
			$slug = $name;

		echo '<section id="'.$name.'-section" class="section-'.$page->ID.' " >';
		echo '<a class="a-rel" name="'.$name.'">'.$name.'</a>';

		setup_postdata( $page );

		if($slug == $name)
			get_template_part( 'page', $slug );
		else
			get_template_part( basename($slug, '.php') );

		echo '</section>';

	}
	wp_reset_postdata();
	?>

<?php endwhile; endif; ?>
<!-- End the loop. -->

<?php
get_footer();?>