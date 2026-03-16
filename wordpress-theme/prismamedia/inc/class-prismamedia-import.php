<?php
/**
 * One-time content import from content-export.json (from Next.js lib/news.ts).
 *
 * @package PrismaMedia
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

/**
 * Run import: create categories and posts from content-export.json.
 *
 * @return array{success: bool, message: string, created_cats: int, created_posts: int}
 */
function prismamedia_run_import() {
	$json_path = get_template_directory() . '/content-export.json';
	if ( ! is_readable( $json_path ) ) {
		return array(
			'success'       => false,
			'message'       => __( 'File content-export.json not found in theme directory.', 'prismamedia' ),
			'created_cats'  => 0,
			'created_posts' => 0,
		);
	}

	$json = file_get_contents( $json_path );
	$data = json_decode( $json, true );
	if ( ! is_array( $data ) || empty( $data ) ) {
		return array(
			'success'       => false,
			'message'       => __( 'Invalid or empty content-export.json.', 'prismamedia' ),
			'created_cats'  => 0,
			'created_posts' => 0,
		);
	}

	$created_cats  = 0;
	$created_posts = 0;
	$cat_ids       = array();

	foreach ( $data as $section ) {
		$slug = isset( $section['id'] ) ? $section['id'] : '';
		$label = isset( $section['label'] ) ? $section['label'] : $slug;
		$description = isset( $section['description'] ) ? $section['description'] : '';
		$items = isset( $section['items'] ) && is_array( $section['items'] ) ? $section['items'] : array();

		if ( ! $slug ) {
			continue;
		}

		$term = get_term_by( 'slug', $slug, 'category' );
		if ( ! $term ) {
			$result = wp_insert_term( $label, 'category', array(
				'slug'        => $slug,
				'description' => $description,
			) );
			if ( ! is_wp_error( $result ) ) {
				$cat_ids[ $slug ] = (int) $result['term_id'];
				$created_cats++;
			} else {
				continue;
			}
		} else {
			$cat_ids[ $slug ] = (int) $term->term_id;
			if ( $description ) {
				wp_update_term( $term->term_id, 'category', array( 'description' => $description ) );
			}
		}

		foreach ( $items as $item ) {
			$post_id = isset( $item['id'] ) ? prismamedia_get_post_by_meta( $item['id'] ) : 0;
			if ( $post_id ) {
				continue;
			}

			$title = isset( $item['title'] ) ? $item['title'] : '';
			$dek   = isset( $item['dek'] ) ? $item['dek'] : '';
			$body  = isset( $item['body'] ) ? $item['body'] : $dek;
			$published_at = isset( $item['publishedAt'] ) ? $item['publishedAt'] : '';

			$post_date = prismamedia_parse_published_at( $published_at );

			$post_data = array(
				'post_title'   => $title,
				'post_content' => $body,
				'post_excerpt' => $dek,
				'post_status'  => 'publish',
				'post_type'    => 'post',
				'post_date'    => $post_date,
				'post_author'  => get_current_user_id() ? get_current_user_id() : 1,
			);

			$new_id = wp_insert_post( $post_data, true );
			if ( ! is_wp_error( $new_id ) ) {
				wp_set_post_categories( $new_id, array( $cat_ids[ $slug ] ) );
				if ( ! empty( $item['id'] ) ) {
					update_post_meta( $new_id, '_prisma_import_id', $item['id'] );
				}
				if ( ! empty( $item['dateline'] ) ) {
					update_post_meta( $new_id, '_prisma_dateline', $item['dateline'] );
				}
				if ( ! empty( $item['imageUrl'] ) ) {
					update_post_meta( $new_id, '_prisma_image_url', $item['imageUrl'] );
				}
				$created_posts++;
			}
		}
	}

	return array(
		'success'       => true,
		'message'       => sprintf(
			/* translators: 1: categories count, 2: posts count */
			__( 'Import complete. Created %1$d categories and %2$d posts.', 'prismamedia' ),
			$created_cats,
			$created_posts
		),
		'created_cats'  => $created_cats,
		'created_posts' => $created_posts,
	);
}

/**
 * Find post by legacy import id meta.
 *
 * @param string $import_id
 * @return int 0 if not found.
 */
function prismamedia_get_post_by_meta( $import_id ) {
	$q = new WP_Query( array(
		'post_type'      => 'post',
		'posts_per_page' => 1,
		'meta_key'       => '_prisma_import_id',
		'meta_value'     => $import_id,
		'fields'         => 'ids',
	) );
	return $q->have_posts() ? (int) $q->posts[0] : 0;
}

/**
 * Parse "Mar 13, 2025 · 16:29" into MySQL date.
 *
 * @param string $str
 * @return string
 */
function prismamedia_parse_published_at( $str ) {
	$str = trim( $str );
	if ( empty( $str ) ) {
		return current_time( 'mysql' );
	}
	$parts = preg_split( '/\s*[·•]\s*/', $str, 2 );
	$date_part = trim( $parts[0] );
	$time_part = isset( $parts[1] ) ? trim( $parts[1] ) : '12:00';
	$time_part = preg_replace( '/[^\d:]/', '', $time_part );
	if ( strlen( $time_part ) === 4 ) {
		$time_part = substr( $time_part, 0, 2 ) . ':' . substr( $time_part, 2, 2 );
	}
	$stamp = strtotime( $date_part . ' ' . $time_part );
	return $stamp ? gmdate( 'Y-m-d H:i:s', $stamp ) : current_time( 'mysql' );
}
