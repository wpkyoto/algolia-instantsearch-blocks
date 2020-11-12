
#!/bin/bash
set -eo
npm install
npm run build
zip -r "./algolia-instantsearch-blocks.zip" . -x \.git/\* -x node_modules/\*