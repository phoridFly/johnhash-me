
//const possibleCharacterArray = ["selectedGenus", "pairs_of_supraantennals","labrum_shape","anterior_to_posterior_scutellar_setae_ratio","pleuron_color","anepisternal_setae","hind_femur_maculation"];
const currentSpeciesDataArray = [];
const unwantedKeys = ["id", "family", "species_id", "year", "genus", "specific_epithet"];

function fetchKeyCharacters(selectedGenus) {

    document.querySelector("#loader").style.visibility = "visible";

    // update UI to show which genus was selected
    let genusSelected = document.getElementById('selectedGenus');
    let specifiedGenus = document.createElement('p');
    specifiedGenus.textContent = selectedGenus;
    //genusSelected.appendChild(specifiedGenus);


    //grab the parent ul element
    let characterList = document.getElementById('characterForm');
    //first destroy any list already there to clear out room if user wants to see other genera
    while(characterList.firstChild) {
      characterList.removeChild(characterList.lastChild);
    }
 
    let req = new XMLHttpRequest();
    let payload = "?selectedGenus="+selectedGenus;
  
    req.open('GET','https://johnhash.me/flies/keyCharacters'+payload, true);
    req.onload = function(){
      if(req.status >= 200 && req.status < 400){
        var response = JSON.parse(req.responseText);


        // create a hidden radio button for the genus selected
        let genusGroup = document.createElement('fieldset');
        genusGroup.setAttribute("id", "genus");
        let genusGroupLegend = document.createElement('legend');
        genusGroupLegend.textContent = "genus";

        let genusRadioLabel = document.createElement('label');
        genusRadioLabel.setAttribute("for", "genus");
        genusRadioLabel.textContent = selectedGenus;

        let genusRadioButton = document.createElement('input');
        genusRadioButton.setAttribute("type", "radio");
        genusRadioButton.setAttribute("name", "genus");
        genusRadioButton.setAttribute("checked", "checked");

        genusRadioButton.setAttribute("value", selectedGenus);

        genusGroup.appendChild(genusGroupLegend);
        genusRadioLabel.appendChild(genusRadioButton);
        genusGroup.appendChild(genusRadioLabel);


        characterList.appendChild(genusGroup);


        for (let char in response) {
            let radioGroup = document.createElement('fieldset');
            let groupLegend = document.createElement('legend');

            // get rid of underscore for legends
            let legendNoUnderscore = char.replaceAll('_', ' ');
            groupLegend.textContent = legendNoUnderscore;
            radioGroup.appendChild(groupLegend);

            let charName = char;
            radioGroup.setAttribute("id", charName);

            // create the default "All" label and radio button
            let radioLabelALL = document.createElement('label');
            radioLabelALL.setAttribute("for", "all");

            radioLabelALL.textContent = "all";

            let defaultRadioButton = document.createElement('input');
            defaultRadioButton.setAttribute("type", "radio");
            defaultRadioButton.setAttribute("name", charName);
            defaultRadioButton.setAttribute("value", "all");
            defaultRadioButton.setAttribute("checked", "checked");
            defaultRadioButton.setAttribute("onclick","submitKeyChars();");

            // append the "ALL" radio button to label
            radioLabelALL.appendChild(defaultRadioButton);
            let breakTag = document.createElement('br');
            radioLabelALL.appendChild(breakTag);
            
            // append the label
            radioGroup.appendChild(radioLabelALL);


            for (let charState in response[char]) {

              // create the radio button for character state
              let radioButton = document.createElement('input');
              radioButton.setAttribute("type", "radio");
              radioButton.setAttribute("name", charName);
              radioButton.setAttribute("value", response[char][charState]);
              radioButton.setAttribute("onclick","submitKeyChars();");

              // create the label
              let radioLabel = document.createElement('label');
              radioLabel.setAttribute("for", response[char][charState]);
              radioLabel.textContent = response[char][charState];



              // append the radio button to label
              radioLabel.appendChild(radioButton);

              // create the image for the character state
              let showMeTag = document.createElement('span');
              showMeTag.textContent = "VIEW";
              let charStateImage = document.createElement('img');
              console.log(selectedGenus + " " + legendNoUnderscore + " " + response[char][charState] + ".png");

              // create the path and file name
              let charaterFileName = selectedGenus + " " + legendNoUnderscore + " " + response[char][charState] + ".png";
              // set the source attribute
              charStateImage.setAttribute("src", "./images/" + charaterFileName);

              showMeTag.appendChild(charStateImage);

              radioLabel.appendChild(showMeTag);

              
              let breakTag = document.createElement('br');
              radioLabel.appendChild(breakTag);


              
              // append the label
              radioGroup.appendChild(radioLabel);
              
            }
            characterList.appendChild(radioGroup);

        }
        // code for a single submit button, but I changed it to submit with each radio button click
        
        // let submitButton = document.createElement('input');
        // submitButton.setAttribute("type", "button");
        // submitButton.setAttribute("id", "submitButton");

        // submitButton.setAttribute("value", "Submit Choices");
        // submitButton.setAttribute("onclick","submitKeyChars();");
        // characterList.appendChild(submitButton);
        document.querySelector("#loader").style.visibility = "hidden";


      } 
      else {
        console.log("Error in network request: " + req.statusText);
      }
    }
    req.send();
   
     
}


function submitKeyChars() {


  // clear the currentSpeciesDataArray to make way for the new choices
  currentSpeciesDataArray.length = 0;

  let parentUL = document.getElementById("currentSpeciesList");
  //first destroy any list of species before updating
  while(parentUL.firstChild) {
    parentUL.removeChild(parentUL.lastChild);
  }


  characterCounter = 0;


  let req = new XMLHttpRequest();




    let queryString = "?";

    let checkedRadios = document.querySelectorAll('input[type="radio"]')

    //console.log(checkedRadios);
    for (let i = 0; i < checkedRadios.length; i++) {
      if(checkedRadios[i].checked == true) {

        let attributeName = checkedRadios[i].name;
        if (attributeName == "genus") {
          attributeName = "selectedGenus";
        }

        queryString = queryString + attributeName + "=" + checkedRadios[i].value + "&";
        characterCounter++;

      }
  
    }
    // slice out the last ampersand
    let queryStringEdited = queryString.slice(0, -1);
    

  
    req.open('GET','https://johnhash.me/flies/selectedCharacters'+queryStringEdited, true);
    req.onload = function(){
      if(req.status >= 200 && req.status < 400){
        var response = JSON.parse(req.responseText);
        console.log(response);

        // build up the current species list
        for (let sp in response) {
          let fullname = response[sp].genus + " " + response[sp].specific_epithet;
          let speciesItem = document.createElement("li");
          speciesItem.textContent = fullname;
          speciesItem.setAttribute("id", response[sp].specific_epithet);
          speciesItem.setAttribute("onclick","getSpeciesInfo(this.id);");

          parentUL.appendChild(speciesItem);

          currentSpeciesDataArray.push(response[sp]);

        }

      } 
      else {
        console.log("Error in network request: " + req.statusText);
      }
    }
    req.send();


  
}


function getSpeciesInfo(speciesName) {

  // the thrid column flex box
  let detailsBox = document.getElementById("speciesDetails");
  // the table
  let descriptionList = document.getElementById("selectedSpecies");
  // the image wrapper div at bottom of flex box
  let imageWrapper = document.getElementById("speciesImgWrapper");


  //first destroy any table of species attributes before updating
  while(descriptionList.firstChild) {
    descriptionList.removeChild(descriptionList.lastChild);
  }

  // remove any of the images from the column before updating
  while(imageWrapper.firstChild) {
    imageWrapper.removeChild(imageWrapper.lastChild)
  }


  let epithetRow = document.createElement("tr");
  let specEpithet = document.createElement("td");
  let specEpithetVal = document.createElement("td");

  specEpithet.textContent = "epithet";
  specEpithet.style.fontWeight = "bolder";
  specEpithetVal.textContent = speciesName;
  epithetRow.appendChild(specEpithet);
  epithetRow.appendChild(specEpithetVal);


  descriptionList.appendChild(epithetRow);


  currentSpeciesDataArray.forEach(species => {

    if (species.specific_epithet == speciesName){

      for (let key in species) {

        let unwantedFound = false;

        //console.log(species.hasOwnProperty(key));
        //console.log(species[key]);

        if (species.hasOwnProperty(key)) {
            
          let currentAttribute = key.toString();

          // check if the key is in the "unwanted list
          unwantedKeys.forEach(element => {
            if (currentAttribute === element) {
              unwantedFound = true;
                
            }
            
          });

          if (unwantedFound == false) {


            if (currentAttribute == "habitus_image" || currentAttribute == "terminalia_lateral_image" || currentAttribute == "terminalia_dorsal_image" ) {

              // create image wrapper

              let newImage = document.createElement("img");
              newImage.setAttribute("src", "./images/" + species[key]);
              newImage.setAttribute("class", "speciesImages");

              imageWrapper.appendChild(newImage);

              detailsBox.appendChild(imageWrapper);
              
            } else if (species[key] !== ""){

              let newDetailsRow = document.createElement("tr");
              let newKey = document.createElement("td");
              newKey.setAttribute("class", "descriptionAttribute");
              let newVal = document.createElement("td");

              let keyNoUnderscore = key.replaceAll('_', ' ');


              newKey.textContent = keyNoUnderscore;
              newVal.textContent = species[key];

              newDetailsRow.appendChild(newKey);
              newDetailsRow.appendChild(newVal);
              descriptionList.appendChild(newDetailsRow);
              
            }
          }  
        }
      }
    }
  });
}