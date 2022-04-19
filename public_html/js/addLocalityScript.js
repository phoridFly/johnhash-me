 /******************************************************************************
 * Here is where the the ADD functions BEGIN.
 ******************************************************************************/


// ADD A NEW LOCALITY
document.getElementById('enterLocality').addEventListener('click', function(event){
    
  let req = new XMLHttpRequest(); 

  // assign the values in the input boxes to variables for building the url string
  let countryInput = document.getElementById('country').value;
  let regionInput = document.getElementById('region').value;
  let placeInput = document.getElementById('place').value;
  let longitudeInput = document.getElementById('long').value;
  let latitudeInput = document.getElementById('lat').value;
  let elevationInput = document.getElementById('elev').value;
  let userId = document.getElementById('user_id').value;


  // this is the whole query string starting with ? to be inserted in front of path
  let payload = '?country='+countryInput+'&region='+regionInput+'&place='+placeInput+'&longitude='+longitudeInput+'&latitude='+latitudeInput+'&elevation='+elevationInput+'&appID='+userId;
  
  //open the request to /addLocality
  req.open('GET','https://johnhash.me/flies/addLocality'+payload, true);
  req.setRequestHeader('Content-Type', 'application/json');
  req.addEventListener('load',function(){
    if(req.status >= 200 && req.status < 400){
      //var response = JSON.parse(req.responseText);
      //alert(response);
    } else {
      console.log("Error in network request: " + req.statusText);
    }});
  req.send(JSON.stringify(payload));
  alert ("Locality Added");
});

 /******************************************************************************
 * Here is where the the ADD functions END.
 ******************************************************************************/