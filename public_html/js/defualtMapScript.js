/*****************************************************************************
 * This is the javascript file for implementing the ESRI maps.
 * 
 * The first script called is a CDN from "https://js.arcgis.com/4.10/"
 * After <script src="https://js.arcgis.com/4.10/"></script> is loaded in the
 * head of the file, this script is called to create the map.
 * 
 * I set the default center to Corvallis, Oregon.
 * 
 *****************************************************************************/

require([
        "esri/Map",
        "esri/views/MapView",
        "dojo/domReady!"
    ], function(Map, MapView) {

    var map = new Map({
        basemap: "topo-vector"
    });

    var view = new MapView({
        container: "viewDiv",
        map: map,
        center: [-117.1825381,34.0555693],
        zoom: 6
    });
});