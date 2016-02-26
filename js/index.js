(function($) {

$(function() {

var cloths = $('#cloths');

cloths.slick({
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
	
	// TODO: LE FRECCE NON FUNZIANOH
	
	prevArrow: '<button type="button" class="slick-prev">&lt;</button>',
	nextArrow: '<button type="button" class="slick-prev">&gt;</button>',
	
});

});

})(jQuery);
