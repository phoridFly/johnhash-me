var express = require('express');
var bodyParser = require('body-parser');
var mysql = require('./dbcon.js');
var app = express();
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())

// secret key for being able to update the db from the app
const CONSTANTS = require('./constants.js');

// update these arrays for specific characters that are useful for each genus
// Myriophora
const myriophoraKeyCharacters = ["pairs_of_supraantennals","anepisternal_setae","hind_femur_maculation","costal_vein","labrum_shape","upper_supraantennal_position","abdominal_T6_shape","abdominal_T5_color"];
const oreophilophoraKeyCharacters = ["pairs_of_supraantennals", "eye_size","costal_vein","vein_sc"];

const pseudomyriophoraKeyCharacters = ["pairs_of_supraantennals", "lower_interfrontals_position", "vein_sc", "hind_femur_maculation"];

const { response } = require('express');

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*"); 
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
 });

// mount routes here
app.use('/flies/species/',                    require('./routes/routes_species'));
app.use('/flies/species/:id',                 require('./routes/routes_species'));
app.use('/flies/species/:sid/people/:pid',    require('./routes/routes_authors'));
app.use('/flies/specimens/',                  require('./routes/routes_specimens'));
app.use('/flies/specimens/:id',               require('./routes/routes_specimens'));
app.use('/flies/people/',                     require('./routes/routes_people'));
app.use('/flies/people/:id',                  require('./routes/routes_people'));
app.use('/flies/localities',                  require('./routes/routes_localities'));
app.use('/flies/collecting-events',           require('./routes/routes_collecting_events'));
app.use('/flies/collecting-events/:id',       require('./routes/routes_collecting_events'));
app.use('/flies/collectors/',                 require('./routes/routes_collectors'));
app.use('/flies/collectors/:cid/people/:pid', require('./routes/routes_collectors'));
app.use('/flies/authors/',                    require('./routes/routes_authors'));
app.use('/flies/authors/:pid/species/:sid',   require('./routes/routes_authors'));
app.use('/flies/lots/',                       require('./routes/routes_alcohol_lots'));
app.use('/flies/lots/:id',                    require('./routes/routes_alcohol_lots'));













// GET route for ALL SPECIES in the DB
// Page Needs:
// ID | Family | Genus | Specific_Epithet | Year | Diagnosis | Image
// URL : http://johnhash.me:36666/speciesList
// URL : http://johnhash.me/flies
// app.get('/flies/speciesList', function(request, response, next){

//     //console.log("before mysql query");

//     let context = {};
//     //let selectedGenus = request.params.selectedGenus;

//     //let speciesQuery = "SELECT species.id, species.genus, species.specific_epithet, species.habitus_image FROM species WHERE species.genus = '"+selectedGenus+"' GROUP BY genus, specific_epithet ASC";
//     let speciesQuery = 'SELECT species.id, species.genus, species.specific_epithet, species.habitus_image FROM species WHERE species.genus =? AND species.specific_epithet <> "Unidentified" GROUP BY genus, specific_epithet ASC';

//     mysql.pool.query(speciesQuery, [request.query.selectedGenus], function(error, speciesList, fields){
//         if (error) {
//             next(error);
//             return;
//         }
        
//         let data = [];
//         for (let x in speciesList){
//             let speciesData = {'id': speciesList[x].id, 'genus': speciesList[x].genus, 'specific_epithet': speciesList[x].specific_epithet, 'habitus_image': speciesList[x].habitus_image};
//             data.push(speciesData);
//         }
//         //console.log("after mysql query");
//         context.items = JSON.stringify(data);
//         response.send(context.items);

//     });
// });

// app.get('/flies/speciesInfo', function(request, response, next){

//     //console.log("before mysql query");

//     let context = {};

//     let speciesQuery = 'SELECT people.first_name, people.last_name, species.id, species.genus, species.specific_epithet, species.year, species.diagnosis, species.habitus_image FROM people INNER JOIN species_people ON species_people.people_id = people.id INNER JOIN species ON species.id = species_people.species_id WHERE species.id = ?';

//     mysql.pool.query(speciesQuery, [request.query.id],function(error, speciesInfo, fields){
//         if (error) {
//             next(error);
//             return;
//         }
        
//         let data = [];
//         for (let x in speciesInfo){
//             let speciesData = {'first_name': speciesInfo[x].first_name, 'last_name': speciesInfo[x].last_name,'id': speciesInfo[x].id, 'genus': speciesInfo[x].genus, 'specific_epithet': speciesInfo[x].specific_epithet, 'year': speciesInfo[x].year, 'diagnosis': speciesInfo[x].diagnosis, 'habitus_image': speciesInfo[x].habitus_image};
//             data.push(speciesData);
//         }
//         //console.log("after mysql query");
        
//         context.items = JSON.stringify(data);
//         //console.log(context.items);
//         response.send(context.items);

//     });
// });

// app.get('/flies/speciesCountryFound', function(request, response, next){

//     //console.log("before mysql query");

//     let context = {};

//     let specCountryFoundQuery = "SELECT DISTINCT locality.country, locality.longitude, locality.latitude FROM locality INNER JOIN collecting_event ON locality.id = collecting_event.locality_id INNER JOIN specimen ON collecting_event.id = specimen.collecting_event_id INNER JOIN species ON specimen.species_id = species.id WHERE species.id =? AND collecting_event.id <> '640'";
//     mysql.pool.query(specCountryFoundQuery,[request.query.id],function(error, speciesCountryFound, fields) {
//         if (error) {
//             next(error);
//             return;
//         }

//         let data = [];
//         for (let x in speciesCountryFound){
//             let speciesData = {'country': speciesCountryFound[x].country, 'longitude': speciesCountryFound[x].longitude, 'latitude': speciesCountryFound[x].latitude};
//             data.push(speciesData);
//         }
//         //console.log("after mysql query");
        
//         context.items = JSON.stringify(data);
//         //console.log(context.items);
//         response.send(context.items);

//     });
// });

// this will setup the key for the genus we want
app.get('/flies/keyCharacters', function(request, response, next){


    let keyQuery = 'SELECT * FROM `species_descriptions` sd INNER JOIN species s ON sd.species_id = s.id WHERE s.genus = ?';
    mysql.pool.query(keyQuery, [request.query.selectedGenus], function(error, keyData, fields){
        if (error) {
            next(error);
            return;
        }

        // setup the characters to send back based on the preferred characters array
        let content = {};

        switch (request.query.selectedGenus) {
            case "Myriophora":
                for (let i = 0; i < myriophoraKeyCharacters.length; i++) {
                    let distinctOptions = [...new Set(keyData.map(x => x[myriophoraKeyCharacters[i]]))];
                    content[myriophoraKeyCharacters[i]] = distinctOptions;
                }  
                break;
            case "Oreophilophora":
                for (let i = 0; i < oreophilophoraKeyCharacters.length; i++) {
                    let distinctOptions = [...new Set(keyData.map(x => x[oreophilophoraKeyCharacters[i]]))];
                    content[oreophilophoraKeyCharacters[i]] = distinctOptions;
                }  
                break;
            case "Pseudomyriophora":
                for (let i = 0; i < pseudomyriophoraKeyCharacters.length; i++) {
                    let distinctOptions = [...new Set(keyData.map(x => x[pseudomyriophoraKeyCharacters[i]]))];
                    content[pseudomyriophoraKeyCharacters[i]] = distinctOptions;
                }  
                break;
        
            default:
                break;
        }

        response.send(content);

    });
});

// route for querying based on the selected characters
app.get('/flies/selectedCharacters', function(request, response, next){

    // setup array for optional parameters
    let selectedParams = [request.query.selectedGenus];
    // base query here
    let keyQuery = 'SELECT * FROM `species_descriptions` sd INNER JOIN species s ON sd.species_id = s.id WHERE 1 = 1 AND s.genus = ?';


    switch (request.query.selectedGenus) {
        case "Myriophora":
            for (let c = 0; c < myriophoraKeyCharacters.length; c++) {
                for (const key in request.query) {
                    let paramName = myriophoraKeyCharacters[c];

                    if (key.toString() === paramName && request.query[key] !== "all"){
                        keyQuery = keyQuery + " AND sd." + paramName + " = ?";
                        selectedParams.push(request.query[key]); 
                    }
                }
            }
            break;

        case "Oreophilophora":
            for (let c = 0; c < oreophilophoraKeyCharacters.length; c++) {
                for (const key in request.query) {
                    let paramName = oreophilophoraKeyCharacters[c];

                    if (key.toString() === paramName && request.query[key] !== "all"){
                        keyQuery = keyQuery + " AND sd." + paramName + " = ?";
                        selectedParams.push(request.query[key]); 
                    }
                }
            }
            break;
            
        case "Pseudomyriophora":
            for (let c = 0; c < pseudomyriophoraKeyCharacters.length; c++) {
                for (const key in request.query) {
                    let paramName = pseudomyriophoraKeyCharacters[c];

                    if (key.toString() === paramName && request.query[key] !== "all"){
                        keyQuery = keyQuery + " AND sd." + paramName + " = ?";
                        selectedParams.push(request.query[key]); 
                    }
                }
            }
            break;
        
    
        default:
            break;
    }

    mysql.pool.query(keyQuery, selectedParams, function(error, keyData, fields){
        if (error) {
            next(error);
            return;
        }

        // setup the characters to send back
        response.send(keyData);

    });
});


/************************************************************************
  BEGIN: the UPDATE queries and Modifying queries
 ***********************************************************************/

//
//                  START SPECIMENS
//

// app.get('/flies/modSpecimen', function(request, response, next){

//     let initialQuery = 'SELECT specimen.id, specimen.institution_code, specimen.collection_code, specimen.catalog_number, specimen.species_id, species.genus, '
//     + 'species.specific_epithet, specimen.collecting_event_id, locality.country, locality.place, DATE_FORMAT(collecting_event.start_date, "%b %d %Y") AS start_date, DATE_FORMAT(collecting_event.end_date, "%b %d %Y") AS end_date, '
//     + 'collecting_event.method, specimen.type_status, specimen.sex, specimen.image_name FROM specimen '
//     + 'INNER JOIN collecting_event ON specimen.collecting_event_id = collecting_event.id '
//     + 'INNER JOIN locality ON collecting_event.locality_id = locality.id '
//     + 'INNER JOIN species ON specimen.species_id = species.id '
//     + 'ORDER BY species.specific_epithet, specimen.catalog_number';

//     mysql.pool.query(initialQuery, function(error, specimens, fields){
//         if (error) {
//             next(error);
//             return;
//         }
//         //console.log(specimens);
//         response.render('modSpecimen', {
//             title: 'Modify Specimens in the Database',
//             specimens: specimens
//         });
//     });

// });

// app.get('/flies/updateSpecimen', function(request, response, next){

//     let initialQuery = 'SELECT specimen.id, specimen.institution_code, specimen.collection_code, specimen.catalog_number, specimen.species_id, species.genus, '
//     + 'species.specific_epithet, specimen.collecting_event_id, locality.country, locality.place, DATE_FORMAT(collecting_event.start_date, "%b %d %Y") AS start_date, DATE_FORMAT(collecting_event.end_date, "%b %d %Y") AS end_date, '
//     + 'collecting_event.method, specimen.type_status, specimen.sex, specimen.image_name FROM specimen '
//     + 'INNER JOIN collecting_event ON specimen.collecting_event_id = collecting_event.id '
//     + 'INNER JOIN locality ON collecting_event.locality_id = locality.id '
//     + 'INNER JOIN species ON specimen.species_id = species.id WHERE specimen.id=?';

//     mysql.pool.query(initialQuery,[request.query.id], function(error, items, fields){
//         if (error) {
//             next(error);
//             return;
//         }
//         //console.log(items);
//         response.render('modSpecimenForm', {
//             items: items
//         });
//     });

// });

// app.get('/flies/updateSpecimenSubmit', function(request, response, next){

//     if (request.query.user_id == CONSTANTS.appID) {

//         mysql.pool.query("UPDATE specimen SET institution_code =?, collection_code =?, catalog_number =?, species_id =?, collecting_event_id =?, type_status =?, sex =?, image_name =? WHERE id =?",
//         [request.query.institution_code, request.query.collection_code, request.query.catalog_number, request.query.species_id, request.query.collecting_event_id, request.query.type_status, request.query.sex, request.query.image_name, request.query.id],
//         function(error, result){
//             if (error) {
//                 next(error);
//                 return;
//             }

//             let initialQuery = 'SELECT specimen.id, specimen.institution_code, specimen.collection_code, specimen.catalog_number, specimen.species_id, species.genus, '
//             + 'species.specific_epithet, specimen.collecting_event_id, locality.country, locality.place, DATE_FORMAT(collecting_event.start_date, "%b %d %Y") AS start_date, DATE_FORMAT(collecting_event.end_date, "%b %d %Y") AS end_date,'
//             + 'specimen.type_status, specimen.sex, specimen.image_name FROM specimen '
//             + 'INNER JOIN collecting_event ON specimen.collecting_event_id = collecting_event.id '
//             + 'INNER JOIN locality ON collecting_event.locality_id = locality.id '
//             + 'INNER JOIN species ON specimen.species_id = species.id '
//             + 'ORDER BY species.specific_epithet, specimen.catalog_number';

//             mysql.pool.query(initialQuery, function(error, specimens, fields){
//                 if (error) {
//                     next(error);
//                     return;
//                 }
//                 //console.log('select all');
//                 response.render('modSpecimen', {
//                     title: 'Modify Specimens in the Database',
//                     specimens: specimens    
//                 });
//             });
//         });

//     }

//     else {

//         let initialQuery = 'SELECT specimen.id, specimen.institution_code, specimen.collection_code, specimen.catalog_number, specimen.species_id, species.genus, '
//         + 'species.specific_epithet, specimen.collecting_event_id, locality.country, locality.place, DATE_FORMAT(collecting_event.start_date, "%b %d %Y") AS start_date, DATE_FORMAT(collecting_event.end_date, "%b %d %Y") AS end_date,'
//         + 'specimen.type_status, specimen.sex, specimen.image_name FROM specimen '
//         + 'INNER JOIN collecting_event ON specimen.collecting_event_id = collecting_event.id '
//         + 'INNER JOIN locality ON collecting_event.locality_id = locality.id '
//         + 'INNER JOIN species ON specimen.species_id = species.id '
//         + 'ORDER BY species.specific_epithet, specimen.catalog_number';

//         mysql.pool.query(initialQuery, function(error, specimens, fields){
//             if (error) {
//                 next(error);
//                 return;
//             }
//             //console.log('select all');
//             response.render('modSpecimen', {
//                 title: 'Modify Specimens in the Database',
//                 specimens: specimens    
//             });
//         });

//     }

// });

//
//                  END SPECIMENS
//

//
//                  START SPECIES
//

// app.get('/flies/modSpecies', function(request, response, next){

//     let initialQuery = 'SELECT id, family, genus, specific_epithet, year FROM species';

//     mysql.pool.query(initialQuery, function(error, species, fields){
//         if (error) {
//             next(error);
//             return;
//         }
//         response.render('modSpecies', {
//             title: 'Modify Species in the Database',
//             species: species
//         });
//     });

// });

// app.get('/flies/updateSpecies', function(request, response, next){

//     let initialQuery = 'SELECT id, family, genus, specific_epithet, year FROM species WHERE id=?';

//     mysql.pool.query(initialQuery,[request.query.id], function(error, items, fields){
//         if (error) {
//             next(error);
//             return;
//         }
//         //console.log(items);
//         response.render('modSpeciesForm', {
//             items: items
//         });
//     });

// });

// app.get('/flies/updateSpeciesSubmit', function(request, response, next){

//     if (request.query.user_id == CONSTANTS.appID) {

//         mysql.pool.query("UPDATE species SET family =?, genus =?, specific_epithet =?, year =? WHERE id =?",
//         [request.query.family, request.query.genus, request.query.specific_epithet, request.query.year, request.query.id],
//         function(error, result){
//             if (error) {
//                 next(error);
//                 return;
//             }

//             let initialQuery = 'SELECT id, family, genus, specific_epithet, year FROM species';

//             mysql.pool.query(initialQuery, function(error, species, fields){
//                 if (error) {
//                     next(error);
//                     return;
//                 }
//                 //console.log('select all');
//                 response.render('modSpecies', {
//                     title: 'Modify Species in the Database',
//                     species: species
//                 });
//             });
//         });
//     }

//     else {

//         let initialQuery = 'SELECT id, family, genus, specific_epithet, year FROM species';

//         mysql.pool.query(initialQuery, function(error, species, fields){
//             if (error) {
//                 next(error);
//                 return;
//             }
//             //console.log('select all');
//             response.render('modSpecies', {
//                 title: 'Modify Species in the Database',
//                 species: species
//             });
//         });

//     }

// });


//
//                  END SPECIES
//

//
//                  START PEOPLE
//


// app.get('/flies/modPeople', function(request, response, next){

//     let initialQuery = 'SELECT people.id, people.first_name, people.last_name FROM people';

//     mysql.pool.query(initialQuery, function(error, people, fields){
//         if (error) {
//             next(error);
//             return;
//         }
//         //console.log(people);
//         response.render('modPeople', {
//             title: 'Modify People in the Database',
//             people: people
//         });
//     });

// });

// app.get('/flies/updatePeople', function(request, response, next){

//     let initialQuery = 'SELECT people.id, people.first_name, people.last_name FROM people WHERE id=?';

//     mysql.pool.query(initialQuery,[request.query.id], function(error, items, fields){
//         if (error) {
//             next(error);
//             return;
//         }
//         //console.log(items);
//         response.render('modPeopleForm', {
//             items: items
//         });
//     });

// });

// app.get('/flies/updatePeopleSubmit', function(request, response, next){

//     // check if the user submitted the correct id
//     if (request.query.user_id == CONSTANTS.appID) {

//         mysql.pool.query("UPDATE people SET first_name =?, last_name =? WHERE id =?",
//         [request.query.first_name, request.query.last_name, request.query.id],
//         function(error, result){
//             if (error) {
//                 next(error);
//                 return;
//             }
        

//             let initialQuery = 'SELECT people.id, people.first_name, people.last_name FROM people';

//             mysql.pool.query(initialQuery, function(error, people, fields){
//                 if (error) {
//                     next(error);
//                     return;
//                 }
//                 response.render('modPeople', {
//                     title: 'Modify People in the Database',
//                     people: people
//                 });
//             });
//         });

//     }
//     else {
//         response.status(401);
//         let initialQuery = 'SELECT people.id, people.first_name, people.last_name FROM people';

//         mysql.pool.query(initialQuery, function(error, people, fields){
//             if (error) {
//                 next(error);
//                 return;
//             }
//             response.render('modPeople', {
//                 title: 'Modify People in the Database',
//                 people: people
//             });
//         });
//     }

// });


//
//                  END PEOPLE
//


//
//                  START LOCALITIES
//

// app.get('/flies/modLocality', function(request, response, next){

//     let initialQuery = 'SELECT id, country, region, place, longitude, latitude, elevation FROM locality';

//     mysql.pool.query(initialQuery, function(error, locality, fields){
//         if (error) {
//             next(error);
//             return;
//         }
//         response.render('modLocality', {
//             title: 'Modify Localities in the Database',
//             locality: locality
//         });
//     });

// });

// app.get('/flies/updateLocality', function(request, response, next){

//     let initialQuery = 'SELECT id, country, region, place, longitude, latitude, elevation FROM locality WHERE id=?';

//     mysql.pool.query(initialQuery,[request.query.id], function(error, items, fields){
//         if (error) {
//             next(error);
//             return;
//         }
//         //console.log(items);
//         response.render('modLocalityForm', {
//             items: items
//         });
//     });

// });

// app.get('/flies/updateLocalitySubmit', function(request, response, next){

//     mysql.pool.query("UPDATE locality SET country =?, region =?, place =?, longitude =?, latitude =?, elevation =? WHERE id =?",
//     [request.query.country, request.query.region, request.query.place, request.query.longitude, request.query.latitude, request.query.elevation, request.query.id],
//     function(error, result){
//         if (error) {
//             next(error);
//             return;
//         }

//         let initialQuery = 'SELECT id, country, region, place, longitude, latitude, elevation FROM locality';

//         mysql.pool.query(initialQuery, function(error, locality, fields){
//             if (error) {
//                 next(error);
//                 return;
//             }
//             response.render('modLocality', {
//                 title: 'Modify Localities in the Database',
//                 locality: locality
//             });
//         });
//     });

// });

//
//                  END LOCALITIES
//

//
//                  START COLLECTING EVENT
//


// app.get('/flies/modCollectingEvent', function(request, response, next){

//     let initialQuery = 'SELECT collecting_event.id, DATE_FORMAT(collecting_event.start_date, "%b %d %Y") AS start_date, DATE_FORMAT(collecting_event.end_date, "%b %d %Y") AS end_date, collecting_event.method, '
//     + 'locality.country, locality.region, locality.place FROM collecting_event '
//     + 'INNER JOIN locality ON collecting_event.locality_id = locality.id '
//     + 'ORDER BY collecting_event.id ASC';

//     mysql.pool.query(initialQuery, function(error, event, fields){
//         if (error) {
//             next(error);
//             return;
//         }
//         response.render('modCollectingEvent', {
//             title: 'Modify Collecting Events in the Database',
//             event: event
//         });
//     });

// });

// app.get('/flies/updateCollectingEvent', function(request, response, next){

//     let initialQuery = 'SELECT collecting_event.id, DATE_FORMAT(collecting_event.start_date, "%Y-%m-%d") AS start_date, DATE_FORMAT(collecting_event.start_date, "%b %d, %Y") AS startDateShown, DATE_FORMAT(collecting_event.end_date, "%Y-%m-%d") AS end_date, DATE_FORMAT(collecting_event.end_date, "%b %d, %Y") AS endDateShown, collecting_event.method,'
//     + 'collecting_event.locality_id, locality.country, locality.region, locality.place FROM collecting_event '
//     + 'INNER JOIN locality ON collecting_event.locality_id = locality.id WHERE collecting_event.id=?';

//     mysql.pool.query(initialQuery,[request.query.id], function(error, event, fields){
//         if (error) {
//             next(error);
//             return;
//         }
//         //console.log(event);
//         response.render('modCollectingEventForm', {
//             event: event
//         });
//     });

// });

// app.get('/flies/updateCollectingEventSubmit', function(request, response, next){

//     if (request.query.user_id == CONSTANTS.appID) {

//         mysql.pool.query("UPDATE collecting_event SET locality_id =?, method =?, start_date =?, end_date=? WHERE id =?",
//         [request.query.locality_id, request.query.method, request.query.start_date, request.query.end_date, request.query.id],
//         function(error, result){
//             if (error) {
//                 next(error);
//                 return;
//             }

//             let initialQuery = 'SELECT collecting_event.id, DATE_FORMAT(collecting_event.start_date, "%b %d %Y") AS start_date, DATE_FORMAT(collecting_event.end_date, "%b %d %Y") AS end_date, collecting_event.method, '
//             + 'locality.country, locality.region, locality.place FROM collecting_event '
//             + 'INNER JOIN locality ON collecting_event.locality_id = locality.id '
//             + 'ORDER BY collecting_event.id ASC';

//             mysql.pool.query(initialQuery, function(error, event, fields){
//                 if (error) {
//                     next(error);
//                     return;
//                 }
//                 //console.log('select all');
//                 response.render('modCollectingEvent', {
//                     title: 'Modify Collecting Events in the Database',
//                     event: event
//                 });
//             });
//         });
//     }

//     else {

//         let initialQuery = 'SELECT collecting_event.id, DATE_FORMAT(collecting_event.start_date, "%b %d %Y") AS start_date, DATE_FORMAT(collecting_event.end_date, "%b %d %Y") AS end_date, collecting_event.method, '
//         + 'locality.country, locality.region, locality.place FROM collecting_event '
//         + 'INNER JOIN locality ON collecting_event.locality_id = locality.id '
//         + 'ORDER BY collecting_event.id ASC';

//         mysql.pool.query(initialQuery, function(error, event, fields){
//             if (error) {
//                 next(error);
//                 return;
//             }
//             //console.log('select all');
//             response.render('modCollectingEvent', {
//                 title: 'Modify Collecting Events in the Database',
//                 event: event
//             });
//         });

//     }

// });

//
//                  END COLLECTING EVENT
//

//
//                  START COLLECTOR
//

// app.get('/flies/modCollector', function(request, response, next){

//     let initialQuery = 'SELECT people.first_name, people.last_name, DATE_FORMAT(collecting_event.start_date, "%b %d %Y") AS start_date, DATE_FORMAT(collecting_event.end_date, "%b %d %Y") AS end_date, '
//     + 'collecting_event.method, locality.country, locality.region, locality.place, coll_event_people.coll_event_id, '
//     + 'coll_event_people.people_id FROM people '
//     + 'INNER JOIN coll_event_people ON people.id = coll_event_people.people_id '
//     + 'INNER JOIN collecting_event ON coll_event_people.coll_event_id = collecting_event.id '
//     + 'INNER JOIN locality ON collecting_event.locality_id = locality.id '
//     + 'ORDER BY people.last_name';

//     mysql.pool.query(initialQuery, function(error, people, fields){
//         if (error) {
//             next(error);
//             return;
//         }
//         //console.log(people);
//         response.render('modCollector', {
//             title: 'Modify Collectors in the Database',
//             people: people
//         });
//     });

// });

// app.get('/flies/updateCollector', function(request, response, next){

//     let initialQuery = 'SELECT people.first_name, people.last_name, DATE_FORMAT(collecting_event.start_date, "%b %d %Y") AS start_date, DATE_FORMAT(collecting_event.end_date, "%b %d %Y") AS end_date, '
//     + 'collecting_event.method, locality.country, locality.region, locality.place, coll_event_people.coll_event_id, '
//     + 'coll_event_people.people_id FROM people '
//     + 'INNER JOIN coll_event_people ON people.id = coll_event_people.people_id '
//     + 'INNER JOIN collecting_event ON coll_event_people.coll_event_id = collecting_event.id '
//     + 'INNER JOIN locality ON collecting_event.locality_id = locality.id '
//     + 'WHERE coll_event_people.people_id=? AND coll_event_people.coll_event_id =? '
//     + 'ORDER BY people.last_name LIMIT 1';

//     mysql.pool.query(initialQuery,[request.query.people_id, request.query.coll_event_id], function(error, people, fields){
//         if (error) {
//             next(error);
//             return;
//         }
//         //console.log(people);
//         response.render('modCollectorForm', {
//             people: people
//         });
//     });

// });

// app.get('/flies/updateCollectorSubmit', function(request, response, next){

//     mysql.pool.query('UPDATE coll_event_people SET people_id =?, coll_event_id =? '
//     + 'WHERE coll_event_people.people_id=? AND coll_event_people.coll_event_id =?',
//     [request.query.people_id, request.query.coll_event_id, request.query.old_people_id, request.query.old_coll_event_id],
//     function(error, result){
//         if (error) {
//             next(error);
//             return;
//         }

//         let initialQuery = 'SELECT people.first_name, people.last_name, DATE_FORMAT(collecting_event.start_date, "%b %d %Y") AS start_date, DATE_FORMAT(collecting_event.end_date, "%b %d %Y") AS end_date, '
//         + 'collecting_event.method, locality.country, locality.region, locality.place, coll_event_people.coll_event_id, '
//         + 'coll_event_people.people_id FROM people '
//         + 'INNER JOIN coll_event_people ON people.id = coll_event_people.people_id '
//         + 'INNER JOIN collecting_event ON coll_event_people.coll_event_id = collecting_event.id '
//         + 'INNER JOIN locality ON collecting_event.locality_id = locality.id '
//         + 'ORDER BY people.last_name';

//         mysql.pool.query(initialQuery, function(error, people, fields){
//             if (error) {
//                 next(error);
//                 return;
//             }
//             //console.log(people);
//             response.render('modCollector', {
//                 title: 'Modify Collectors in the Database',
//                 people: people
//             });
//         });
//     });

// });

//
//                  END COLLECTOR
//

//
//                  START AUTHOR
//

// app.get('/flies/modAuthor', function(request, response, next){

//     let initialQuery = 'SELECT people.first_name, people.last_name, '
//     + 'species.family, species.genus, species.specific_epithet, species.year, species_people.people_id, species_people.species_id FROM people '
//     + 'INNER JOIN species_people ON people.id = species_people.people_id '
//     + 'INNER JOIN species ON species_people.species_id = species.id '
//     + 'ORDER BY species.specific_epithet';

//     mysql.pool.query(initialQuery, function(error, people, fields){
//         if (error) {
//             next(error);
//             return;
//         }
//         //console.log(people);
//         response.render('modAuthor', {
//             title: 'Modify Authors in the Database',
//             people: people
//         });
//     });

// });

// app.get('/flies/updateAuthor', function(request, response, next){

//     let initialQuery = 'SELECT people.first_name, people.last_name, '
//     + 'species.family, species.genus, species.specific_epithet, species.year, species_people.people_id, species_people.species_id FROM people '
//     + 'INNER JOIN species_people ON people.id = species_people.people_id '
//     + 'INNER JOIN species ON species_people.species_id = species.id '
//     + 'WHERE species_people.species_id =? AND species_people.people_id =? '
//     + 'ORDER BY species.specific_epithet LIMIT 1';

//     mysql.pool.query(initialQuery,[request.query.species_id, request.query.people_id], function(error, people, fields){
//         if (error) {
//             next(error);
//             return;
//         }
//         //console.log(people);
//         response.render('modAuthorForm', {
//             people: people
//         });
//     });

// });

// app.get('/flies/updateAuthorSubmit', function(request, response, next){

//     mysql.pool.query('UPDATE species_people SET species_id =?, people_id =? '
//     + 'WHERE species_people.species_id=? AND species_people.people_id =?',
//     [request.query.species_id, request.query.people_id, request.query.old_species_id, request.query.old_people_id],
//     function(error, result){
//         if (error) {
//             next(error);
//             return;
//         }

//         let initialQuery = 'SELECT people.first_name, people.last_name, '
//         + 'species.family, species.genus, species.specific_epithet, species.year, species_people.people_id, species_people.species_id FROM people '
//         + 'INNER JOIN species_people ON people.id = species_people.people_id '
//         + 'INNER JOIN species ON species_people.species_id = species.id '
//         + 'ORDER BY species.specific_epithet';

//         mysql.pool.query(initialQuery, function(error, people, fields){
//             if (error) {
//                 next(error);
//                 return;
//             }
//             //console.log(people);
//             response.render('modAuthor', {
//                 title: 'Modify Authors in the Database',
//                 people: people
//             });
//         });
//     });

// });

//
//                  END AUTHOR
//

//
//                  START ALCOHOL LOTS
//

// app.get('/flies/modAlcoholLots', function(request, response, next){

//     let initialQuery = 'SELECT alcohol_lots.id, collecting_event.id AS cei, locality.country, locality.region, alcohol_lots.empty, alcohol_lots.approx_number, alcohol_lots.sample_taxa, alcohol_lots.collector_code FROM locality '
//     + 'INNER JOIN collecting_event ON locality.id = collecting_event.locality_id '
//     + 'INNER JOIN alcohol_lots ON collecting_event.id = alcohol_lots.collecting_event_id '
//     + 'ORDER BY alcohol_lots.id ASC';

//     mysql.pool.query(initialQuery, function(error, lots, fields){
//         if (error) {
//             next(error);
//              return;
//          }
//         response.render('modAlcoholLots', {
//             title: 'Modify Alcohol Lots in the Database',
//             lots: lots
//         });
//     });

// });




//
//                  END ALCOHOL LOTS
//



/************************************************************************
  END: the UPDATE queries and Modifying queries
 ***********************************************************************/



/************************************************************************
  BEGIN: the INSERT queries 
 ***********************************************************************/

//
//                  START SPECIMEN
//

app.get('/flies/addSpecimen',function(req,res,next){
    //console.log("in addSpecimen");

    // check if appID is valid first
    if (req.query.appID == CONSTANTS.appID) {

        mysql.pool.query("INSERT INTO specimen (`institution_code`, `collection_code`, `catalog_number`, `species_id`, `collecting_event_id`, `type_status`, `sex`, `image_name`) VALUES (?,?,?,?,?,?,?,?)", 
        [req.query.institution_code, req.query.collection_code, req.query.catalog_number, req.query.species_id, req.query.collecting_event_id, req.query.type_status, req.query.sex, req.query.image_name], function(err, result){
        if(err){
            next(err);
            return;
        }
        });
        res.redirect('back');
    }
    else {
        res.redirect('back');
        res.status(401);

    }
});

//
//                  END SPECIMEN
//

//
//                  START SPECIES
//

app.get('/flies/addSpecies',function(req,res,next){
    //console.log("in addSpecies");
    if (req.query.appID == CONSTANTS.appID) {

        mysql.pool.query("INSERT INTO species (`family`, `genus`, `specific_epithet`, `year`) VALUES (?,?,?,?)", 
        [req.query.family, req.query.genus, req.query.specific_epithet, req.query.year], function(err, result){
            if(err){
                next(err);
                return;
            }
        });
        res.redirect('back');

    }

    else {
        res.status(401);

    }
});

//
//                  END SPECIES
//

//
//                  START PEOPLE
//

app.get('/flies/addPerson',function(req,res,next){

    console.log(req.query.appID);

    if (req.query.appID == CONSTANTS.appID) {
        mysql.pool.query("INSERT INTO people (`first_name`, `last_name`) VALUES (?,?)", 
        [req.query.first_name, req.query.last_name], function(err, result){
            if(err){
                next(err);
                return;
            }
        });
        res.redirect('back');  
    }

    else {
        res.status(401);
    }

});

//
//                  END PEOPLE
//

//
//                  START LOCALITIES
//

app.get('/flies/addLocality',function(req,res,next){

    console.log(req.query.appID);

    if (req.query.appID == CONSTANTS.appID) {

        mysql.pool.query("INSERT INTO locality (`country`, `region`, `place`, `longitude`, `latitude`, `elevation`) VALUES (?,?,?,?,?,?)", 
        [req.query.country, req.query.region, req.query.place, req.query.longitude, req.query.latitude, req.query.elevation], function(err, result){
            if(err){
                next(err);
                return;
            }
        });
        res.redirect('back');

    }

    else {
        res.status(401);
        console.log("failed")
    }


});

//
//                  END LOCALITIES
//

//
//                  START COLLECTING EVENT
//

app.get('/flies/addCollectingEvent',function(req,res,next){

    if (req.query.appID == CONSTANTS.appID) {
        mysql.pool.query("INSERT INTO collecting_event (`locality_id`, `method`, `start_date`, `end_date`) VALUES (?,?,?,?)", 
        [req.query.locality_id, req.query.method, req.query.start_date, req.query.end_date], function(err, result){
            if(err){
                next(err);
                return;
            }
        });
        res.redirect('back');
    }

    else {
        res.status(401);
    }
});

//
//                  END COLLECTING EVENT
//

//
//                  START COLLECTOR
//

app.get('/flies/addCollector',function(req,res,next){
    console.log("in addCollector");

    if (req.query.appID == CONSTANTS.appID) {

        mysql.pool.query("INSERT INTO coll_event_people (`people_id`, `coll_event_id`) VALUES (?,?)", 
        [req.query.people_id, req.query.coll_event_id], function(err, result){
            if(err){
                next(err);
                return;
            }
        });
        res.redirect('back');

    }

    else {
        res.status(401);
    }
});


//
//                  END COLLECTOR
//

//
//                  START AUTHOR
//

app.get('/flies/addAuthor',function(req,res,next){
    console.log("yo addAuthor");
    mysql.pool.query("INSERT INTO species_people (`species_id`, `people_id`) VALUES (?,?)", 
    [req.query.species_id, req.query.people_id], function(err, result){
        if(err){
            next(err);
            return;
        }
    });
    res.redirect('back');
});

//
//                  END AUTHOR
//

//
//                  START ALCOHOL LOTS
//

app.get('/flies/addAlcoholLot',function(req,res,next){
    mysql.pool.query("INSERT INTO alcohol_lots (`collecting_event_id`, `empty`, `approx_number`, `sample_taxa`, `collector_code`) VALUES (?,?,?,?,?)", 
    [req.query.collecting_event_id, req.query.empty, req.query.approx_number, req.query.sample_taxa, req.query.collector_code], function(err, result){
        if(err){
            next(err);
            return;
        }
    });
    res.redirect('back');
});

//
//                  END ALCOHOL LOTS
//


/************************************************************************
  END: the INSERT queries 
 ***********************************************************************/



/***********************************************************************
  BEGIN: Delete routes
 **********************************************************************/
 
//
//                      START SPECIMEN
//

app.get('/flies/deleteSpecimenSubmit', function(request, response, next){

    if (request.query.appID == CONSTANTS.appID) {

        mysql.pool.query("DELETE FROM specimen WHERE id =?",
        [request.query.id],
        function(error, result){
            if (error) {
                next(error);
                return;
            }        

            let initialQuery = 'SELECT specimen.id, specimen.institution_code, specimen.collection_code, specimen.catalog_number, specimen.species_id, species.genus, '
            + 'species.specific_epithet, specimen.collecting_event_id, locality.country, locality.place, DATE_FORMAT(collecting_event.start_date, "%b %d %Y") AS start_date, DATE_FORMAT(collecting_event.end_date, "%b %d %Y") AS end_date, '
            + 'specimen.type_status, specimen.sex, specimen.image_name FROM specimen '
            + 'INNER JOIN collecting_event ON specimen.collecting_event_id = collecting_event.id '
            + 'INNER JOIN locality ON collecting_event.locality_id = locality.id '
            + 'INNER JOIN species ON specimen.species_id = species.id '
            + 'ORDER BY species.specific_epithet, specimen.catalog_number '
                mysql.pool.query(initialQuery, function(error, specimens, fields){
                if (error) {
                    next(error);
                    return;
                }
                response.render('modSpecimen', {
                        title: 'Modify Specimens in the Database',
                    specimens: specimens
                });
            });
        });
    }

});

 
//
//                      END SPECIMEN
//

//
//                      START SPECIES
//

app.get('/flies/deleteSpeciesSubmit', function(request, response, next){

    if (request.query.appID == CONSTANTS.appID) {

    

        mysql.pool.query("DELETE FROM species WHERE id =?",
        [request.query.id],
        function(error, result){
            if (error) {
                next(error);
                return;
            }                
            
            let initialQuery = 'SELECT id, family, genus, specific_epithet, year FROM species'; 
            mysql.pool.query(initialQuery, function(error, species, fields){
                if (error) {
                    next(error);
                    return;
                }

                response.render('modSpecies', {
                    title: 'Modify Species in the Database',
                    species: species
                });
            });
        });

    }

});

//
//                      END SPECIES
//

//
//                      START PEOPLE
//

app.get('/flies/deletePeopleSubmit', function(request, response, next){

    if (request.query.appID == CONSTANTS.appID) {

        mysql.pool.query("DELETE FROM people WHERE id =?",
        [request.query.id],
        function(error, result){
            if (error) {
                next(error);
                return;
            }  
            
            
            let initialQuery = 'SELECT people.id, people.first_name, people.last_name FROM people'; 
            mysql.pool.query(initialQuery, function(error, people, fields){
                if (error) {
                    next(error);
                    return;
                }

                response.render('modPeople', {
                    title: 'Modify People in the Database',
                    people: people
                });
            });
        });

    }  

    else {
        response.status(401);
    }
    //response.redirect('back');

});

//
//                      END PEOPLE
//

//
//                      START LOCALITIES
//

app.get('/flies/deleteLocalitySubmit', function(request, response, next){

    mysql.pool.query("DELETE FROM locality WHERE id =?",
    [request.query.id],
    function(error, result){
        if (error) {
            next(error);
            return;
        }              
        
        let initialQuery = 'SELECT id, country, region, place, longitude, latitude, elevation FROM locality';

        mysql.pool.query(initialQuery, function(error, locality, fields){
            if (error) {
                next(error);
                return;
            }
            response.render('modLocality', {
                title: 'Modify Localities in the Database',
                locality: locality
            });
        });
    });

});

//
//                      END LOCALITIES
//

// 
//                      START COLLECTING EVENT
//

 app.get('/flies/deleteCollectingEventSubmit', function(request, response, next){

    if (request.query.appID == CONSTANTS.appID) {

        mysql.pool.query("DELETE FROM collecting_event WHERE id =?",
        [request.query.id],
        function(error, result){
            if (error) {
                next(error);
                return;
            }               
            
            let initialQuery = 'SELECT collecting_event.id, DATE_FORMAT(collecting_event.start_date, "%b %d %Y") AS start_date, DATE_FORMAT(collecting_event.end_date, "%b %d %Y") AS end_date, collecting_event.method, '
            + 'locality.country, locality.region, locality.place FROM collecting_event '
            + 'INNER JOIN locality ON collecting_event.locality_id = locality.id '
            + 'ORDER BY collecting_event.id ASC';

            mysql.pool.query(initialQuery, function(error, event, fields){
                    if (error) {
                        next(error);
                        return;
                    }
                response.render('modCollectingEvent', {
                    title: 'Modify Collecting Events in the Database',
                    event: event
                });
            });
        });
    }

});

// 
//                      END COLLECTING EVENT
//

//
//                      START COLLECTOR
//

app.get('/flies/deleteCollectorSubmit', function(request, response, next){

    mysql.pool.query("DELETE FROM coll_event_people WHERE coll_event_id =? AND people_id =?",
    [request.query.coll_event_id, request.query.people_id],
    function(error, result){
        if (error) {
            next(error);
            return;
        }               
        
        let initialQuery = 'SELECT people.first_name, people.last_name, DATE_FORMAT(collecting_event.start_date, "%b %d %Y") AS start_date, DATE_FORMAT(collecting_event.end_date, "%b %d %Y") AS end_date, '
        + 'collecting_event.method, locality.country, locality.region, locality.place, coll_event_people.coll_event_id, '
        + 'coll_event_people.people_id FROM people '
        + 'INNER JOIN coll_event_people ON people.id = coll_event_people.people_id '
        + 'INNER JOIN collecting_event ON coll_event_people.coll_event_id = collecting_event.id '
        + 'INNER JOIN locality ON collecting_event.locality_id = locality.id '
        + 'ORDER BY people.last_name';

        mysql.pool.query(initialQuery, function(error, people, fields){
            if (error) {
                next(error);
                return;
            }

            response.render('modCollector', {
                title: 'Modify Collectors in the Database',
                people: people
            });
        });
    });
    
});

//
//                      END COLLECTOR
//

//
//                  START AUTHOR
//

app.get('/flies/deleteAuthorSubmit', function(request, response, next){

    mysql.pool.query("DELETE FROM species_people WHERE species_id =? AND people_id =?",
    [request.query.species_id, request.query.people_id],
    function(error, result){
        if (error) {
            next(error);
            return;
        }               
        
        let initialQuery = 'SELECT people.first_name, people.last_name, '
        + 'species.family, species.genus, species.specific_epithet, species.year, species_people.people_id, species_people.species_id FROM people '
        + 'INNER JOIN species_people ON people.id = species_people.people_id '
        + 'INNER JOIN species ON species_people.species_id = species.id '
        + 'ORDER BY species.specific_epithet';

        mysql.pool.query(initialQuery, function(error, people, fields){
            if (error) {
                next(error);
                return;
            }

            response.render('modAuthor', {
                title: 'Modify Authors in the Database',
                people: people
            });
        });
    });
    
});

//
//                  END AUTHOR
//

/***********************************************************************
  END: Delete routes
 **********************************************************************/
 

/***********************************************************************
  BEGIN: Routes for Dropdown menus
 **********************************************************************/

/** ROUTES FOR DROPDOWNS
**/
// GET route for SPECIES ID DROPDOWN
app.get('/flies/speciesDropdown', function(request, response, next){

    let context = {};

    let initialQuery = 'SELECT species.id, species.genus, species.specific_epithet FROM species GROUP BY genus, specific_epithet ASC';

    mysql.pool.query(initialQuery, function(error, speciesDropdown, fields){
        if (error) {
            next(error);
            return;
        }
        
        let data = [];
        for (let x in speciesDropdown){
            let speciesData = {'id': speciesDropdown[x].id, 'genus': speciesDropdown[x].genus, 'specific_epithet': speciesDropdown[x].specific_epithet};
            data.push(speciesData);
        }
        context.items = JSON.stringify(data);
        response.send(context.items);

    });
});

// GET route for COLLECTING EVENT ID DROPDOWN
app.get('/flies/collEventDropdown', function(request, response, next){

    let context = {};

    let initialQuery = 'SELECT collecting_event.id, DATE_FORMAT(collecting_event.start_date, "%b %d %Y") AS start_date, DATE_FORMAT(collecting_event.end_date, "%b %d %Y") AS end_date, locality.country, locality.place, collecting_event.method FROM collecting_event INNER JOIN locality ON collecting_event.locality_id = locality.id GROUP BY country, place, start_date ASC';

    mysql.pool.query(initialQuery, function(error, collEventDropdown, fields){
        if (error) {
            next(error);
            return;
        }
        
        let data = [];
        for (let x in collEventDropdown){
            let collectionData = {'id': collEventDropdown[x].id, 'start_date': collEventDropdown[x].start_date, 'end_date': collEventDropdown[x].end_date, 'country': collEventDropdown[x].country, 'place': collEventDropdown[x].place, 'method': collEventDropdown[x].method};
            data.push(collectionData);
        }
        context.items = JSON.stringify(data);
        response.send(context.items);

    });
});

// GET route for PEOPLE ID DROPDOWN
app.get('/flies/personDropdown', function(request, response, next){

    let context = {};

    let initialQuery = 'SELECT id, first_name, last_name FROM people GROUP BY last_name, first_name ASC';

    mysql.pool.query(initialQuery, function(error, personDropdown, fields){
        if (error) {
            next(error);
            return;
        }
        
        let data = [];
        for (let x in personDropdown){
            let personData = {'id': personDropdown[x].id, 'first_name': personDropdown[x].first_name, 'last_name': personDropdown[x].last_name};
            data.push(personData);
        }
        context.items = JSON.stringify(data);
        response.send(context.items);

    });
});

// GET route for LOCALITY ID DROPDOWN
app.get('/flies/localityDropdown', function(request, response, next){

    let context = {};

    let initialQuery = 'SELECT id, place, region, country FROM locality GROUP BY country, region, place ASC';

    mysql.pool.query(initialQuery, function(error, localityDropdown, fields){
        if (error) {
            next(error);
            return;
        }
        
        let data = [];
        for (let x in localityDropdown){
            let localityData = {'id': localityDropdown[x].id, 'region': localityDropdown[x].region, 'place': localityDropdown[x].place, 'country': localityDropdown[x].country};
            data.push(localityData);
        }
        context.items = JSON.stringify(data);
        response.send(context.items);

    });
});

/***********************************************************************
  END: Routes for Dropdown menus
 **********************************************************************/


//app.listen();


// remove for production
const port = 8080;
app.listen(port, () => {
   console.log('Express started on ' + port + '; press Ctrl-C to terminate.');
});

// APP USE 404 or 500 error

//app.use('/', function(req,res,next){
//    res.render('modSpecimen');
//});

// app.use(function(req,res){
//     res.status(404);
//     res.render('404');
// });
  
// app.use(function(err, req, res, next){
//     console.error(err.stack);
//     res.status(500);
//     res.render('500');
// });


//server.listen();

