 /******************************************************************************
 * Here is where the the ADD functions BEGIN.
 ******************************************************************************/

// ADD A NEW SPECIMEN
document.getElementById('enterPerson').addEventListener('click', function(event){
    
  let req = new XMLHttpRequest(); 

  // assign the values in the input boxes to variables for building the url string
  let firstNameInput = document.getElementById('first_name').value;
  let lastNameInput = document.getElementById('last_name').value;
  let userId = document.getElementById('user_id').value;

  // this is the whole query string starting with ? to be inserted in front of path
  let payload = '?first_name='+firstNameInput+'&last_name='+lastNameInput+'&appID='+userId;
  
  //open the request to /addPerson
  req.open('GET','/flies/addPerson'+payload, true);
  req.setRequestHeader('Content-Type', 'application/json');
  req.addEventListener('load',function(){
    if(req.status >= 200 && req.status < 400){
      //var response = JSON.parse(req.responseText);
      //alert(response);
    } else {
      console.log("Error in network request: " + req.statusText);
    }});
  req.send(JSON.stringify(payload));
  alert ("Person Added");
});

 /******************************************************************************
 * Here is where the the ADD functions END.
 ******************************************************************************/