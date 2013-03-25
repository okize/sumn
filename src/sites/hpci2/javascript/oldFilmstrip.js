

			// creates the html that compromises the navigation button elements
			// and binds event handlers to navigation buttons
			// var addControls = function() {
			//
















		// adjust the width of the filmstrip container
		// filmstripWidth = (itemsToShow === 1) ? itemWidth : filmstripWindow.outerWidth();

		//var movement = itemsToShow * itemWidth;

		var navigation = {}; // the navigation object
		var pagination = {}; // the pagination object

		// creates the html that compromises the navigation elements
		// inserts itself into dom and binds event handlers to button elements
		var addNavigation = function() {

			// @todo
			navigation.btnPrev = $('<a>', {
				'class': 'filmstripPrevious disabled',
				href: '#',
				title: 'Previous',
				text: 'Previous'
			}).on('click', function (e) {
				e.preventDefault();
				if ( !$(this).hasClass('disabled') ) {
					filmstrip.trigger('filmstrip.move', 'previous');
				}
			});

			// @todo
			navigation.btnNext = $('<a>', {
				'class': 'filmstripNext',
				href: '#',
				title: 'Next',
				text: 'Next'
			}).on('click', function (e) {
				e.preventDefault();
				if ( !$(this).hasClass('disabled') ) {
					filmstrip.trigger('filmstrip.move', 'next');
				}
			});

			// @todo
			navigation.container = $('<div/>', {
				'class': 'filmstripNavigation'
			}).append(navigation.btnPrev, navigation.btnNext);

			// @todo
			filmstrip.append(navigation.container);

		};

		// @todo
		var addPagination = function() {

			var groupIndex = 0;

			var items = [];
			var className = ['active'];

			// @todo
			for (var i = 0; i < itemGroups; i++) {
				items.push('<a href="#" class="' + (className[i] || ' ') + '" data-filmstrip-group="' + i + '">' + (i+1) + '</a>');
			}

			pagination.container = $('<div/>', {
				'class': 'filmstripPagination'
			}).on('click', 'a', function (e) {
				groupIndex = $(this).data('filmstripGroup');
				e.preventDefault();
				filmstrip.trigger('filmstrip.move', groupIndex);
			});

			pagination.items = $(items);

			// @todo
			filmstrip.append(pagination.container.append(items.join('')));

		};

		// @todo
		var moveStrip = function(e, direction) {

			// @todo
			var mover = function() {
				itemsContainer.css('left', -filmstripWidth*itemGroupToShow);
			};

			// @todo
			var selectDot = function(index) {

					// @todo fix var name
					var tmp = pagination.container.find('a');
					tmp.removeClass('active');
					tmp.eq(index).addClass('active');

			};

			// direction is overloaded & can either be a number (item group index) or a string (next/previous)
			if (typeof direction === 'number') {

				// @todo
				if (o.pagination) {
					selectDot(direction);
					itemGroupToShow = direction;
					mover();
				}

			} else {

				// this prevents queue buildup as the filmstrip is shifting position
				//if (!filmstripIsMoving) {

					if (direction === 'previous' && itemGroupToShow > 0) {
						//filmstripIsMoving = true;
						itemGroupToShow--;
						mover();
					}

					if (direction === 'next' && itemGroupToShow < itemGroups - 1) {
						//filmstripIsMoving = true;
						itemGroupToShow++;
						mover();
					}


					if (o.pagination) {
						selectDot(itemGroupToShow);
					}

				//}

			}

			// @todo this sucks; rewrite this next
			if (o.navigation) {

				if (itemGroupToShow === 0) {
					navigation.btnPrev.addClass('disabled');
				} else {
					navigation.btnPrev.removeClass('disabled');
				}
				if (itemGroupToShow === itemGroups - 1) {
					navigation.btnNext.addClass('disabled');
				} else {
					navigation.btnNext.removeClass('disabled');
				}
			}

		};

		// initialize plugin:



		// if navigation is enabled add nav object to the dom
		// if disabled add class to container to indicate such (for css styling purposes)
		if (o.navigation) {
			addNavigation();
		} else {
			filmstrip.addClass('filmstripNoNav');
		}

		// if pagination is enabled add nav object to the dom
		// if disabled add class to container to indicate such (for css styling purposes)
		if (o.pagination) {
			addPagination();
		} else {
			filmstrip.addClass('filmstripNoPagination');
		}

		// bind handlers
		filmstrip.on('filmstrip.move', moveStrip);

		// hacky hack
		var adjust = ((filmstripWidth - (itemGroups*50))/2);
		$('#micrositeContentColumnLeft .filmstripNext').css('margin-right', adjust + 'px');
		$('#micrositeContentColumnLeft .filmstripPrevious').css('margin-left', adjust + 'px');

