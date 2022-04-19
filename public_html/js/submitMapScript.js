/*****************************************************************************
 * This is the javascript file for implementing the ESRI maps.
 * 
 * The first script called is a CDN from "https://js.arcgis.com/4.10/"
 * After <script src="https://js.arcgis.com/4.10/"></script> is loaded in the
 * head of the file, this script is called to create the map.
 * 
 * I setup the website to call the script again after the defualt map is loaded
 * so that the user can input their own coordinates. I setup an event
 * listener for the submit button. It pulls in the values from the text boxes
 * and populates the longitude and latitude variables for centering the map
 * and plotting the point.
 * I added the ESRI's API functions for creating a dot.
 * 
 *****************************************************************************/

 // event listener for user pressing submit button
document.getElementById("locSubmit").addEventListener("click", function(event){
    
  // variables that hold the values of the long and lat text boxes
  var centerLong = document.getElementById("longitude").value;
  var centerLat = document.getElementById("latitude").value;


  
  require([
    "esri/Map",
    "esri/views/MapView",
    "esri/Graphic",
    "esri/geometry/Point",
    "esri/symbols/SimpleMarkerSymbol",
    "dojo/domReady!"
  ], function(Map, MapView, Graphic, Point, SimpleMarkerSymbol) {

      // sets the type of map, there are 5 other options
      var map = new Map({
          basemap: "topo-vector" 
      });

      // map is centered on user's coordinates
      var view = new MapView({
        container: "viewDiv",
        map: map,
        center: [centerLong,centerLat],
        zoom: 6
      });

      // Create a point from user's coordinates
      var point = new Point({
        longitude: centerLong,
        latitude: centerLat
      });
      
      // Create a symbol for drawing the point, I change it to blue from default orange
      var markerSymbol = new SimpleMarkerSymbol({
        color: [51, 153, 255],
        outline: {
          color: [255, 255, 255],
          width: 1
        }
      });

      // Create a graphic and add the geometry and symbol to it
      var pointGraphic = new Graphic({
        geometry: point,
        symbol: markerSymbol
      });

      // Add the graphic to the view
      view.graphics.add(pointGraphic);

    });

  event.preventDefault();
});

