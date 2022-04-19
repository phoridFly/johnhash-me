/**
 * This script builds the species list and creates AJAX calls for building
 * the species information pane.
 * Use port 6661 for OSU server
 * Use port 36666 for A2 server
 */



//document.addEventListener('DOMContentLoaded', buildSpeciesList);

/**
 * buildSpeciesList()
 * This function sends a server request to get the data from the species
 * table in the db to populate a species list.
 * Native image size is 1000 w x 660 h 
 */
function buildSpeciesList(selectedGenus) {

    document.querySelector("#loader").style.visibility = "visible";

    //grab the parent ul element
    let speciesList = document.getElementById('speciesList');
    //first destroy any list already there to clear out room if user wants to see other genera
    while(speciesList.firstChild) {
      speciesList.removeChild(speciesList.lastChild);
    }
 
    let req = new XMLHttpRequest();
    let payload = "?selectedGenus="+selectedGenus;
    console.log(selectedGenus);
  
    req.open('GET','https://johnhash.me/flies/speciesList'+payload, true);
    req.onload = function(){
      if(req.status >= 200 && req.status < 400){
        var response = JSON.parse(req.responseText);
        console.log(response);
        for (let k in response) {
            let listItem = document.createElement('li');
            let dbID = response[k].id;
            listItem.setAttribute("id", dbID);
            listItem.setAttribute("class", "speciesItem")
            let genus = response[k].genus;
            let species = response[k].specific_epithet;

            let flyName = document.createElement('p');
            flyName.textContent = genus + ' ' + species;

            let listItemImage = document.createElement('img');
            let imageName = response[k].habitus_image;
            listItemImage.setAttribute("src", "smallImages/"+imageName);
            listItemImage.setAttribute("id", dbID);
            listItemImage.setAttribute("width", 150);
            listItemImage.setAttribute("height", 150);

            listItem.appendChild(listItemImage);
            listItem.appendChild(flyName);
            speciesList.appendChild(listItem);
        }
        console.log("here");
        document.querySelector("#loader").style.visibility = "hidden";

        //dumb();

      } 
      else {
        console.log("Error in network request: " + req.statusText);
      }


  
    }

    
    req.send();
   
     
}

// function dumb() {
//   var item = document.getElementsByClassName("speciesItem");
//   for (var i = 0; i < item.length; i++) {
//     item[i].addEventListener("click", speciesContent);
//   }

// }  




/**
 * speciesContent() holds the AJAX calls needed to fill in the species
 * page information
 */
function speciesContent(idNumber) {

  //console.log(id);
  console.log("in speciesContent");
  console.log(idNumber);
  let payload = "?id="+idNumber;


  // send request 1 name, year, diagnosis, author, image
  let req = new XMLHttpRequest();
  
    req.open('GET','https://johnhash.me/flies/speciesInfo'+payload, true);
    req.onload = function(){
      if(req.status >= 200 && req.status < 400){
        var response = JSON.parse(req.responseText);
        console.log(response);

        // get the species name displayed
        document.getElementById("nameInput").textContent = response[0].genus + ' ' + response[0].specific_epithet;

        // get author names(s)
        let fullText = "";
        for (let j in response) {
          
          fullText = fullText + response[j].first_name + ' ' + response[j].last_name + ', ';
        }
        document.getElementById("authorYearInput").textContent = fullText + ' ' + response[0].year;
        
        // get the diagnosis displayed
        document.getElementById("diagnosisInput").textContent = response[0].diagnosis;
        
        // update the blank img tag
        let habitusImage = document.getElementById("habimageInput");
        habitusImageName = response[0].habitus_image;
        habitusImage.setAttribute("src", "images/"+habitusImageName);
        habitusImage.setAttribute("width", 500);
        habitusImage.setAttribute("height", 330);
        
      } 
      else {
        console.log("Error in network request: " + req.statusText);
      }
    }
    req.send();
}

/**
 * distributionContent() holds the AJAX calls needed to fill in the species
 * page information
 * distributionContent() also parses the json to get long and lat and
 * then calls the makeMap the ESRI javascript api
 */
function distributionContent(idNumber) {

  let payload = "?id="+idNumber;
  var flyCoords = [];

  // send request for distinct country and gps coordinates
  let req = new XMLHttpRequest();
  
    req.open('GET','https://johnhash.me/flies/speciesCountryFound'+payload, true);
    req.onload = function(){
      if(req.status >= 200 && req.status < 400){
        var response = JSON.parse(req.responseText);
        console.log(response);

        //let fulltext = "";
        for (let j in response){

        //fulltext = fulltext + response[j].country + ' ';
        flyCoords.push({'x':response[j].longitude, 'y':response[j].latitude});

        }

        makeMap(flyCoords);

        //document.getElementById("distributionInput").textContent = fulltext;

        
      } 
      else {
        console.log("Error in network request: " + req.statusText);
      }
    }
    req.send();

    /*
    code for setting up the map
    */
}

function makeMap(flyCoords) {
  
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
          basemap: "dark-gray" 
      });

      // map is centered on user's coordinates
      var view = new MapView({
        container: "viewDiv",
        map: map,
        center: [flyCoords[0].x,flyCoords[0].y],
        zoom: 2
      });

      for (let i = 0; i < flyCoords.length; i++){
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





}

// even listener for which genus list to load


// event listener for clicking on a species in the left side
document.addEventListener('click', function (event) {

	// If the clicked element doesn't have the right selector, bail
	if (!event.target.matches('img')) return;

	// Don't follow the link
	event.preventDefault();

	// Log the clicked element in the console
  console.log(event.target.id);
  speciesContent(event.target.id);
  distributionContent(event.target.id);


}, false);

