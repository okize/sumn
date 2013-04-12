$(document).on('ready', function () {

	$('.carouselSlideProjector').slideProjectorCarousel({
		autoplay: true,
		autoplaySpeed: 5000,
		slidesToShow: 3
	});

	$('.contentNavigationCarousel').contentNavigationCarousel({
		autoplay: true,
		autoplaySpeed: 10000,
		mouseEvent: 'hover',
		switchSpeed: 500,
		equalizeHeights: true
	});

	$('#filmstripWithoutNav').filmstripCarousel({
		navigation: false,
		pagination: true,
		speed: 500
	});

	$('#filmstripWithoutPag').filmstripCarousel({
		navigation: true,
		pagination: false,
		speed: 500
	});

	$('.filmstrip').filmstripCarousel({
		navigation: true,
		pagination: true,
		speed: 500
	});

	// styled scrollbars
	$('.micrositeModuleFeaturedOutput').jScrollPane();

});

