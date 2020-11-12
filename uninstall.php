<?php
if (!defined('WP_UNINSTALL_PLUGIN')) {
    die;
}

delete_option( 'aib_algolia_app_id' );
delete_option( 'aib_algolia_searchonly_api_key' );