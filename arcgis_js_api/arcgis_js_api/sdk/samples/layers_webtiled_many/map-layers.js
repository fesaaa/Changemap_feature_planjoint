var mapLayers = {};
mapLayers.abcd = ["a", "b", "c", "d"];
mapLayers.abc = ["a", "b", "c"];
mapLayers.mq = ["mtile01", "mtile02", "mtile03", "mtile04"];
mapLayers.info = [{
  "options": { "id": "Cloudmade Midnight", "visible": false, "copyright": "Cloudmade Midnight Commander" },
  "url": "http://tile.cloudmade.com/1a1b06b230af4efdbb989ea99e9841af/999/256/${level}/${col}/${row}.png"
}, {
  "options": { "id": "Cloudmade Pale", "visible": false, "subDomains": mapLayers.abc, "copyright": "Cloudmade Pale Dawn" },
  "url": "http://${subDomain}.tile.cloudmade.com/1a1b06b230af4efdbb989ea99e9841af/998/256/${level}/${col}/${row}.png"
}, {
  "options": { "id": "MapBox Light", "visible": false, "subDomains": mapLayers.abcd, "copyright": "Mapbox Light" },
  "url": "http://${subDomain}.tiles.mapbox.com/v3/mapbox.mapbox-light/${level}/${col}/${row}.png"
}, {
  "options": { "id": "MapBox Streets", "visible": false, "subDomains": mapLayers.abcd, "copyright": "Mapbox Streets" },
  "url": "http://${subDomain}.tiles.mapbox.com/v3/mapbox.mapbox-streets/${level}/${col}/${row}.png"
}, {
  "options": { "id": "MapBox Terrain", "visible": false, "subDomains": mapLayers.abcd, "copyright": "Mapbox Terrain" },
  "url": "http://${subDomain}.tiles.mapbox.com/v3/mapbox.mapbox-warden/${level}/${col}/${row}.png"
}, {
  "options": { "id": "MapQuest", "visible": false, "subDomains": mapLayers.mq, "copyright": "MapQuest" },
  "url": "http://${subDomain}.mqcdn.com/tiles/1.0.0/vx/map/${level}/${col}/${row}.jpg"
}, {
  "options": { "id": "National Geographic", "visible": true, "subDomains": ["services", "server"], 
    "copyright": "National Geographic, Esri, DeLorme, NAVTEQ, UNEP-WCMC, USGS, NASA, ESA, METI, NRCAN, GEBCO, NOAA, iPC" 
  },
  "url": "http://${subDomain}.arcgisonline.com/ArcGIS/rest/services/NatGeo_World_Map/MapServer/tile/${level}/${row}/${col}"
},{
  "options": { "id": "Open Cycle Map", "visible": false, "subDomains": mapLayers.abc, "copyright": "Open Cycle Map" },
  "url": "http://${subDomain}.tile.opencyclemap.org/cycle/${level}/${col}/${row}.png"
}, {
  "options": { "id": "OSM via Apple", "visible": false, "copyright": "Apple's rendering of OSM data." },
  "url": "http://gsp2.apple.com/tile?api=1&style=slideshow&layers=default&lang=en_GB&z=${level}&x=${col}&y=${row}&v=9"
}, {
  "options": { "id": "Stamen Terrain", "visible": false, "subDomains": mapLayers.abcd, "copyright": "Stamen Terrain" },
  "url": "http://${subDomain}.tile.stamen.com/terrain/${level}/${col}/${row}.jpg"
}, {
  "options": { "id": "Stamen Toner", "visible": false, "subDomains": mapLayers.abcd, "copyright": "Stamen Toner" },
  "url": "http://${subDomain}.tile.stamen.com/toner/${level}/${col}/${row}.png"
}, {
  "options": { "id": "Stamen Toner Labels", "visible": false, "subDomains": mapLayers.abcd, "copyright": "Stamen Toner Labels" },
  "url": "http://${subDomain}.tile.stamen.com/toner-labels/${level}/${col}/${row}.png"
}, {
  "options": { "id": "Stamen Toner Lines", "visible": false, "subDomains": mapLayers.abcd, "copyright": "Stamen Toner Lines" },
  "url": "http://${subDomain}.tile.stamen.com/toner-lines/${level}/${col}/${row}.png"
}, {
  "options": { "id": "Stamen Watercolor", "visible": false, "subDomains": mapLayers.abcd, "copyright": "Stamen Watercolor" },
  "url": "http://${subDomain}.tile.stamen.com/watercolor/${level}/${col}/${row}.jpg"
}];