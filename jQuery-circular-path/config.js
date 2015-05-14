/*

In questo file si trova l'oggetto di
configurazione con i valori di default.
Per usare dei valori diversi, clonarlo
con la funzione config.clone() e cambiare
i valori dell'oggetto clonato


*/

var config = {};

config.clone = function(obj) {
	obj = obj || this;
	var clonedConfig = {};
	for (var key in obj) {
		var value = obj[key];
		if (typeof(value) == 'object' && !(value instanceof Function))
			clonedConfig[key] = config.clone(value);
		else
			clonedConfig[key] = value;
	}
	return clonedConfig;
};

config.railway = {};

/*

Larghezza della rotaia, in percentuale
rispetto all'elemento che la contiene.

*/
config.railway.width = 85;

/*

Larghezza della parte diritta della rotaia,
in percentuale rispetto alla rotaia stessa

*/

config.railway.rectWidth = 75;

/*

Il numero di stoffe da visualizzare
contemporaneamente in tutta la rotaia

*/
config.railway.elements = 10;

/*

L'angolo di inizio dell'animazione
circolare, con 0° corrispondendi a
Sud e crescenti in senso antiorario

*/
config.railway.startAngle = 270;

/*

Distanza orizzontale della rotaia dai
bordi dell'elemento che la contiene,
in percentuale rispetto alla grandezza
di quest'ultimo.

Se la rotaia ha direzione 'left' la
distanza è applicata al bordo sinistro,
altrimenti se ha 'right' a quello destro

'center' centra orizzontalmente la rotaia

*/
config.railway.spaceHoriz = 15;

/*

Distanza verticale della rotaia dai
bordi dell'elemento che la contiene,
in percentuale rispetto alla grandezza
di quest'ultimo.

Se la rotaia ha direzione 'left' la
distanza è applicata al bordo inferiore,
altrimenti se ha 'right' a quello superiore

'center' centra verticalmente la rotaia

*/
config.railway.spaceVert = 'center';

/*

Durata in secondi dell'animazione iniziale:
meglio che non sia maggiore di 2

*/
config.railway.startAnimDuration = 1;

/*

Direzione dell'animazione:

left: gli elementi nella parte dritta si
	muovono verso sinistra e quelli della
	parte circolare si fermano a Sud
right: gli elementi nella parte dritta si
	muovono verso destra e quelli della
	parte circolare si fermano a Nord

*/

config.railway.direction = 'left';
