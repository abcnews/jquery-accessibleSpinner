module.exports = {
	"static": {
		"files": [{
			"expand": true,
			"cwd": "src/",
			"src": ["**/*", "!scripts/**"],
			"dest": "build/"
		}]
	},
	"build": {
		"files": [{
			"expand": true,
			"cwd": "build/scripts",
			"src": ["accessible-spinner.js"],
			"dest": "dist/"
		}]
	}
};
