module.exports = {
	"version": {
		"options": {
			"patterns": [
				{
					"match": "current_version",
					"replacement": "<%= pkg.version %>"
				}
			]
		},
		//"src": ["build/**/*.js"],
		"files": [
			{"expand": false, "flatten": false, "src": ["build/**/*.js"], "dest": ["build/**/*.js"]}
		]
	}
};
