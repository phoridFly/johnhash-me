 /******************************************************************************
 * Here is where the the ADD functions BEGIN.
 ******************************************************************************/

// ADD A NEW SPECIES
document.getElementById('enterSpecies').addEventListener('click', function(event){
    
  let req = new XMLHttpRequest(); 

  // assign the values in the input boxes to variables for building the url string
  let familyInput = document.getElementById('family').value;
  let genusInput = document.getElementById('genus').value;
  let specificEpithetInput = document.getElementById('specific_epithet').value;
  let yearInput = document.getElementById('year').value;

  // this is the whole query string starting with ? to be inserted in front of path
  let payload = '?family='+familyInput+'&genus='+genusInput+'&specific_epithet='+specificEpithetInput+'&year='+yearInput;
  
  //open the request to /addSpecies
  req.open('GET','/flies/addSpecies'+payload, true);
  req.setRequestHeader('Content-Type', 'application/json');
  req.addEventListener('load',function(){
    if(req.status >= 200 && req.status < 400){
      //var response = JSON.parse(req.responseText);
      //alert(response);
    } else {
      console.log("Error in network request: " + req.statusText);
    }});
  req.send(JSON.stringify(payload));
  alert ("Species Added");
});

 /******************************************************************************
 * Here is where the the ADD functions END.
 ******************************************************************************/