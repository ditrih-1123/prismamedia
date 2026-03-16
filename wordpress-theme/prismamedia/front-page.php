<?php
/**
 * Front page template: ticker, categories, Hungary polls, main stories, topic grids, sidebar.
 *
 * @package PrismaMedia
 */

get_header();

$slugs    = prismamedia_topic_slugs();
$polls    = prismamedia_hungary_polls();
$main_q   = new WP_Query( array(
	'post_type'      => 'post',
	'posts_per_page' => 5,
	'post_status'    => 'publish',
	'orderby'        => 'date',
	'no_found_rows'  => true,
) );
$ticker_q = new WP_Query( array(
	'post_type'      => 'post',
	'posts_per_page' => 20,
	'post_status'    => 'publish',
	'orderby'        => 'date',
	'no_found_rows'  => true,
) );
?>

<!-- Ticker -->
<section class="prisma-ticker" aria-label="<?php esc_attr_e( 'Breaking news ticker', 'prismamedia' ); ?>">
	<div class="prisma-wrap">
		<div class="prisma-ticker-inner">
			<div class="prisma-ticker-live">
				<span class="prisma-ticker-live-dot" aria-hidden="true"></span>
				<span><?php esc_html_e( 'Live', 'prismamedia' ); ?></span>
			</div>
			<div class="prisma-ticker-content">
				<?php
				if ( $ticker_q->have_posts() ) {
					$items = array();
					while ( $ticker_q->have_posts() ) {
						$ticker_q->the_post();
						$cat = get_the_category();
						$cat_name = ! empty( $cat[0] ) ? $cat[0]->name : '';
						$items[] = array(
							'title' => get_the_title(),
							'category' => $cat_name,
							'date' => get_the_date( 'M j, Y' ),
							'time' => get_the_time( 'H:i' ),
						);
					}
					wp_reset_postdata();
					$items = array_merge( $items, $items );
					foreach ( $items as $item ) {
						echo '<span class="prisma-ticker-item">';
						if ( $item['category'] ) {
							echo '<span class="prisma-ticker-cat">' . esc_html( $item['category'] ) . '</span>';
						}
						echo '<span>' . esc_html( $item['title'] ) . '</span>';
						echo '<span class="prisma-ticker-meta">' . esc_html( $item['date'] . ' ' . $item['time'] ) . '</span>';
						echo '<span class="prisma-ticker-live-dot" aria-hidden="true"></span>';
						echo '</span>';
					}
				}
				?>
			</div>
		</div>
	</div>
</section>

<!-- Categories strip -->
<section class="prisma-categories" aria-label="<?php esc_attr_e( 'Editorial categories', 'prismamedia' ); ?>">
	<div class="prisma-wrap">
		<a href="#" class="prisma-cat-btn"><span>Elections</span><span class="icon">&#9679;</span></a>
		<a href="#" class="prisma-cat-btn"><span>Europe &amp; EU</span><span class="icon">&#9679;</span></a>
		<a href="#" class="prisma-cat-btn"><span>Russia &amp; Security</span><span class="icon">&#9679;</span></a>
		<a href="#" class="prisma-cat-btn"><span>Economy</span><span class="icon">&#9679;</span></a>
		<a href="#" class="prisma-cat-btn"><span>Society</span><span class="icon">&#9679;</span></a>
	</div>
</section>

<!-- Hungary polls -->
<section class="prisma-polls" aria-label="<?php esc_attr_e( 'Hungary April 2026 election polls', 'prismamedia' ); ?>">
	<div class="prisma-wrap">
		<div class="prisma-polls-box">
			<h2><?php esc_html_e( 'Hungary opinion polls – April 2026 election', 'prismamedia' ); ?></h2>
			<p class="desc"><?php esc_html_e( 'Party preferences based on the average of the latest nationwide surveys (among likely voters).', 'prismamedia' ); ?></p>
			<div class="prisma-polls-list">
				<?php foreach ( $polls as $party ) : ?>
					<div class="prisma-poll-row">
						<div class="prisma-poll-label"><?php echo esc_html( $party['name'] ); ?></div>
						<div class="prisma-poll-bar-wrap">
							<div class="prisma-poll-bar <?php echo esc_attr( 'bar-' . $party['color'] ); ?>" style="width: <?php echo (int) $party['value']; ?>%;"></div>
						</div>
						<div class="prisma-poll-pct"><?php echo (int) $party['value']; ?>%</div>
					</div>
				<?php endforeach; ?>
			</div>
			<p class="sources" style="margin-top:1.25rem; padding-top:1rem; border-top:1px solid var(--color-zinc-100); font-size:11px; color: var(--color-zinc-500);">
				<?php esc_html_e( 'Source: Zavecz Research, Publicus, Reuters summaries, February–March 2026. Values are rounded percentages among likely voters.', 'prismamedia' ); ?>
			</p>
		</div>
	</div>
</section>

<?php
// Bar colors for Hungary polls
?>
<style>
.prisma-poll-bar.bar-blue { background: #3b82f6; }
.prisma-poll-bar.bar-orange { background: #fb923c; }
.prisma-poll-bar.bar-emerald { background: #10b981; }
.prisma-poll-bar.bar-teal { background: #14b8a6; }
.prisma-poll-bar.bar-purple { background: #a855f7; }
</style>

<!-- Main Stories -->
<section id="main-stories" class="prisma-main-stories" aria-labelledby="main-stories-heading">
	<div class="prisma-wrap">
		<div class="prisma-section-header">
			<h2 id="main-stories-heading"><?php esc_html_e( 'Main Stories', 'prismamedia' ); ?></h2>
		</div>
		<?php if ( $main_q->have_posts() ) : ?>
			<?php
			$first = true;
			$featured = null;
			$rest = array();
			while ( $main_q->have_posts() ) {
				$main_q->the_post();
				if ( $first ) {
					$featured = get_post();
					$first = false;
				} else {
					$rest[] = get_post();
				}
			}
			wp_reset_postdata();
			?>
			<div class="prisma-main-stories-grid">
				<?php if ( $featured ) : ?>
					<a href="<?php echo esc_url( get_permalink( $featured ) ); ?>" class="prisma-featured-card" aria-label="<?php echo esc_attr( sprintf( __( 'Read: %s', 'prismamedia' ), $featured->post_title ) ); ?>">
						<div class="thumb">
							<?php if ( has_post_thumbnail( $featured ) ) : ?>
								<?php echo get_the_post_thumbnail( $featured, 'large' ); ?>
							<?php else : ?>
								<div style="width:100%;height:100%;background:var(--color-zinc-200);"></div>
							<?php endif; ?>
						</div>
						<div class="body">
							<p class="meta"><?php echo esc_html( get_the_date( '', $featured ) . ' · ' . get_the_time( '', $featured ) ); ?></p>
							<h2><?php echo esc_html( $featured->post_title ); ?></h2>
							<div class="excerpt"><?php echo wp_kses_post( has_excerpt( $featured ) ? get_the_excerpt( $featured ) : wp_trim_words( $featured->post_content, 25 ) ); ?></div>
						</div>
					</a>
				<?php endif; ?>
				<?php if ( ! empty( $rest ) ) : ?>
					<ul class="prisma-standard-list">
						<?php foreach ( $rest as $p ) : ?>
							<li>
								<a href="<?php echo esc_url( get_permalink( $p ) ); ?>" class="prisma-standard-card" aria-label="<?php echo esc_attr( sprintf( __( 'Read: %s', 'prismamedia' ), $p->post_title ) ); ?>">
									<p class="meta"><?php echo esc_html( get_the_date( '', $p ) . ' · ' . get_the_time( '', $p ) ); ?></p>
									<h3><?php echo esc_html( $p->post_title ); ?></h3>
									<p class="excerpt"><?php echo wp_kses_post( has_excerpt( $p ) ? get_the_excerpt( $p ) : wp_trim_words( $p->post_content, 15 ) ); ?></p>
								</a>
							</li>
						<?php endforeach; ?>
					</ul>
				<?php endif; ?>
			</div>
		<?php endif; ?>
	</div>
</section>

<!-- Main layout: topic sections + sidebar -->
<div class="prisma-wrap prisma-main-layout">
	<div class="prisma-main-content">
		<div class="prisma-main-content-inner">
			<?php
			foreach ( $slugs as $slug ) {
				$cat = get_category_by_slug( $slug );
				if ( ! $cat ) {
					continue;
				}
				$topic_q = new WP_Query( array(
					'post_type'      => 'post',
					'posts_per_page' => 8,
					'cat'            => $cat->term_id,
					'post_status'    => 'publish',
					'orderby'        => 'date',
					'no_found_rows'  => true,
				) );
				?>
				<section id="<?php echo esc_attr( $slug ); ?>" class="prisma-topic-section" aria-labelledby="section-<?php echo esc_attr( $slug ); ?>">
					<div class="prisma-section-header">
						<h2 id="section-<?php echo esc_attr( $slug ); ?>"><?php echo esc_html( $cat->name ); ?></h2>
					</div>
					<?php if ( $cat->description ) : ?>
						<p class="section-desc"><?php echo esc_html( $cat->description ); ?></p>
					<?php endif; ?>
					<?php if ( $topic_q->have_posts() ) : ?>
						<ul class="prisma-topic-grid">
							<?php while ( $topic_q->have_posts() ) : $topic_q->the_post(); ?>
								<li>
									<a href="<?php the_permalink(); ?>" class="prisma-topic-card" aria-label="<?php echo esc_attr( sprintf( __( 'Read: %s', 'prismamedia' ), get_the_title() ) ); ?>">
										<div class="thumb">
											<?php if ( has_post_thumbnail() ) : ?>
												<?php the_post_thumbnail( 'medium_large' ); ?>
											<?php else : ?>
												<div style="width:100%;height:100%;background:var(--color-zinc-200);"></div>
											<?php endif; ?>
										</div>
										<p class="date"><?php echo esc_html( get_the_date( 'M j, Y' ) . ' · ' . get_the_time( 'H:i' ) ); ?></p>
										<h3><?php the_title(); ?></h3>
										<p class="dek"><?php echo wp_kses_post( has_excerpt() ? get_the_excerpt() : wp_trim_words( get_the_content(), 20 ) ); ?></p>
									</a>
								</li>
							<?php endwhile; ?>
						</ul>
					<?php endif; ?>
					<?php wp_reset_postdata(); ?>
				</section>
				<?php
			}
			?>
		</div>
	</div>
	<?php get_sidebar(); ?>
</div>

<?php get_footer(); ?>
