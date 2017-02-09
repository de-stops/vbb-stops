'use strict'

const fs = require('fs');
const got = require('got');
const csv = require('csv');

fs.readFile('data/umschluesselungstabelle.csv', 'utf8', function(err, umschluesselungstabelle_csv)  {
	csv.parse(umschluesselungstabelle_csv, {columns: true, delimiter: ";"}, function(err, umschluesselungstabelle) {
		const umschluesselung = umschluesselungstabelle.reduce((umschluesselung, item) => Object.assign(umschluesselung, { [item['stop_id']]: item['alte stop_id'] }), {});


fs.readFile('data/stops.txt', 'utf8', function(err, data)  {
	csv.parse(data, {columns: true, delimiter: ","}, function(err, stops) {

		const processedStops = stops
			.filter(stop => !stop.parent_station)
			.map(stop => {
				var stop_id = Number(umschluesselung[stop.stop_id] || stop.stop_id);
				
				return {
					stop_id : String(stop_id),
					stop_name : stop.stop_name,
					stop_lon : Number(stop.stop_lon),
					stop_lat : Number(stop.stop_lat)
				};
			})
			.filter(stop => (stop.stop_id >= 9000000 && stop.stop_id < 9500000));
		csv.stringify(processedStops, {header: true, quotedString: true}, function(err, data){
			process.stdout.write(data);
		});
	});
});

	});
});