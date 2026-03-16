<?php
/**
 * Header template: currency bar, logo, nav, mobile menu.
 *
 * @package PrismaMedia
 */

$rates       = prismamedia_get_currency_rates();
$rates_error = ( $rates === false );
$currencies  = prismamedia_currencies();
?>
<!DOCTYPE html>
<html <?php language_attributes(); ?>>
<head>
	<meta charset="<?php bloginfo( 'charset' ); ?>">
	<meta name="viewport" content="width=device-width, initial-scale=1">
	<?php wp_head(); ?>
</head>
<body <?php body_class(); ?>>
<?php wp_body_open(); ?>

<header class="prisma-header" role="banner">
	<!-- Currency rates: 1 USD -->
	<div class="prisma-currency-bar" aria-label="<?php esc_attr_e( 'Exchange rates per 1 USD', 'prismamedia' ); ?>">
		<div class="prisma-wrap">
			<span class="currency-label">1 USD</span>
			<?php if ( $rates_error ) : ?>
				<span class="rates-unavailable"><?php esc_html_e( 'Rates unavailable', 'prismamedia' ); ?></span>
			<?php elseif ( empty( $rates ) ) : ?>
				<span class="rates-loading"><?php esc_html_e( 'Loading rates…', 'prismamedia' ); ?></span>
			<?php else : ?>
				<?php foreach ( $currencies as $c ) : ?>
					<?php
					if ( ! isset( $rates[ $c['code'] ] ) ) {
						continue;
					}
					$rate  = (float) $rates[ $c['code'] ];
					$value = in_array( $c['code'], array( 'AMD', 'HUF' ), true ) ? (string) round( $rate ) : number_format( $rate, 2 );
					?>
					<span class="currency-item"><?php echo esc_html( $c['symbol'] . ' ' . $value ); ?></span>
				<?php endforeach; ?>
			<?php endif; ?>
		</div>
	</div>

	<div class="prisma-wrap prisma-header-inner">
		<a href="<?php echo esc_url( home_url( '/' ) ); ?>" class="prisma-logo" rel="home">
			Prisma<span>Media</span>
		</a>

		<nav aria-label="<?php esc_attr_e( 'Main navigation', 'prismamedia' ); ?>">
			<?php
			if ( has_nav_menu( 'primary' ) ) {
				wp_nav_menu( array(
					'theme_location' => 'primary',
					'container'      => false,
					'menu_class'     => 'prisma-nav',
					'fallback_cb'    => false,
				) );
			} else {
				$nav_links = array(
					array( 'label' => 'Czech', 'href' => '#czech-republic' ),
					array( 'label' => 'Slovakia', 'href' => '#slovakia' ),
					array( 'label' => 'Hungary', 'href' => '#hungary' ),
					array( 'label' => 'Moldova', 'href' => '#moldova' ),
					array( 'label' => 'Georgia', 'href' => '#georgia' ),
					array( 'label' => 'Armenia', 'href' => '#armenia' ),
				);
				echo '<ul class="prisma-nav"><li>';
				echo implode( '</li><li>', array_map( function ( $link ) {
					return '<a href="' . esc_url( $link['href'] ) . '">' . esc_html( $link['label'] ) . '</a>';
				}, $nav_links ) );
				echo '</li></ul>';
			}
			?>
		</nav>

		<div class="prisma-header-actions">
			<a href="#" class="prisma-btn-subscribe"><?php esc_html_e( 'Subscribe', 'prismamedia' ); ?></a>
			<button type="button" class="prisma-mobile-menu-btn" id="prisma-mobile-menu-btn" aria-expanded="false" aria-controls="prisma-mobile-menu" aria-label="<?php esc_attr_e( 'Open menu', 'prismamedia' ); ?>">
				<svg width="24" height="24" viewBox="0 0 256 256" fill="currentColor" aria-hidden="true"><path d="M224 128a8 8 0 0 1-8 8H40a8 8 0 0 1 0-16h176a8 8 0 0 1 8 8ZM40 72h176a8 8 0 0 0 0-16H40a8 8 0 0 0 0 16Zm176 112H40a8 8 0 0 0 0 16h176a8 8 0 0 0 0-16Z"/></svg>
			</button>
		</div>
	</div>

	<div class="prisma-mobile-menu hidden" id="prisma-mobile-menu" role="dialog" aria-label="<?php esc_attr_e( 'Mobile navigation', 'prismamedia' ); ?>">
		<nav aria-label="<?php esc_attr_e( 'Mobile navigation links', 'prismamedia' ); ?>">
			<ul>
				<?php
				$nav_links = array(
					array( 'label' => 'Czech', 'href' => '#czech-republic' ),
					array( 'label' => 'Slovakia', 'href' => '#slovakia' ),
					array( 'label' => 'Hungary', 'href' => '#hungary' ),
					array( 'label' => 'Moldova', 'href' => '#moldova' ),
					array( 'label' => 'Georgia', 'href' => '#georgia' ),
					array( 'label' => 'Armenia', 'href' => '#armenia' ),
				);
				foreach ( $nav_links as $link ) {
					echo '<li><a href="' . esc_url( $link['href'] ) . '">' . esc_html( $link['label'] ) . '</a></li>';
				}
				?>
			</ul>
			<a href="#" class="prisma-btn-subscribe" style="display: block; margin-top: 1rem; text-align: center;"><?php esc_html_e( 'Subscribe', 'prismamedia' ); ?></a>
		</nav>
	</div>
</header>

<script>
(function() {
	var btn = document.getElementById('prisma-mobile-menu-btn');
	var menu = document.getElementById('prisma-mobile-menu');
	if (!btn || !menu) return;
	btn.addEventListener('click', function() {
		var open = !menu.classList.contains('hidden');
		menu.classList.toggle('hidden', open);
		btn.setAttribute('aria-expanded', !open);
		btn.setAttribute('aria-label', open ? 'Open menu' : 'Close menu');
		document.body.style.overflow = open ? '' : 'hidden';
	});
})();
</script>
