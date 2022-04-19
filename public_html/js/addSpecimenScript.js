
// Create Dropdown Menus When First Loaded
document.addEventListener('DOMContentLoaded', buildDropdowns);

// this function is called when page loads or when new data is added to the database
function buildDropdowns(){
  
  // builds dropdown for specimen add
  buildSpeciesID();

  // builds dropdwon for specimen add
  buildCollEventID();
}

/******************************************************************************
 * Here is where the build dropdown menus functions BEGIN.
 *****************************************************************************/

function buildSpeciesID() {
  // build Species ID Dropdown
  let speciesDrop = document.getElementById('speciesDropdown');

  let DefaultOption = document.createElement('option');
  DefaultOption.textContent = "Pick a Species OR Defaults to Unidentified";
  DefaultOption.value = 67;

  speciesDrop.appendChild(DefaultOption);

  let req = new XMLHttpRequest();

  //open the request to /addSpecimen
  req.open('GET','https://johnhash.me/flies/speciesDropdown', true);
  //req.setRequestHeader('Content-Type', 'application/json');
  req.onload = function(){
    if(req.status >= 200 && req.status < 400){
      var response = JSON.parse(req.responseText);
      console.log(response);
      for (let j in response){
        let option = document.createElement('option');
        option.value = response[j].id;
        let genus = response[j].genus;
        let species = response[j].specific_epithet;
        option.textContent = genus + ' ' + species;
        speciesDrop.appendChild(option);
      }
    } 
    else {
      console.log("Error in network request: " + req.statusText);
    }

  }
  req.send();
}

function buildCollEventID() {

  // build COLLECTING EVENT DROPDOWN FOR ID
  let collEventDrop = document.getElementById('collEventDropdown');

  let DefaultOption = document.createElement('option');
  DefaultOption.textContent = "Pick a Collecting Event";
  //DefaultOption.value = 999999999;
  
  collEventDrop.appendChild(DefaultOption);

  let req = new XMLHttpRequest();

  //open the request to /addSpecimen
  req.open('GET','https://johnhash.me/flies/collEventDropdown', true);
  //req.setRequestHeader('Content-Type', 'application/json');
  req.onload = function(){
    if(req.status >= 200 && req.status < 400){
      var response = JSON.parse(req.responseText);
      console.log(response);
      for (let j in response){
        let option = document.createElement('option');
        option.value = response[j].id;
        let start_date = response[j].start_date;
        let end_date = response[j].end_date;
        let country = response[j].country;
        let place = response[j].place;
        let method = response[j].method;

        option.textContent = country + ', ' + place + ', ' + method + ', ' + start_date + ', ' + end_date;
        collEventDrop.appendChild(option);
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

  let personDrop = document.getElementById('speciesDropdown');
  personDrop.length = 0;

  let collEventDrop = document.getElementById('collEventDropdown');
  collEventDrop.length = 0;
}

/******************************************************************************
 * Here is where the destroy dropdown menus function END.
 *****************************************************************************/


 /******************************************************************************
 * Here is where the the ADD functions BEGIN.
 ******************************************************************************/

// ADD A NEW SPECIMEN
document.getElementById('enterSpecimen').addEventListener('click', function(event){
    
console.log('clicked');
    let req = new XMLHttpRequest(); 

    // assign the values in the input boxes to variables for building the url string
    let InstCodeInput = document.getElementById('institution_code').value;
    let CollCodeInput = document.getElementById('collection_code').value;
    let CatNumInput = document.getElementById('catalog_number').value;

    let SpecIDInput = document.getElementById('speciesDropdown').value;

    let CollEventIDInput = document.getElementById('collEventDropdown').value;
    let TypeStatusInput = document.getElementById('type_status').value;
    let SexInput = document.getElementById('sex').value;
    let ImgNameInput = document.getElementById('image_name').value;

    let userId = document.getElementById('user_id').value;

    // this is the whole query string starting with ? to be inserted in front of path
    let payload = '?institution_code='+InstCodeInput + '&collection_code='+CollCodeInput
    + '&catalog_number='+CatNumInput + '&species_id='+SpecIDInput + '&collecting_event_id='+CollEventIDInput
    + '&type_status='+TypeStatusInput + '&sex='+SexInput+ '&image_name='+ImgNameInput+'&appID='+userId;

    console.log(payload);
    //open the request to /addSpecimen
    req.open('GET','https://johnhash.me/flies/addSpecimen'+payload, true);
    req.setRequestHeader('Content-Type', 'application/json');
    req.addEventListener('load',function(){
      if(req.status >= 200 && req.status < 400){
        //var response = JSON.parse(req.responseText);
        //alert(response);
      } 
      else {
        console.log("Error in network request: " + req.statusText);
      }
    });
    req.send(JSON.stringify(payload));
    alert ("Specimen Added");
    destroyDropdowns();
});

 /******************************************************************************
 * Here is where the the ADD functions END.
 ******************************************************************************/