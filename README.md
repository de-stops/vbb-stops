# vbb-stops

This is a simple script to download all VBB stops supported by [web departure board](http://fahrinfo.vbb.de/bin/stboard.exe/dn?L=profi&boardType=dep&start=yes&sqQueryPageDisplayed=no&input=9003201) as [GTFS-compatible CSV](https://developers.google.com/transit/gtfs/reference/stops-file).

The script uses data from [Berlin Open Data](http://daten.berlin.de/kategorie/verkehr) from the [following resource](https://vbb-gtfs.jannisr.de/latest/stops.txt), removes all non-parent stations and converts ids into the "old" format (i.e. `900000003201` -> `9003201`).

The script produces CSV output in the following format:

```
"stop_id","stop_name","stop_lon","stop_lat"
8010318,"Schönebeck(Elbe)",11.733157,52.018794
```

# Usage

```
npm install
node index.js
```

# License

Source code is licensed under [BSD 2-clause license](LICENSE).