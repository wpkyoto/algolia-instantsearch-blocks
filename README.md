# Algolia Instantsearch block

## Getting started

```bash
% git clone git@github.com:digitalcube/algolia-instantsearch-blocks.git 
% cd algolia-instantsearch-blocks
% nvm use   # Node.js 22 (see .nvmrc)
% npm ci
% npm start
```

## Checks

```bash
% npm run lint:js
% npm run build   # runs tsc, then wp-scripts build
```

This project uses npm only (`package-lock.json`). Do not add a `yarn.lock`.

## Start WordPress using wp-env

We can control a local WordPress by these command.

```bash
# Start WordPress
% npm run wp:start

# Stop WordPress
% npm run wp:stop

# Delete WordPress
% npm run wp:destroy

# Execute WP-CLI on the WordPress container
% npm run wp:cli help
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