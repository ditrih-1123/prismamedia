<?php
/**
 * PrismaMedia theme functions and setup.
 *
 * @package PrismaMedia
 * @version 1.0.0
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

define( 'PRISMAMEDIA_VERSION', '1.0.0' );

/**
 * Theme setup.
 */
function prismamedia_setup() {
	add_theme_support( 'title-tag' );
	add_theme_support( 'post-thumbnails' );
	add_theme_support( 'html5', array( 'search-form', 'comment-form', 'comment-list', 'gallery', 'caption', 'style', 'script' ) );
	add_theme_support( 'customize-selective-refresh-widgets' );

	register_nav_menus( array(
		'primary' => __( 'Primary (Countries)', 'prismamedia' ),
	) );

	register_sidebar( array(
		'name'          => __( 'Sidebar', 'prismamedia' ),
		'id'            => 'sidebar-1',
		'description'   => __( 'If widgets are added here, they replace the default Latest / Trust in PMs / Latest digest blocks.', 'prismamedia' ),
		'before_widget' => '<div id="%1$s" class="widget %2$s">',
		'after_widget'  => '</div>',
		'before_title'  => '<h3 class="widget-title">',
		'after_title'   => '</h3>',
	) );
}
add_action( 'after_setup_theme', 'prismamedia_setup' );

/**
 * Enqueue scripts and styles.
 */
function prismamedia_scripts() {
	wp_enqueue_style(
		'prismamedia-style',
		get_stylesheet_uri(),
		array(),
		PRISMAMEDIA_VERSION
	);
}
add_action( 'wp_enqueue_scripts', 'prismamedia_scripts' );

/**
 * Get currency rates from API with transient cache (1 hour).
 *
 * @return array|false Associative array of code => rate, or false on failure.
 */
function prismamedia_get_currency_rates() {
	$cache_key = 'prismamedia_currency_rates';
	$rates     = get_transient( $cache_key );

	if ( false !== $rates && is_array( $rates ) ) {
		return $rates;
	}

	$response = wp_remote_get( 'https://cdn.moneyconvert.net/api/latest.json', array(
		'timeout' => 10,
	) );

	if ( is_wp_error( $response ) || wp_remote_retrieve_response_code( $response ) !== 200 ) {
		return false;
	}

	$body = wp_remote_retrieve_body( $response );
	$data = json_decode( $body, true );

	if ( empty( $data['rates'] ) || ! is_array( $data['rates'] ) ) {
		return false;
	}

	$rates = $data['rates'];
	set_transient( $cache_key, $rates, HOUR_IN_SECONDS );

	return $rates;
}

/**
 * Currencies to show in header (site countries).
 *
 * @return array
 */
function prismamedia_currencies() {
	return array(
		array( 'code' => 'EUR', 'symbol' => '€' ),
		array( 'code' => 'CZK', 'symbol' => 'Kč' ),
		array( 'code' => 'HUF', 'symbol' => 'Ft' ),
		array( 'code' => 'MDL', 'symbol' => 'L' ),
		array( 'code' => 'GEL', 'symbol' => '₾' ),
		array( 'code' => 'AMD', 'symbol' => '֏' ),
	);
}

/**
 * Hungary polls data (party name, value %, bar color class).
 *
 * @return array
 */
function prismamedia_hungary_polls() {
	return array(
		array( 'name' => 'Democratic Coalition', 'value' => 4, 'color' => 'blue' ),
		array( 'name' => 'Fidesz–KDNP', 'value' => 39, 'color' => 'orange' ),
		array( 'name' => 'Our Homeland', 'value' => 7, 'color' => 'emerald' ),
		array( 'name' => 'Tisza', 'value' => 49, 'color' => 'teal' ),
		array( 'name' => 'Two-Tailed Dog Party', 'value' => 3, 'color' => 'purple' ),
	);
}

/**
 * Trust in prime ministers data.
 *
 * @return array
 */
function prismamedia_trust_pms() {
	return array(
		array( 'name' => 'Andrej Babiš', 'country' => 'Czech Republic', 'image' => 'Babish.png', 'trust' => 38, 'distrust' => 52 ),
		array( 'name' => 'Robert Fico', 'country' => 'Slovakia', 'image' => 'Fico.png', 'trust' => 32, 'distrust' => 56 ),
		array( 'name' => 'Viktor Orbán', 'country' => 'Hungary', 'image' => 'Orban.png', 'trust' => 41, 'distrust' => 53 ),
		array( 'name' => 'Oleksandr Muntianu', 'country' => 'Moldova', 'image' => 'Muntianu.png', 'trust' => 42, 'distrust' => 44 ),
		array( 'name' => 'Irakli Kobakhidze', 'country' => 'Georgia', 'image' => 'Kobahidze.png', 'trust' => 28, 'distrust' => 62 ),
		array( 'name' => 'Nikol Pashinyan', 'country' => 'Armenia', 'image' => 'Pashynyan.png', 'trust' => 16, 'distrust' => 65 ),
	);
}

/**
 * Oil prices (static; can be replaced with API later).
 *
 * @return array
 */
function prismamedia_oil_prices() {
	return array(
		array( 'label' => 'Brent', 'value' => 82.4, 'unit' => 'USD/bbl' ),
		array( 'label' => 'WTI', 'value' => 78.1, 'unit' => 'USD/bbl' ),
	);
}

/**
 * EU direction approval by country (site countries only).
 *
 * @return array
 */
function prismamedia_eu_approval() {
	return array(
		array( 'country' => 'Czech Republic', 'approve' => 45, 'disapprove' => 38 ),
		array( 'country' => 'Slovakia', 'approve' => 38, 'disapprove' => 44 ),
		array( 'country' => 'Hungary', 'approve' => 35, 'disapprove' => 52 ),
		array( 'country' => 'Moldova', 'approve' => 58, 'disapprove' => 28 ),
		array( 'country' => 'Georgia', 'approve' => 62, 'disapprove' => 24 ),
		array( 'country' => 'Armenia', 'approve' => 41, 'disapprove' => 36 ),
	);
}

/**
 * Category slugs used as topic sections (in order). Must match categories created by migration.
 *
 * @return array
 */
function prismamedia_topic_slugs() {
	return array( 'czech-republic', 'slovakia', 'hungary', 'moldova', 'georgia', 'armenia' );
}

/**
 * Load admin import page.
 */
if ( is_admin() ) {
	require_once get_template_directory() . '/inc/admin-import.php';
}
