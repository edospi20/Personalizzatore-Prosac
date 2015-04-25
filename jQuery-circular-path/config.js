/*

File con i valori di configurazione

*/

var config = {};
config.railway = {};

/*

Larghezza della rotaia, in percentuale
rispetto all'elemento che lo contiene.

*/
config.railway.width = 85;

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

Spazio vuoto a sinistra della rotaia,
come percentuale della larghezza
dell'elemento che la contiene.

*/
config.railway.spaceLeft = 5;

/*

Spazio vuoto sopra la rotaia, come
percentuale dell'altezza dell'elemento
che la contiene.

*/
config.railway.spaceTop = 5;

/*

Durata in secondi dell'animazione iniziale:
meglio che non sia maggiore di 2

*/
config.railway.startAnimDuration = 1;
