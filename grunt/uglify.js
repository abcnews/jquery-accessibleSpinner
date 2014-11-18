module.exports = {
	"prod": {
		"options": {
			"preserveComments": "none"
		},
		"files": [{
			"expand": true,
			"cwd": "dist",
			"src": "*.js",
			"dest": "dist"
      }]
	}
};
