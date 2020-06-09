// @formatter:off
require([
        "esri/map",
        "esri/layers/ArcGISDynamicMapServiceLayer",
        "esri/layers/FeatureLayer",

        "esri/symbols/SimpleFillSymbol",
        "esri/symbols/SimpleLineSymbol",
        "esri/symbols/SimpleMarkerSymbol",
        "esri/symbols/SimpleFillSymbol",

        "esri/toolbars/draw",       //Step 2e
        "esri/graphic",             //Step 3b
        "esri/tasks/query",         //Step 4c


        "dojo/ready",
        "dojo/parser",
        "dojo/on",
        "dojo/dom",

        "dojo/store/Memory",
        "dojo/date/locale",

        "dojo/_base/Color",
        "dojo/_base/declare",
        "dojo/_base/array",

        "dgrid/OnDemandGrid",
        "dgrid/Selection",

        "dijit/layout/BorderContainer",
        "dijit/layout/ContentPane",
        "dijit/form/Button"],
    function (Map, ArcGISDynamicMapServiceLayer, FeatureLayer,
              SimpleFillSymbol, SimpleLineSymbol, SimpleMarkerSymbol, SimpleFillSymbol,
              Draw, Graphic, Query,
              ready, parser, on, dom,
              Memory, locale,
              Color, declare, array,
              Grid, Selection,
              BorderContainer, ContentPane, Button) {
// @formatter:on

        // Wait until DOM is ready *and* all outstanding require() calls have been resolved
        ready(function () {

            // Parse DOM nodes decorated with the data-dojo-type attribute
            parser.parse();

            /*// Initialize the dgrid
            var gridQuakes = new (declare([Grid, Selection]))({
                bufferRows: Infinity,
                columns: {
                    eqid: "ID",
                    datetime: {
                        "label": "Date/Time",
                        "formatter": function (dtQuake) {
                            return locale.format(new Date(dtQuake));
                        }
                    },
                    magnitude: "Mag",
                    longitude: "Longitude",
                    latitude: "Latitude"
                }
            }, "divGrid");
            */

            // Initialize the dgrid
            var gridQuakes = new (declare([Grid, Selection]))({
                bufferRows : Infinity,
                columns : {
                    pv_code : "pv_code",
                    pv_name_th : "pv_name_th",
                    pv_name_en : "pv_name_en",
                    region_th : "region_th",
                    region_en : "region_en"
                }
            }, "divGrid");


            // URL variables
            //var sUrlUSAService = "http://sampleserver6.arcgisonline.com/arcgis/rest/services/USA/MapServer";
            //var sUrlQuakesLayer = "http://sampleserver3.arcgisonline.com/ArcGIS/rest/services/Earthquakes/EarthquakesFromLastSevenDays/MapServer/0";
            var sUrlQuakesLayer = "https://geoportal.rtsd.mi.th/arcgis/rest/services/Hosted/TH_Admin_Test/FeatureServer/0";


            // Create the map
            var mapMain = new Map("divMap", {
                basemap: "satellite",
                center: [100, 13],
                zoom: 5
            });


            // Construct the USA layer
            //var lyrUSA = new ArcGISDynamicMapServiceLayer(sUrlUSAService, {
                //opacity: 0.5
            //});
            //lyrUSA.setVisibleLayers([0, 1, 3]);

            /*
             * Step 5d : Specify the output fields
             */
            //var outFieldsQuakes = ["eqid", "datetime", "magnitude", "longitude", "latitude"];
            var outFieldsQuakes = ["pv_code", "pv_name_th", "pv_name_en", "region_th", "region_en"];		//Step 5d  Hurricanes Service

            // Construct the Quakes layer
            var lyrQuakes = new FeatureLayer(sUrlQuakesLayer, {

                /*
                 * Step 5e : Set the quakes layer output fields
                 */
                outFields: outFieldsQuakes

            });

            //lyrQuakes.setDefinitionExpression("magnitude >= 2.0");
            //lyrQuakes.setDefinitionExpression("WINDSPEED <=50"); // Hurricanes Service
            mapMain.addLayer(lyrQuakes);

            /*
             * Step 2d : Wire the draw tool initialization function
             */
            mapMain.on("load", initDrawTool);

            function initDrawTool() {
                /*
                 * Step 2e : Implement the Draw toolbar
                 */
                var tbDraw = new Draw(mapMain);
                tbDraw.on("draw-end", displayPolygon);  //Step 2f
                tbDraw.activate(Draw.POLYGON);          //Step 2h

            }

            function displayPolygon(evt) {

                // Get the geometry from the event object
                var geometryInput = evt.geometry;

                // Define symbol for finished polygon
                var tbDrawSymbol = new SimpleFillSymbol(SimpleFillSymbol.STYLE_SOLID, new SimpleLineSymbol(SimpleLineSymbol.STYLE_DASHDOT, new Color([255, 255, 0]), 2), new Color([255, 255, 0, 0.2]));

                // Clear the map's graphics layer
                mapMain.graphics.clear();

                /*
                 * Step 3b : Construct and add the polygon graphic
                 */
                var graphicPolygon = new Graphic(geometryInput, tbDrawSymbol);
                mapMain.graphics.add(graphicPolygon);

                // Call the next function
                selectQuakes(geometryInput);
            }

            function selectQuakes(geometryInput) {

                // Define symbol for selected features (using JSON syntax for improved readability!)
                var symbolSelected = new SimpleFillSymbol(SimpleFillSymbol.STYLE_SOLID,
                    new SimpleLineSymbol(SimpleLineSymbol.STYLE_DASHDOT,
                    new Color([255,0,0]), 2),new Color([255,255,0,0.25])
                    );

                /*
                 * Step 4f : Set the selection symbol
                 */
                lyrQuakes.setSelectionSymbol(symbolSelected);

                /*
                 * Step 4c : Initialize the query
                 */
                var queryQuakes = new Query();
                queryQuakes.geometry = geometryInput;

                /*
                 * Step 4d : Wire the layer's selection complete event
                 */
                lyrQuakes.on("selection-complete", populateGrid);

                /*
                 * Step 4e : Perform the selection
                 */
                lyrQuakes.selectFeatures(queryQuakes, FeatureLayer.SELECTION_NEW);

            }

            function populateGrid(results) {

                var gridData;

                dataQuakes = array.map(results.features, function (feature) {
                    return {

                        "pv_code" : feature.attributes[outFieldsQuakes[0]],
                        "pv_name_th" : feature.attributes[outFieldsQuakes[1]],
                        "pv_name_en" : feature.attributes[outFieldsQuakes[2]],
                        "region_th" : feature.attributes[outFieldsQuakes[4]],
                        "region_en" : feature.attributes[outFieldsQuakes[3]]


                    }
                });

                // Pass the data to the grid
                var memStore = new Memory({
                    data: dataQuakes
                });
                gridQuakes.set("store", memStore);
            }

        });
    });
