!function(e){if("object"==typeof exports&&"undefined"!=typeof module)module.exports=e();else if("function"==typeof define&&define.amd)define([],e);else{var n;"undefined"!=typeof window?n=window:"undefined"!=typeof global?n=global:"undefined"!=typeof self&&(n=self),n.AccessibleSpinner=e()}}(function(){var define,module,exports;return (function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);throw new Error("Cannot find module '"+o+"'")}var f=n[o]={exports:{}};t[o][0].call(f.exports,function(e){var n=t[o][1][e];return s(n?n:e)},f,f.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(_dereq_,module,exports){
/**
 * accessible-spinner
 * A simple JQuery plugin that replaces content with a spinner and includes some accessibility features.
 *
 * @version 0.0.0
 * @author Peter Chappell <chappell.peter@abc.net.au>
 * */

function AccessibleSpinner(element, options) {
	this.element    =
	this.$element   =
	this.options    =
	this._defaults  = null;

	this.init(element, options);
}

AccessibleSpinner.VERSION = '0.1';

AccessibleSpinner.DEFAULTS = {
	spinnerText: 'Loading...',
	spinnerClass: 'spinner',
	spinnerTemplate: '<div class="{{spinnerClass}}">{{spinnerText}}</div>',
	ariaStatusText: 'Please wait. We will alert when the content has loaded.',
	ariaAnnounceText: 'The content has loaded.',
	accessibilityHideClass: 'accessibility',
	doAnnouncement: true
};


/* METHODS */

AccessibleSpinner.prototype = {

	init: function (element, options) {
		this.element = element;
		this.$element = $(element);
		this.options = this.getOptions(options);

		this.setAccessibleSpinnerHtml();
	},

	setAccessibleSpinnerHtml: function() {
		this.spinnerHtml = this.options.spinnerTemplate.replace('{{spinnerClass}}', this.options.spinnerClass).replace('{{spinnerText}}', this.options.spinnerText);
		if (this.options.doAnnouncement) {
			this.spinnerHtml += '<div role="alert" class="' + this.options.accessibilityHideClass + ' announcement">' + this.options.ariaStatusText + '</div>';
		}
	},

	getDefaults: function () {
		return AccessibleSpinner.DEFAULTS;
	},

	getOptions: function (options) {
		options = $.extend({}, this.getDefaults(), this.$element.data(), options);
		return options;
	},

	// use for setting new options on the plugin (options can be changed between start/stop)
	setOptions: function(newOptions) {
		console.log('setting options', newOptions);
		this.options = $.extend({}, this.options, newOptions);
		this.setAccessibleSpinnerHtml();
	},

	// start the spinner spinning
	start: function() {
		console.log('START METHOD CALLED', this.$element.attr('id'), this.spinnerHtml);
		this.$element.html(this.spinnerHtml);
	},

	// finish the spinner (and announce)
	finish: function() {
		var $spinner,
			$announcement;

		$spinner = $('.' + this.options.spinnerClass, this.$element);

		if (this.options.doAnnouncement) {
			$announcement = $('.announcement', this.$element);
			$spinner.hide();
			$announcement.text(this.options.ariaAnnounceText);
			setTimeout(function() {
				$announcement.hide();
			}, 2000);
		} else {
			$spinner.hide();
		}
	}

};



/* PLUGIN DEFINITION */

function Plugin(arg1, methodOptions) {
	return this.each(function () {
		var $this, dataKey, data, method, options;

		$this   = $(this);
		dataKey = 'plugin-spinner';
		data    = $this.data(dataKey);
		if (typeof arg1 === 'object') {
			options = arg1;
		} else {
			options = methodOptions;
			method = arg1;
		}

		console.group('Plugin:');
		console.log('id', $this.attr('id'));
		console.log('method', method);
		console.log('options', options);
		console.log('this', this);
		console.groupEnd();

		if (!data && method === 'destroy') {
			return;
		}
		if (!data) {
			$this.data(dataKey, (data = new AccessibleSpinner(this, options)));
		}
		if (typeof method === 'string') {
			data[method](options);
		}
	});
}



/* INSTALLATION */

AccessibleSpinner.isPluginInstalled = false;

AccessibleSpinner.installPlugin = function installPlugin() {

	if (AccessibleSpinner.isPluginInstalled) {
		return;
	}

	var old = $.fn.spinner;

	$.fn.spinner = Plugin;
	$.fn.spinner.Constructor = AccessibleSpinner;

	// no conflict
	$.fn.spinner.noConflict = function () {
		$.fn.spinner = old;
		return this;
	};

	AccessibleSpinner.isPluginInstalled = true;
};

/* EXPORT */

module.exports = AccessibleSpinner;


},{}]},{},[1])
(1)
});