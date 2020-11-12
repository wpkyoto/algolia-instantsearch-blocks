<?php
/**
 * Plugin Name:     Algolia Instantsearch Blocks
 * Description:     Example block written with ESNext standard and JSX support – build step required.
 * Version:         0.1.0
 * Author:          The WordPress Contributors
 * License:         GPL-2.0-or-later
 * License URI:     https://www.gnu.org/licenses/gpl-2.0.html
 * Text Domain:     algolia-instantsearch-blocks
 *
 * @package         aib
 */
class AIB_Blocks {
	function __construct() {
		add_action( 'init', array( $this, 'configure_blocks' ) );
		add_filter( 'block_categories', array( $this, 'configure_block_categories' ), 10, 1 );
	}
	public function configure_blocks() {
		$dir = dirname( __FILE__ );
	
		$script_asset_path = "$dir/build/index.asset.php";
		if ( ! file_exists( $script_asset_path ) ) {
			throw new Error(
				'You need to run `npm start` or `npm run build` for the "aib/algolia-instantsearch-blocks" block first.'
			);
		}
		$index_js     = 'build/index.js';
		$script_asset = require( $script_asset_path );
		wp_register_script(
			'aib-algolia-instantsearch-blocks-block-editor',
			plugins_url( $index_js, __FILE__ ),
			$script_asset['dependencies'],
			$script_asset['version']
		);
		wp_set_script_translations( 'aib-algolia-instantsearch-blocks-block-editor', 'algolia-instantsearch-blocks' );
	
		wp_register_style(
			'aib-algolia-instantsearch-style',
			'https://cdn.jsdelivr.net/npm/instantsearch.css@7.3.1/themes/algolia-min.css'
		);
	
		register_block_type( 'aib/static-related-items', array(
			'editor_script' => 'aib-algolia-instantsearch-blocks-block-editor',
		) );
	}
	public function configure_block_categories( $categories ) {
		return array_merge(
			$categories,
			array(
				array(
					'slug' => 'aib',
					'title' => __( 'Algolia Instantsearch Blocks', 'algolia-instantsearch-blocks' ),
				),
			)
		);
	}
}


class AIB_Settings {
	function __construct() {
		add_action( 'admin_init', array( $this, 'init_settings' ) );
		add_action( 'admin_init', array( $this, 'init_options' ) );
		add_action( 'rest_api_init', array( $this, 'init_options' ) );
	}

	public function init_options() {
		
		register_setting( 'reading', 'aib_algolia_app_id', array(
			'type' => 'string',
			'sanitize_callback' => 'esc_attr',
			'show_in_rest' => true,
		) );
		register_setting( 'reading', 'aib_algolia_searchonly_api_key', array(
			'type' => 'string',
			'sanitize_callback' => 'esc_attr',
			'show_in_rest' => true,
		) );
	}

	public function init_settings() {
		add_settings_section(
			'aib_aloglia_settings',
			__( 'Algolia Instatnsearch Block settings', 'algolia-instantsearch-blocks' ),
			array( $this, 'algolia_setting_description' ),
			'reading',
		);
		add_settings_field(
			'aib_algolia_app_id',
			__( 'Algolia Application ID', 'algolia-instantsearch-blocks' ),
			array( $this, 'algolia_app_id_option' ),
			'reading',
			'aib_aloglia_settings',
		);
		add_settings_field(
			'aib_algolia_searchonly_api_key',
			__( 'Algolia Search Only API Key', 'algolia-instantsearch-blocks' ),
			array( $this, 'algolia_searchonly_apikey_option' ),
			'reading',
			'aib_aloglia_settings',
		);
	}

	public function algolia_setting_description() {
		_e( 'Algolia Instantsearch Blocksの設定を行います。', 'algolia-instantsearch-blocks' );
	}

	public function algolia_app_id_option() {
		?>
		<input
			id="aib_algolia_app_id"
			name="aib_algolia_app_id"
			type="text"
			value="<?php form_option('aib_algolia_app_id'); ?>"
		/><br/>
		<?php
		printf(
			__( 'You need to initialize the client. To do this, you need your <b>Application ID</b>. <br />You can find it on <a href="%s" target="_blank">your Algolia account.</a>', 'algolia-instantsearch-blocks' ),
			'https://www.algolia.com/api-keys'
		);
	}

	public function algolia_searchonly_apikey_option() {
		?>
		<input
			id="aib_algolia_searchonly_api_key"
			name="aib_algolia_searchonly_api_key"
			type="text"
			value="<?php form_option('aib_algolia_searchonly_api_key'); ?>"
		/><br/>
		<?php
		printf(
			__( 'You need to initialize the client. To do this, you need your <b>Search-only API key</b>. <br />You can find it on <a href="%s" target="_blank">your Algolia account.</a>', 'algolia-instantsearch-blocks' ),
			'https://www.algolia.com/api-keys'
		);
	}
}

new AIB_Blocks();
new AIB_Settings();