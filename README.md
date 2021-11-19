# Algolia Instantsearch block

## Getting started

```bash
% git clone git@github.com:digitalcube/algolia-instantsearch-blocks.git 
% cd algolia-instantsearch-blocks
% yarn
% yarn postinstall
% yarn start
```

## Start WordPress using wp-env

We can control a local WordPress by these command.

```bash
# Start WordPress
% yarn wp:start

# Steop WordPress
% yarn wp:stop

# Delete WordPress
% yarn wp:destroy

# Execute WP-CLI on the WordPress container
% yarn wp:cli help
```

## Release

```bash
% git pull origin main
% npm version [major|minor|patch]
# Update the plugin version
% vim algolia-instantsearch-blocks.php
# Update changelog
% vim readme.txt
% git push origin main --tags
```

When push the latest tag and publish the release in GitHub, the GitHub action will release the plugin to wp.org automatically.