<?php
/**
 * Plugin Name:       Simple Google Maps Gutenberg Block
 * Description:       A Gutenberg block to embed your Google Maps on a quickly and efficient way.
 * Requires at least: 6.1
 * Requires PHP:      7.0
 * Version:           0.1.0
 * Author:            Ramsés Del Rosario
 * License:           GPL-2.0-or-later
 * License URI:       https://www.gnu.org/licenses/gpl-2.0.html
 * Text Domain:       simple-gmaps
 *
 * @package           create-block
 */

/**
 * Registers the block using the metadata loaded from the `block.json` file.
 * Behind the scenes, it registers also all assets so they can be enqueued
 * through the block editor in the corresponding context.
 *
 * @see https://developer.wordpress.org/reference/functions/register_block_type/
 */
function simple_gmaps_init() {
	register_block_type( __DIR__ . '/build' );
}
add_action( 'init', 'simple_gmaps_init' );

/**
 * Create the admin menu to manage the Google Maps API Key.
 *
 */
function simple_gmaps_add_menu() {
	add_submenu_page(
		'options-general.php',
		'Google Maps Settings',
		'Google Maps Settings',
		'manage_options',
		'simplegmaps',
		'simple_gmaps_page_html'
	);
}

add_action( 'admin_menu', 'simple_gmaps_add_menu' );

/**
 * custom option and settings
 */
function simplegmaps_settings_init() {
	// Register a new setting for "simplegmaps" page.
	register_setting( 'simplegmaps', 'simplegmaps_api_key' );
}

/**
 * Register our simplegmaps_settings_init to the admin_init action hook.
 */
add_action( 'admin_init', 'simplegmaps_settings_init' );

/**
 * Generates the HTML form to render the results.
 */
function simple_gmaps_page_html() {
	if ( ! current_user_can( 'manage_options' ) ) {
		return;
	}
	?>
	<div class="wrap">
		<h1><?php echo esc_html( get_admin_page_title() ); ?></h1>
		<form action="options.php" method="post">
			<?php settings_fields( 'simplegmaps' ); ?>
			<label for="simplegmaps_api_key"><?php echo esc_html_e( 'Google Maps API Key:', 'simplegmaps' ); ?></label>
			<input size="60" name="simplegmaps_api_key" value="<?php echo esc_attr( get_option( 'simplegmaps_api_key' ) ); ?>"/>
			<p>
				<?php esc_html_e( 'You take the blue pill and the story ends. You wake in your bed and you believe whatever you want to believe.', 'simplegmaps' ); ?>
			</p>
			<?php submit_button( 'Save Settings' ); ?>
		</form>
	</div>
	<?php
}

add_action( 'rest_api_init', function() {
	register_rest_route( 'simple-gmaps/v1', '/apikey', [
		'method'   => 'GET',
		'callback' => 'simple_gmaps_get_apikey'
	]);
});

/**
 * Returns the google maps API Key Stored on the options.
 */
function simple_gmaps_get_apikey( $data ) {
	$response = get_option( 'simplegmaps_api_key' );
	return rest_ensure_response( $response );
}

