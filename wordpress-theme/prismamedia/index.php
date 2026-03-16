<?php
/**
 * Main template fallback.
 *
 * @package PrismaMedia
 */

get_header();
?>

<main class="prisma-wrap" style="padding-top: 2rem; padding-bottom: 2rem;">
	<?php if ( have_posts() ) : ?>
		<ul class="prisma-topic-grid" style="list-style: none; margin: 0; padding: 0;">
			<?php while ( have_posts() ) : the_post(); ?>
				<li>
					<a href="<?php the_permalink(); ?>" class="prisma-topic-card">
						<?php if ( has_post_thumbnail() ) : ?>
							<div class="thumb"><?php the_post_thumbnail( 'medium_large' ); ?></div>
						<?php endif; ?>
						<p class="date"><?php echo esc_html( get_the_date() ); ?></p>
						<h3><?php the_title(); ?></h3>
						<p class="dek"><?php echo wp_kses_post( has_excerpt() ? get_the_excerpt() : wp_trim_words( get_the_content(), 20 ) ); ?></p>
					</a>
				</li>
			<?php endwhile; ?>
		</ul>
		<?php the_posts_pagination(); ?>
	<?php else : ?>
		<p><?php esc_html_e( 'No posts found.', 'prismamedia' ); ?></p>
	<?php endif; ?>
</main>

<?php get_sidebar(); ?>
<?php get_footer(); ?>
