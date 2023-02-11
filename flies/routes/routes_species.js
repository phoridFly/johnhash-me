const router = require('express').Router({ mergeParams: true });

const 
{
    getAllSpecies,
    updateSpecies,
    getAllSpeciesByGenus,
    getAllSpeciesInformation,
    getSpeciesDistinctOccurance,
    createSpecies
} = require('../db_functions/functions_species');

router.get('/', async (req, res, next) => {

    let data = {};
    
    if (req.query.genus) {
         data.species = await getAllSpeciesByGenus(req); 
    } 
    else if (req.params.id) { 
        let response = await getAllSpeciesInformation(req); 
        //consolidate data from mulitple authors
        let species = {};
        species.id               = response[0].id;
        species.genus            = response[0].genus;
        species.specific_epithet = response[0].specific_epithet;
        species.year             = response[0].year;
        species.diagnosis        = response[0].diagnosis;
        species.authors          = []
        response.forEach(element => {
            let author = {
                first_name : '',
                last_name : '',
            }
            author.first_name = element.first_name;
            author.last_name = element.last_name
            species.authors.push(author)
        });
        data.species = species;
    } 
    else { 
        data.species = await getAllSpecies(req); 
    } 

    res.send(data);
    
});

router.get('/distinct-occurrence-records', async (req, res, next) => {
    const data = {};
    data.localties = await getSpeciesDistinctOccurance(req);
    //console.log(req.query);
    res.send(data);
    
});

router.put('/', async (req, res, next) => {

    await updateSpecies(req);

    res.sendStatus(200);
    
});

router.post('/', async (req, res, next) => {

    await createSpecies(req);

    res.sendStatus(200);
    
});

module.exports = router;