$(document).ready(function() {
	// tabs
	$.featureList(
		$(".micrositeModuleFeaturedTabs li a"),
		$(".micrositeModuleFeaturedOutput li.micrositeFeaturedDataRecovery, .micrositeModuleFeaturedOutput li.micrositeFeaturedScalability, .micrositeModuleFeaturedOutput li.micrositeFeaturedStorage, .micrositeModuleFeaturedOutput li.micrositeFeaturedVirtualStorage"), {
			start_item	:	0
		}
	);
	// ie fixes
	$('.micrositeFeaturedRelated ul li h4:nth-child(2)').css({ padding: "0 0 10px 0" });
	$('.micrositeModuleFeatured > ul').css({ position: "absolute" });
	$('ul.micrositeModuleFeaturedOutput > li').css({ padding: "20px" });

});