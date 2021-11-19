=== Search with Algolia Instantsearch Blocks ===
Contributors:      hideokamoto
Tags:              block, algolia, instantsearch
Requires at least: 5.5
Tested up to: 5.8.2
Requires PHP: 7.2
License:           GPL-2.0-or-later
License URI:       https://www.gnu.org/licenses/gpl-2.0.html

Adding algolia backend search feature to the block editor.

== Description ==
This plugin provides two features:

- Site search form and its result block.
- List of related items block.

=== Static related items block ===
Add site search form and its result block in anywhere

This custom block displays most related posts with title, tags and categories. Every time you save changes on the post, the plugin also saves search results to WordPress database, so no additional API calls occur on the frontend.  
Applying the latest related posts to the posts, you should edit a post and re-save changes, and thanks for this, it has a considerable advantage: the minimum API calls.  
Also, you can handle anything, such as keyword filtering or numbers of posts to display.

=== Instant search block ===
Add a list of related posts block.
This custom bock displays the site search form and its result page. Simple and easy to use instant search block which is fully customisable (numbers of result, contents of list and its form style ).


== Installation ==

=== Indexing data ===
- Install WP Search with Algolia ( https://wordpress.org/plugins/wp-search-with-algolia/ )
- Get API keys from Algolia search
- Indexing data to Algolia
- That's all

=== Embedding search form ===
- Install or upload this plugin on the plugin page in WordPress dashboard
- Input Algolia's App ID/API Key in Setting => Reading menu.
- Add `Static Related Items` and `Instantsearch`block to the posts or pages.
- Modify numbers of suggests in the posts or indexing
- Save changes and publish it.


== Changelog ==

= 0.2.0 =
* [Feature] Support auto-complete attribute

= 0.1.4 =
* [Bug fix] Tag / Category visibility

= 0.1.0 =
* Release
