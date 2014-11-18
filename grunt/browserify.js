module.exports = {
	"options": {
		"bundleOptions": {
			"bare": true,
			"standalone": "AccessibleSpinner"
		}
	},
	"dev": {
		"options": {
			"debug": true
		},
		"files": {
			"build/scripts/accessible-spinner.js": ["src/scripts/accessible-spinner.js"]
		}
	},
	"prod": {
		"files": {
			"dist/accessible-spinner.min.js": ["src/scripts/accessible-spinner.js"]
		}
	}
};
