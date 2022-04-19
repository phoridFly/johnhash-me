// Create Dropdown Menus When First Loaded
document.addEventListener('DOMContentLoaded', buildDropdowns);

// this function is called when page loads or when new data is added to the database
function buildDropdowns(){  
    
    
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
    DefaultOption.value = 999999999;
    
    collEventDrop.appendChild(DefaultOption);
  
    let req = new XMLHttpRequest();
  
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

  let collEventDrop = document.getElementById('collEventDropdown');
  collEventDrop.length = 0;
}

/******************************************************************************
 * Here is where the destroy dropdown menus function END.
 *****************************************************************************/


 /******************************************************************************
 * Here is where the the ADD functions BEGIN.
 ******************************************************************************/

// ADD A NEW ALCOHOL LOT
document.getElementById('enterAlcoholLot').addEventListener('click', function(event){
    
console.log('clicked');
    let req = new XMLHttpRequest(); 

    // assign the values in the input boxes to variables for building the url string
    let CollEventIDInput = document.getElementById('collEventDropdown').value;
    let EmptyInput = document.getElementById('empty').value;
    let ApproximateNumberInput = document.getElementById('approximate_number').value;
    let SampleTaxaInput = document.getElementById('sample_taxa').value;
    let CollectorCodeInput = document.getElementById('collector_code').value;

    

    // this is the whole query string starting with ? to be inserted in front of path
    let payload = '?collecting_event_id='+CollEventIDInput + '&empty='+EmptyInput
    + '&approx_number='+ApproximateNumberInput + '&sample_taxa='+SampleTaxaInput + '&collector_code='+CollectorCodeInput;

    console.log(payload);
    //open the request to /addAlcoholLot
    req.open('GET','/flies/addAlcoholLot'+payload, true);
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
    alert ("Alcohol Lot Added");
    destroyDropdowns();
});

 /******************************************************************************
 * Here is where the the ADD functions END.
 ******************************************************************************/