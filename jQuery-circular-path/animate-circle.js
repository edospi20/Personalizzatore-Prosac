
var init = function() {
	var images = [];
	for (var k = 0; k < 11; ++k)
		images.push('./jQuery-circular-path/color' + k + '.png');

	var clothsCircle = new $.RailwayCloth($('#wrapper'), images, config.railway);

	$('#left').click(function() {
		$(this).prop('disabled', true);
		clothsCircle.fastForward($(this));
	});
	$('#right').click(function() {
		$(this).prop('disabled', true);
		clothsCircle.rewind($(this));
	});

	$('#left').prop('disabled', false);
	$('#right').prop('disabled', false);
};
