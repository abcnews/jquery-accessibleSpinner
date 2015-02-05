domready(function () {

	// simulate loading content into immediate area
	// this content is loaded immediately so we don't need to announce it
	var spinner1 = $('#immediate').spinner({
		doAnnouncement: false
	});
	spinner1.spinner('start');
	setTimeout(function() {
		$('#immediate').append('<p>This is the immediate loaded content. This is it. It has loaded.</p>');
		spinner1.spinner('finish');
	}, 500);

	// simulate loading content into additional area
	// this content is loaded by the user so we announce when it has loaded
	var spinner2 = $('#additional').spinner();
	$('#moreContentLink').click(function() {
		spinner2.spinner('start');
		setTimeout(function() {
			$('#additional').append('<p>This is the additional loaded content. This is it. It has loaded.</p>');
			spinner2.spinner('finish');
		}, 3000);
		return false;
	});

	// simulate loading content into a third area (and allow it to be refreshed)
	// this content is loaded immediately so we don't need to announce it
	var spinner3 = $('#immediate_refresh').spinner({
		doAnnouncement: false
	});
	spinner3.spinner('start');
	setTimeout(function() {
		$('#immediate_refresh').append('<p>This is the immediate loaded content. This is it. It has loaded.</p>');
		spinner3.spinner('finish');
	}, 500);
	// but if the user clicks the link to refresh the content we want to ask them to wait and then announce when it has loaded.
	$('#immediate_refresh_link').click(function() {
		spinner3.spinner('setOptions', {
			doAnnouncement: true
		});
		spinner3.spinner('start');
		setTimeout(function() {
			$('#immediate_refresh').append('<p>This is the refreshed content. This is it. It has loaded.</p>');
			spinner3.spinner('finish');
		}, 3000);
		return false;
	});

});