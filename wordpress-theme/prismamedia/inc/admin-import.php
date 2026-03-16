<?php
/**
 * Admin page for one-time import from content-export.json.
 *
 * @package PrismaMedia
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

/**
 * Add admin menu.
 */
function prismamedia_import_menu() {
	add_theme_page(
		__( 'PrismaMedia Import', 'prismamedia' ),
		__( 'Import Content', 'prismamedia' ),
		'manage_options',
		'prismamedia-import',
		'prismamedia_import_page'
	);
}
add_action( 'admin_menu', 'prismamedia_import_menu' );

/**
 * Render import page and handle run.
 */
function prismamedia_import_page() {
	if ( ! current_user_can( 'manage_options' ) ) {
		return;
	}

	$result = null;
	if ( isset( $_GET['prismamedia_import_run'] ) && current_user_can( 'manage_options' ) && check_admin_referer( 'prismamedia_import_run' ) ) {
		require_once get_template_directory() . '/inc/class-prismamedia-import.php';
		$result = prismamedia_run_import();
	}

	$json_path = get_template_directory() . '/content-export.json';
	$json_exists = is_readable( $json_path );
	?>
	<div class="wrap">
		<h1><?php esc_html_e( 'PrismaMedia – Import content', 'prismamedia' ); ?></h1>

		<?php if ( $result !== null ) : ?>
			<div class="notice notice-<?php echo $result['success'] ? 'success' : 'error'; ?> is-dismissible">
				<p><?php echo esc_html( $result['message'] ); ?></p>
			</div>
		<?php endif; ?>

		<p><?php esc_html_e( 'This will create categories and posts from the file content-export.json in the theme directory (generated from the Next.js project’s lib/news.ts).', 'prismamedia' ); ?></p>

		<p>
			<?php if ( $json_exists ) : ?>
				<strong><?php esc_html_e( 'File found:', 'prismamedia' ); ?></strong> content-export.json
			<?php else : ?>
				<strong style="color: #b32d2e;"><?php esc_html_e( 'File not found. Please run from the Next.js project:', 'prismamedia' ); ?></strong><br>
				<code>node scripts/export-news-for-wp.cjs</code><br>
				<?php esc_html_e( 'Then copy wordpress-theme/prismamedia/content-export.json into this theme folder.', 'prismamedia' ); ?>
			<?php endif; ?>
		</p>

		<?php if ( $json_exists ) : ?>
			<form method="get" action="">
				<input type="hidden" name="page" value="prismamedia-import">
				<input type="hidden" name="prismamedia_import_run" value="1">
				<?php wp_nonce_field( 'prismamedia_import_run' ); ?>
				<p>
					<button type="submit" class="button button-primary"><?php esc_html_e( 'Run import', 'prismamedia' ); ?></button>
				</p>
			</form>
			<p class="description"><?php esc_html_e( 'Existing posts with the same import ID will be skipped. You can run import again to add new items.', 'prismamedia' ); ?></p>
		<?php endif; ?>
	</div>
	<?php
}
