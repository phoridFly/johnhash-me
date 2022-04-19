

var flyCoords = [
    {'x':1,'y':2}, {'x':2,'y':3}, {'x':3,'y':4}, {'x':5,'y':6},
  ];

  
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
        center: [flyCoords[0].x,flyCoords[0].y],
        zoom: 6
      });

      for (let i = 0; i<flyCoords.length; i++){
        var point = new Point ({
            longitude: flyCoords[i].x,
            latitude: flyCoords[i].y
        });

        var markerSymbol = new SimpleMarkerSymbol({
          color: [51, 153, 255],
          outline: {
          color: [255, 255, 255],
          width: 1
          }
        });

        var pointGraphic = new Graphic({
        geometry: point,
        symbol: markerSymbol
        });

        view.graphics.add(pointGraphic);

      }

    });

