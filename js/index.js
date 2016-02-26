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
	slide: 'li',
	slidesToShow: 3,
	slidesToScroll: 3,
	useCSS: true
});

});

})(jQuery);
