(function($) {

$(function() {

var slider = $('.slider');
var cloths = slider.find('div:eq(1) > div');
var buttons = slider.find('button');

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
	
	prevArrow: buttons.eq(0),
	nextArrow: buttons.eq(1)
	
});

});

})(jQuery);
