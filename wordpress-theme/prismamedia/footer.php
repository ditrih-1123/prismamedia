<?php
/**
 * Footer template.
 *
 * @package PrismaMedia
 */

$regions = array(
	array( 'label' => 'Czech Republic', 'href' => '#czech-republic' ),
	array( 'label' => 'Slovakia', 'href' => '#slovakia' ),
	array( 'label' => 'Hungary', 'href' => '#hungary' ),
	array( 'label' => 'Moldova', 'href' => '#moldova' ),
	array( 'label' => 'Georgia', 'href' => '#georgia' ),
	array( 'label' => 'Armenia', 'href' => '#armenia' ),
);
$footer_links = array(
	array( 'label' => 'About', 'href' => '#' ),
	array( 'label' => 'Contact', 'href' => '#' ),
	array( 'label' => 'Privacy', 'href' => '#' ),
	array( 'label' => 'Terms', 'href' => '#' ),
);
?>
<footer class="prisma-footer" role="contentinfo" aria-label="<?php esc_attr_e( 'Site footer', 'prismamedia' ); ?>">
	<div class="prisma-wrap">
		<div class="prisma-footer-inner">
			<div class="prisma-footer-brand">
				<p class="logo">Prisma<span>Media</span></p>
				<p><?php esc_html_e( 'News, polls, and in-depth reporting on politics and policy in Central and Eastern Europe.', 'prismamedia' ); ?></p>
			</div>
			<div class="prisma-footer-nav">
				<nav aria-label="<?php esc_attr_e( 'Footer regions', 'prismamedia' ); ?>">
					<h3><?php esc_html_e( 'Regions', 'prismamedia' ); ?></h3>
					<ul>
						<?php foreach ( $regions as $r ) : ?>
							<li><a href="<?php echo esc_url( $r['href'] ); ?>"><?php echo esc_html( $r['label'] ); ?></a></li>
						<?php endforeach; ?>
					</ul>
				</nav>
				<nav aria-label="<?php esc_attr_e( 'Footer legal and info', 'prismamedia' ); ?>">
					<h3><?php esc_html_e( 'Legal', 'prismamedia' ); ?></h3>
					<ul>
						<?php foreach ( $footer_links as $f ) : ?>
							<li><a href="<?php echo esc_url( $f['href'] ); ?>"><?php echo esc_html( $f['label'] ); ?></a></li>
						<?php endforeach; ?>
					</ul>
				</nav>
			</div>
		</div>
		<div class="prisma-footer-bottom">
			<p>&copy; <?php echo esc_html( date( 'Y' ) ); ?> PrismaMedia. <?php esc_html_e( 'All rights reserved.', 'prismamedia' ); ?></p>
		</div>
	</div>
</footer>

<?php wp_footer(); ?>
</body>
</html>
