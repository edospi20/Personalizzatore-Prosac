(function($) {

var data = {};
data.cloths = ['./img/color0.png', './img/color1.png', './img/color3.png', './img/color5.png', './img/color7.png', './img/color9.png', './img/color10.png', './img/color2.png', './img/color4.png', './img/color6.png', './img/color8.png'];

$.fn.appendItems = function(items) {
	for (var k = 0; k < items.length; ++k)
		this.append('<li style="background-image: url(\'' + items[k] + '\');"></li>');
};

$(function() {
	
// $.getJSON('./php/ajax.php', {request: 'init'}, function (data) {

var cloths = $('#cloths');

cloths.children('ul').appendItems(data.cloths);
cloths.flipster({
	itemContainer: 'ul',
	itemSelector: 'li',
	start: 0,
	fadeIn: 500,
	loop: true,
	style: 'flat',
	spacing: 0.2,
	click: true,
	keyboard: true,
	scrollwheel: true,
	touch: true,
	nav: false,
	buttons: true,
	buttonPrev: '<',	
	buttonNext: '>'
});

// });
	
});

})(jQuery);
