/*

Classe per la disposizione "a rotaia"
delle stoffe e le animazioni

TODO:
	- Usare velocity.js, che dicesi essere meglio

*/

// Per maggior leggibilità
Math.toDegrees = function(radians) {
	return 180 / Math.PI * radians;
};

// Per maggior leggibilità
Math.toRadians = function(degrees) {
	return Math.PI / 180 * degrees;
};

// Oltre a costruire l'oggetto, anima le stoffe
$.RailwayCloth = function(wrapper, images, conf) {
	this.images = images;
	this.firstDisplayed = 0; // 01

	this.conf = conf;
	this.clothsList = []; // 02

	// var minDim = Math.min(wrapper.width(), wrapper.height());
	this.circle = { // 04
		radius: wrapper.width() * conf.width * (100 - conf.rectWidth) / 10000 // 05
	};

	var centerX = this.circle.radius;

	if (conf.spaceHoriz == 'center')
		centerX += wrapper.width() * (100 - conf.width) / 200;
	else	// Se in spaceHoriz metto un numero nel config.js
		if (conf.direction == 'left')
			centerX += wrapper.width() * conf.spaceHoriz / 100;
		else // (conf.directon == 'right')
			centerX = wrapper.width() * (100 - conf.spaceHoriz) / 100 - this.circle.radius; // il raggio non serve
			
	/*

	if (conf.spaceVert == 'center')
		var centerY = (wrapper.height() - this.circle.radius *
			(Math.sin(Math.toRadians(conf.startAngle - 90)) + 1)) / 2;
	else
		var centerY = wrapper.height() * conf.spaceVert / 100;

	*/
	var centerY = 0; // provvisorio, necessario un wrapper alto almeno due volte il raggio
	if (conf.direction == 'right')
		centerY += this.circle.radius;
	else // (conf.direction == 'left')
		centerY += this.circle.radius * Math.sin(Math.toRadians(conf.startAngle - 90));

	this.circle.center = [centerX, centerY]; // 06

	var endAngle = conf.direction == 'left' ? 360 : 180;	// Quando le direzioni sono diverse, gli angoli finali sono diversi
	var archLength = Math.toRadians(endAngle - conf.startAngle) * this.circle.radius;
	this.clothsDistance = (wrapper.width() * conf.rectWidth / 100 + archLength)
		/ conf.elements;
	this.angleStep = Math.round(Math.toDegrees(Math.acos(1 - this.clothsDistance *
		this.clothsDistance / (2 * this.circle.radius * this.circle.radius))));
	this.nInCircle = Math.ceil((endAngle - conf.startAngle) / this.angleStep);
	this.nInRect = conf.elements - this.nInCircle;

	var zIndex = conf.elements;
	for (var k = 0; k < conf.elements; ++k) {
		var cloth = $('<div class="cloth"><img src=""></div>');
		cloth.css('z-index', zIndex--);
		wrapper.prepend(cloth);
		// 0 è un valore a caso, sarà settato da animateRailway dopo
		this.clothsList.push({elem: cloth, position: 0});
	}
	this.animateRailway(0);
};

// Per maggior leggibilità
$.RailwayCloth.prototype.dirNumber = function(dir) {
	return dir == 'clockwise' ? -1 : 1;
};

/*

Anima le stoffe in un percorso circolare in
senso antiorario, facendole fermare equidistanti
lungo la circonferenza. Le immagini inserite nei
div sono quelle a partire dall'indice specificato
nella direzione specificata

*/
$.RailwayCloth.prototype.animateRailway = function(imageIndex, button) {
	this.circle.start = this.conf.startAngle; // 07
	this.circle.end = this.conf.startAngle + (this.nInCircle - 1) * this.angleStep; // 07
	this.circle.dir = this.dirNumber('counter-clockwise');

	var nOut = this.nInRect;
	var circleEase = 'easieEaseIn';
	var circleDuration = this.conf.startAnimDuration * 400;
	var rectDuration = this.conf.startAnimDuration * 500;
	var leftInc = this.conf.direction == 'left' ? '+=' : '-=';	// per far si che le stoffe si posizionino più a dx o più a sx in base al valore di conf.direction

	for (var k in this.clothsList) {
		var cloth = this.clothsList[k];
		cloth.elem.children('img').attr('src', this.images[imageIndex]);
		cloth.elem.animate({path: new $.path.arc(this.circle)},
			circleDuration, circleEase);

		if (nOut > 0) {
			if (button && nOut == this.nInRect)
				cloth.elem.animate({left: leftInc + nOut * this.clothsDistance
					+ 'px'}, rectDuration, 'easieEaseOut', function(){
					button.prop('disabled', false); });
			else
				cloth.elem.animate({left: leftInc + nOut * this.clothsDistance
					+ 'px'}, rectDuration, 'easieEaseOut');
			nOut -= 1;
		}
		else {
			this.circle.end -= this.angleStep;
			circleEase = 'easieEaseInOut';

		}

		imageIndex = (imageIndex + 1) % this.images.length;
	}
};

$.RailwayCloth.prototype.fastForward = function(button) {
	this.firstDisplayed = (this.firstDisplayed + this.clothsList.length) % this.images.length;
	this.animateRailway(this.firstDisplayed, button);
};

$.RailwayCloth.prototype.rewind = function(button) {
	this.firstDisplayed = (this.firstDisplayed - this.clothsList.length
		+ this.images.length) % this.images.length;
	this.animateRailway(this.firstDisplayed, button);
};

/* 01

La porzione dell'array contenente le immagini che
non sono visualizzate va da head a head + nUndisplayed.
È più efficiente che usare due indici poiché il
numero di elementi non visualizzati resta costante

*/

/* 02

Mantiene informazioni sugli elementi html che
racchiudono le stoffe e sulla loro posizione,
in termini di angolo all'interno del cerchio

*/

/* 03

Per avere le stoffe equidistanti è sufficiente
che le posizioni finali differiscano di uno
stesso angolo. Per far sì che occupino tutta la
circonferenza, questo angolo deve essere pari
a (360 / numero stoffe)

*/

/* 04

Essendo center e radius fissi, è bene calcolarli
una sola volta, e settare poi ogni volta solo gli
altri attributi, che invece variano

*/

/* 05

Si divide per 200 perché il raggio è metà del
diametro, e dunque della larghezza totale

*/

/* 06

Il centro del cerchio dista dal bordo superiore
dell'elemento che contiene il cerchio stesso di
una quantità pari a (raggio + margin)

*/

/* 07

Gli angoli di end e start sono calcolati ENTRAMBI
rispetto al punto 0 (-90°): la rotazione effettuata
è dunque pari a (end - start)°, ed è sempre in senso
antiorario, a meno che dir non sia settato a -1

*/

/* 08

Ogni volta la posizione finale deve essere
ridotta di un passo: decrementando prima
di animare la prima stoffa non si posizionerà
in alto, ma un passo più a destra

*/

/* 09

Perché avere posizioni maggiori di 360?

*/

/* 10

Il senso default è quello anti-orario. Girando in
senso anti-orario si va avanti, in senso orario si
va indietro: questo è il comportamento più intuitivo,
vista l'animazione iniziale in senso anti-orario.

*/

/* 11

Scorrimento modulare al contrario:
aggiungere la quantità con cui poi si fa
il modulo non influenza il risultato,
serve solo a far sì che andando indietro
da 0 si arrivi a n - 1 (0 -1 + n == n - 1)

*/

/* 12

Questa funzione viene chiamata a animazione
finita, e riposta lo z-index al valore
default e rimuove la vecchia immagine

*/

/* 13

Si aggiunge 360 per evitare di avere angoli
negativi (this.circle.dir può valere -1),
riottenendo lo stesso angolo poiché dopo c'è
un % 360

*/

/* 14

Si può fare % 360 poiché le animazioni hanno
una distanza di un singolo passo, che è
minore di un giro poiché calcolato come
(360 / numero di stoffe)

*/
