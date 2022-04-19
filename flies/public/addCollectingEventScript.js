
// Require moment for date formatting.


// Create Dropdown Menus When First Loaded
document.addEventListener('DOMContentLoaded', buildDropdowns);

// this function is called when page loads or when new data is added to the database
function buildDropdowns(){
    
    console.log("sup dawg");
    
  // builds dropdown for collecting event add
  buildLocalityID();

}

/******************************************************************************
 * Here is where the build dropdown menus functions BEGIN.
 *****************************************************************************/

function buildLocalityID(){
  // build LOCALITY DROPDOWN FOR ID
  let localityDrop = document.getElementById('localityDropdown');

  let DefaultOption = document.createElement('option');
  DefaultOption.textContent = "Pick a Locality";

  localityDrop.appendChild(DefaultOption);

  let req = new XMLHttpRequest();

  //open the request to /addSpecimen
  req.open('GET','http://johnhash.me/flies/localityDropdown', true);
  //req.setRequestHeader('Content-Type', 'application/json');
  req.onload = function(){
    if(req.status >= 200 && req.status < 400){
      var response = JSON.parse(req.responseText);
      console.log(response);
      for (let j in response){
        let option = document.createElement('option');
        option.value = response[j].id;
        let country = response[j].country;
        let region = response[j].region;
        let place = response[j].place;

        option.textContent = country + ', ' + region + ', ' + place;
        localityDrop.appendChild(option);
      }
    } 
    else {
      console.log("Error in network request: " + req.statusText);
    }
  }
  req.send();
}

/******************************************************************************
 * Here is where the build dropdown menus functions END.
 *****************************************************************************/

/******************************************************************************
 * Here is where the destroy dropdown menus function BEGIN.
 *****************************************************************************/

function destroyDropdowns(){
  let localityDrop = document.getElementById('localityDropdown');
  localityDrop.length = 0;
}

/******************************************************************************
 * Here is where the destroy dropdown menus function END.
 *****************************************************************************/


 /******************************************************************************
 * Here is where the the ADD functions BEGIN.
 ******************************************************************************/

// ADD A NEW COLLECTING EVENT
document.getElementById('enterCollectingEvent').addEventListener('click', function(event){
    
  let req = new XMLHttpRequest(); 

  // assign the values in the input boxes to variables for building the url string
  let locIdInput = document.getElementById('localityDropdown').value;
  let methodInput = document.getElementById('method').value;
  let startDateInput = document.getElementById('start_date').value;
  let endDateInput = document.getElementById('end_date').value;
  //console.log(dateInput);

  // this is the whole query string starting with ? to be inserted in front of path
  let payload = '?locality_id='+locIdInput+'&method='+methodInput+'&start_date='+startDateInput+'&end_date='+endDateInput;
  
  //open the request to /addLocality
  req.open('GET','http://johnhash.me/flies/addCollectingEvent'+payload, true);
  req.setRequestHeader('Content-Type', 'application/json');
  req.addEventListener('load',function(){
    if(req.status >= 200 && req.status < 400){
      //var response = JSON.parse(req.responseText);
      //alert(response);
    } else {
      console.log("Error in network request: " + req.statusText);
    }});
  req.send(JSON.stringify(payload));
  //alert ("Collecting Event Added");
  
  destroyDropdowns();
});

 /******************************************************************************
 * Here is where the the ADD functions END.
 ******************************************************************************/