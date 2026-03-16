<?php
/**
 * Sidebar: Latest posts, Trust in PMs, Latest digest.
 *
 * @package PrismaMedia
 */

if ( ! is_active_sidebar( 'sidebar-1' ) ) {
	$latest = new WP_Query( array(
		'post_type'      => 'post',
		'posts_per_page' => 14,
		'post_status'    => 'publish',
		'orderby'        => 'date',
		'no_found_rows'  => true,
	) );
	$trust_pms = prismamedia_trust_pms();
	$oil       = prismamedia_oil_prices();
	$eu_approval = prismamedia_eu_approval();
	$theme_uri = get_template_directory_uri();
?>
<aside class="prisma-sidebar" aria-label="<?php esc_attr_e( 'Latest headlines', 'prismamedia' ); ?>">
	<div class="prisma-wrap">
		<div class="prisma-section-header">
			<h2><?php esc_html_e( 'Latest', 'prismamedia' ); ?></h2>
		</div>
	</div>

	<?php if ( $latest->have_posts() ) : ?>
		<ul class="latest-posts prisma-wrap">
			<?php
			while ( $latest->have_posts() ) {
				$latest->the_post();
				$date = get_the_date( 'M j, Y' );
				$time = get_the_time( 'H:i' );
				?>
				<li>
					<a href="<?php the_permalink(); ?>" class="latest-item" aria-label="<?php echo esc_attr( sprintf( __( 'Read: %s', 'prismamedia' ), get_the_title() ) ); ?>">
						<p class="date"><?php echo esc_html( $date . ' · ' . $time ); ?></p>
						<h3><?php the_title(); ?></h3>
					</a>
				</li>
				<?php
			}
			wp_reset_postdata();
			?>
		</ul>
	<?php endif; ?>

	<div class="prisma-wrap">
		<div class="prisma-widget-box">
			<h3><?php esc_html_e( 'Trust in prime ministers', 'prismamedia' ); ?></h3>
			<p class="widget-desc"><?php esc_html_e( 'Share who trust vs. distrust (%), latest national polls.', 'prismamedia' ); ?></p>
			<div class="prisma-trust-list">
				<?php foreach ( $trust_pms as $pm ) : ?>
					<?php
					$rest = 100 - $pm['trust'] - $pm['distrust'];
					$img_src = $theme_uri . '/images/pm/' . $pm['image'];
					?>
					<div class="prisma-trust-item">
						<div class="prisma-trust-avatar">
							<img src="<?php echo esc_url( $img_src ); ?>" alt="" width="36" height="36" loading="lazy">
						</div>
						<div class="prisma-trust-body">
							<p class="name"><?php echo esc_html( $pm['name'] ); ?></p>
							<p class="country"><?php echo esc_html( $pm['country'] ); ?></p>
							<div class="prisma-trust-bar-wrap">
								<div class="prisma-trust-bar">
									<div class="segment trust" style="width: <?php echo (int) $pm['trust']; ?>%;"></div>
									<div class="segment distrust" style="left: <?php echo (int) $pm['trust']; ?>%; width: <?php echo (int) $pm['distrust']; ?>%;"></div>
									<?php if ( $rest > 0 ) : ?>
										<div class="segment rest" style="left: <?php echo (int) ( $pm['trust'] + $pm['distrust'] ); ?>%; width: <?php echo (int) $rest; ?>%;"></div>
									<?php endif; ?>
								</div>
								<div class="prisma-trust-nums">
									<span class="t"><?php echo (int) $pm['trust']; ?></span>/<span class="d"><?php echo (int) $pm['distrust']; ?></span>
								</div>
							</div>
						</div>
					</div>
				<?php endforeach; ?>
			</div>
			<p class="sources"><?php esc_html_e( 'Sources: Eurobarometer, national pollsters (Median, Focus, etc.), 2024–2025.', 'prismamedia' ); ?></p>
		</div>

		<div class="prisma-widget-box">
			<h3><?php esc_html_e( 'Latest digest', 'prismamedia' ); ?></h3>
			<p class="widget-desc"><?php esc_html_e( 'Oil prices, EU direction approval by country.', 'prismamedia' ); ?></p>
			<section class="prisma-digest-oil" aria-label="<?php esc_attr_e( 'Oil prices', 'prismamedia' ); ?>">
				<h4><?php esc_html_e( 'Oil (per barrel)', 'prismamedia' ); ?></h4>
				<ul>
					<?php foreach ( $oil as $o ) : ?>
						<li>
							<span class="oil-label"><?php echo esc_html( $o['label'] ); ?></span>
							<p class="oil-value">$<?php echo esc_html( number_format( $o['value'], 1 ) ); ?> <span class="oil-unit"><?php echo esc_html( $o['unit'] ); ?></span></p>
						</li>
					<?php endforeach; ?>
				</ul>
			</section>
			<section class="prisma-digest-eu" aria-label="<?php esc_attr_e( 'EU direction approval by country', 'prismamedia' ); ?>">
				<h4><?php esc_html_e( 'EU direction approval (%)', 'prismamedia' ); ?></h4>
				<ul>
					<?php foreach ( $eu_approval as $eu ) : ?>
						<?php $rest = 100 - $eu['approve'] - $eu['disapprove']; ?>
						<li>
							<div class="eu-row">
								<span class="eu-country"><?php echo esc_html( $eu['country'] ); ?></span>
								<span><span class="eu-approve"><?php echo (int) $eu['approve']; ?></span> / <span class="eu-disapprove"><?php echo (int) $eu['disapprove']; ?></span></span>
							</div>
							<div class="eu-bar">
								<div class="seg approve" style="width: <?php echo (int) $eu['approve']; ?>%;"></div>
								<div class="seg disapprove" style="left: <?php echo (int) $eu['approve']; ?>%; width: <?php echo (int) $eu['disapprove']; ?>%;"></div>
								<?php if ( $rest > 0 ) : ?>
									<div class="seg rest" style="left: <?php echo (int) ( $eu['approve'] + $eu['disapprove'] ); ?>%; width: <?php echo (int) $rest; ?>%;"></div>
								<?php endif; ?>
							</div>
						</li>
					<?php endforeach; ?>
				</ul>
			</section>
			<p class="sources"><?php esc_html_e( 'Oil: spot. EU approval: Eurobarometer, national polls, 2024–2025.', 'prismamedia' ); ?></p>
		</div>

		<a href="<?php echo esc_url( get_permalink( get_option( 'page_for_posts' ) ) ?: home_url( '/' ) ); ?>" class="prisma-btn-view-all"><?php esc_html_e( 'View all news', 'prismamedia' ); ?></a>
	</div>
</aside>
<?php
} else {
	dynamic_sidebar( 'sidebar-1' );
}
?>
