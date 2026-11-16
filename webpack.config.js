const path = require( 'path' );
const defaultConfig = require( '@wordpress/scripts/config/webpack.config' );

// @wordpress/scripts compiles TypeScript (.ts/.tsx) out of the box; only the
// entry points need to be declared because there is no block.json per block.
module.exports = {
	...defaultConfig,
	entry: {
		index: path.resolve( process.cwd(), 'src', 'index.tsx' ),
		front: path.resolve( process.cwd(), 'src', 'front.tsx' ),
	},
};
