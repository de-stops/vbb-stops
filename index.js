const got = require('got');
const csv = require('csv');
const stopsUrl = "https://vbb-gtfs.jannisr.de/latest/stops.txt";
got(stopsUrl).then(response => {
	csv.parse(response.body, {columns: true, delimiter: ","}, function(err, stops) {
		var processedStops = stops
			.filter(stop => !stop.parent_station)
			.map(stop => {
				var stop_id = Number(stop.stop_id);
				
				return {
					stop_id : stop_id >= 900000000000 ? (stop_id - 900000000000 + 9000000) : stop_id,
					stop_name : stop.stop_name,
					stop_lon : Number(stop.stop_lon),
					stop_lat : Number(stop.stop_lat)
				};
			});
		csv.stringify(processedStops, {header: true, quotedString: true}, function(err, data){
			process.stdout.write(data);
		});
	});
});
