
#!/bin/bash
set -eo
npm install
npm run build
wget https://cdn.jsdelivr.net/npm/instantsearch.css@7.3.1/themes/reset-min.css -P build  
wget https://cdn.jsdelivr.net/npm/instantsearch.css@7.3.1/themes/algolia-min.css -P build  
zip -r "./algolia-instantsearch-blocks.zip" . -x \.git/\* -x node_modules/\*