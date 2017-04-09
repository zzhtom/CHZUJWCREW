/*
	Radius by TEMPLATED
	templated.co @templatedco
	Released for free under the Creative Commons Attribution 3.0 license (templated.co/license)
*/

(function ($) {

	skel.breakpoints({
		xlarge: '(max-width: 1680px)',
		large: '(max-width: 1280px)',
		medium: '(max-width: 980px)',
		small: '(max-width: 736px)',
		xsmall: '(max-width: 480px)'
	});

	$(function () {

		var $window = $(window),
			$body = $('body'),
			$header = $('#header'),
			$footer = $('#footer');

		// Disable animations/transitions until the page has loaded.
		$body.addClass('is-loading');

		$window.on('load', function () {
			window.setTimeout(function () {
				$body.removeClass('is-loading');
			}, 100);
		});

		// Fix: Placeholder polyfill.
		$('form').placeholder();

		// Prioritize "important" elements on medium.
		skel.on('+medium -medium', function () {
			$.prioritize(
				'.important\\28 medium\\29',
				skel.breakpoint('medium').active
			);
		});

		// Header.
		$header.each(function () {

			var t = jQuery(this),
				button = t.find('.button');
			var random = $.getUrlParam('random');
			if(random != null){
				t.toggleClass('hide');
			}
			button.click(function (e) {
				if (t.hasClass('hide')) {
					return true;
				} else {
					t.toggleClass('hide');
					e.preventDefault();
				}
				if (t.hasClass('preview')) {
					return true;
				}

			});

		});

		// Footer.
		$footer.each(function () {

			var t = jQuery(this),
				inner = t.find('.inner'),
				button = t.find('.info');

			button.click(function (e) {
				t.toggleClass('show');
				e.preventDefault();
			});

		});

	});

	//extend function
	$.getUrlParam = function (name) {
		var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
		var r = window.location.search.substr(1).match(reg);
		if (r != null) return unescape(r[2]); return null;
	}

})(jQuery);