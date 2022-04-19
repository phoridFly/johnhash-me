// Create Dropdown Menus When First Loaded
document.addEventListener('DOMContentLoaded', buildDropdowns);

// this function is called when page loads or when new data is added to the database
function buildDropdowns(){
  
  // builds dropdown for specimen add
  buildSpeciesID();

  // builds dropdown for person(collector) collecting event add
  buildPersonID();

}

/******************************************************************************
 * Here is where the build dropdown menus functions BEGIN.
 *****************************************************************************/

function buildSpeciesID() {
  // build Species ID Dropdown
  let speciesDrop = document.getElementById('speciesDropdown');

  let DefaultOption = document.createElement('option');
  DefaultOption.textContent = "Pick a Species OR Defaults to Unidentified";
  DefaultOption.value = 999999999;

  speciesDrop.appendChild(DefaultOption);

  let req = new XMLHttpRequest();

  //open the request to /speciesDropdown
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

function buildPersonID(){
    // build PERSON DROPDOWN FOR ID
    let personDrop = document.getElementById('personDropdown');

    let DefaultOption = document.createElement('option');
    DefaultOption.textContent = "Pick a Person";
  
    personDrop.appendChild(DefaultOption);
  
    let req = new XMLHttpRequest();
  
    //open the request to /addSpecimen
    req.open('GET','https://johnhash.me/flies/personDropdown', true);
    //req.setRequestHeader('Content-Type', 'application/json');
    req.onload = function(){
      if(req.status >= 200 && req.status < 400){
        var response = JSON.parse(req.responseText);
        console.log(response);
        for (let j in response){
          let option = document.createElement('option');
          option.value = response[j].id;
          let firstName = response[j].first_name;
          let lastName = response[j].last_name;
  
          option.textContent = lastName + ', ' + firstName;
          personDrop.appendChild(option);
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

  let speciesDrop = document.getElementById('speciesDropdown');
  speciesDrop.length = 0;
  let personDrop = document.getElementById('personDropdown');
  personDrop.length = 0;
}

/******************************************************************************
 * Here is where the destroy dropdown menus function END.
 *****************************************************************************/


 /******************************************************************************
 * Here is where the the ADD functions BEGIN.
 ******************************************************************************/

// ADD A PERSON SPECIES RELATIONSHIP
document.getElementById('enterAuthor').addEventListener('click', function(event){
    
  let req = new XMLHttpRequest(); 

  // assign the values in the input boxes to variables for building the url string
  let speciesIdInput = document.getElementById('speciesDropdown').value;
  let authorInput = document.getElementById('personDropdown').value;
  
  console.log(speciesIdInput);
  console.log(authorInput);
  
  // this is the whole query string starting with ? to be inserted in front of path
  let payload = '?species_id='+speciesIdInput+'&people_id='+authorInput;
  
  console.log(payload);
  //open the request to /addPersonEvent
  req.open('GET','https://johnhash.me/flies/addAuthor'+payload, true);
  req.setRequestHeader('Content-Type', 'application/json');
  req.addEventListener('load',function(){
    if(req.status >= 200 && req.status < 400){
      //var response = JSON.parse(req.responseText);
      //alert(response);
    } else {
      console.log("Error in network request: " + req.statusText);
    }});
  req.send(JSON.stringify(payload));
  alert ("Person / Species Relationship Added");
  // call function again to update dropdowns
  //event.preventDefault();
  console.log(payload);
  destroyDropdowns();

});

 /******************************************************************************
 * Here is where the the ADD functions END.
 ******************************************************************************/