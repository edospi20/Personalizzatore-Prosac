(function($) {

	$(function() {

		$('.slider').each(function() {
			var $this = $(this);	//Identifica il singolo elemento che è dentro slider
			var slider = $this.find('div:nth-of-type(2) > div');
			var buttons = $this.find('button');
			
			slider.slick({
				accessibility: true,
				arrows: true,
				dots: true,
				focusOnSelect: true,
				infinite: true,
				initialSlide: 0,
				lazyLoad: 'progressive',
				slide: 'div',
				slidesToShow: 3,
				slidesToScroll: 3,
				useCSS: true,				
				prevArrow: buttons.eq(0),
				nextArrow: buttons.eq(1)	
			});
		});
	});
})(jQuery);
