# accessible-spinner

A simple JQuery plugin that replaces content with a spinner.

A plugin for a spinner? What is this, 2003?

We've made this a plugin so that we have a consistent way to handle loading spinners that include some additional
notifications for accessibility. When the spinner is added, it includes a message informing the user to wait while the
content loads. Then when the content loads (or rather when the finish method is called) an aria status message announces
that the content has loaded.

## Dependencies

* JQuery (cause it's a JQuery plugin)

For development you'll need [Node.js](http://nodejs.org/download/) and the dependencies managed via package.json.

## Demo

Take a look at the [demo page](build/demo.js) that is included in the project.

**Note:** The styling for the demo page has been included more to show how the messaging and notifications work than for
presentation. You'll want to do your own styling.

## Usage

Because this project has been set up taking into account the fact that JQuery might not always be loaded before the
plugin. So before anything you'll need to enable the plugin.

	AccessibleSpinner.installPlugin();

**Note:** You can choose a different global variable by changing the browserify task and rebuilding (see below).

You can then instantiate the spinner like so:

	var spinner1 = $('#loadHere').spinner();
	var spinner2 = $('#loadHere').spinner({
		doAnnouncement: false
	});

### Options

	AccessibleSpinner.DEFAULTS = {
		spinnerText: 'Loading...',
		// The text used for the spinner (generally hidden with CSS)

		spinnerClass: 'spinner',
		// The class applied to the html of the spinner

		spinnerTemplate: '<div class="{{spinnerClass}}">{{spinnerText}}</div>',
		// Handlebars-like template for the spinner. {{spinnerClass}} and {{spinnerText}} are replaced.

		ariaStatusText: 'Please wait. We will alert when the content has loaded.',
		// The text used to explain to screen reader users that they should wait here until the content has loaded.

		ariaAnnounceText: 'The content has loaded.',
		// The text that is announced (using aria-live) when the content has loaded (or rather when the finish method is called).

		accessibilityHideClass: 'accessibility',
		// The class used for hiding content from sighted users but making it available to screen readers.

		doAnnouncement: true
		// Whether or not to do the announcement (i.e. whether or not to use the aria-live region).
	};

** Note about doAnnouncement: ** When content is being loaded immediately and in multiple places, it could be
confusing to announce it. It's generally better to do announcements when content is loaded in response to a user action.

### Methods

#### start

`spinner1.spinner('start');`

Sets the spinner spinning (and includes screen reader text if the `doAnnouncement` option is set to true).

#### finish

`spinner1.spinner('finish');`

Stops the spinner spinning (an announces to a screen reader if `doAnnouncement` option is set to true).

#### setOptions

	spinner2.spinner('setOptions', {
		doAnnouncement: true
	});

Allows you to set options on the spinner after it has been instantiated. Useful for toggling `doAnnouncement`. For
example if content is loaded immediately you might not announce but then if the content can be refreshed or changed
via AJAX you might now want to announce.

## Getting started

AccessibleSpinner can be used in any browserify project out of the box. Just `require()` it.

For global browser environments, you can use add one of the JavaScript files in the `dist` folder to your page.

Remember that you'll need to instantiate the plugin before you can use it: `AccessibleSpinner.installPlugin();`.

**Note:** No styling has been included in this library. It's up to you to style the spinner however you want.

### Develop

Run `npm install` to locally install Node package dependencies, then run the default `grunt` task which:

* Runs `grunt dev` to create a development build (see Tasks, below)
* Starts up a development server in the build directory, running on [http://localhost:8000](http://localhost:8000)
* Watches files under `src/` for changes, triggering partial development builds as required

### Build

Run `grunt build` to build the project. This will create new versions of the js files in the dist folder.
