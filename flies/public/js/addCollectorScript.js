// Create Dropdown Menus When First Loaded
document.addEventListener('DOMContentLoaded', buildDropdowns);

// this function is called when page loads or when new data is added to the database
function buildDropdowns(){
  // builds dropdown for person(collector) collecting event add
  buildPersonID();

  // builds dropdwon for specimen add
  buildCollEventID();
}

/******************************************************************************
 * Here is where the build dropdown menus functions BEGIN.
 *****************************************************************************/

function buildCollEventID() {

  // build COLLECTING EVENT DROPDOWN FOR ID
  let collEventDrop = document.getElementById('collEventDropdown');

  let DefaultOption = document.createElement('option');
  DefaultOption.textContent = "Pick a Collecting Event";

  collEventDrop.appendChild(DefaultOption);

  let req = new XMLHttpRequest();

  //open the request to /addSpecimen
  req.open('GET','/flies/collEventDropdown', true);
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

        option.textContent = country + ', ' + place + ', ' + start_date + ', ' + end_date + ', ' +method;
        collEventDrop.appendChild(option);
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
    req.open('GET','/flies/personDropdown', true);
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

  let personDrop = document.getElementById('personDropdown');
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

// ADD A PERSON COLLECTING EVENT RELATIONSHIP
document.getElementById('enterCollector').addEventListener('click', function(event){
    
  let req = new XMLHttpRequest(); 

  // assign the values in the input boxes to variables for building the url string
  let collEventIdInput = document.getElementById('collEventDropdown').value;
  let personIdInput = document.getElementById('personDropdown').value;
  let userId = document.getElementById('user_id').value;

  console.log("in here");
  
  // this is the whole query string starting with ? to be inserted in front of path
  let payload = '?people_id='+personIdInput+'&coll_event_id='+collEventIdInput+'&appID='+userId;
  
  //open the request to /addPersonEvent
  req.open('GET','/flies/addCollector'+payload, true);
  req.setRequestHeader('Content-Type', 'application/json');
  req.addEventListener('load',function(){
    if(req.status >= 200 && req.status < 400){
      //var response = JSON.parse(req.responseText);
      //alert(response);
    } else {
      console.log("Error in network request: " + req.statusText);
    }});
  req.send(JSON.stringify(payload));
  //alert ("Person / Collecting Event Relationship Added");
  // call function again to update dropdowns
  destroyDropdowns();

});

 /******************************************************************************
 * Here is where the the ADD functions END.
 ******************************************************************************/