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

    const out = {};
    // console.log(req.query);
    if (req.query.genus) { out.species = await getAllSpeciesByGenus(req); } 
    else if (req.params.id) { out.speciesDetails = await getAllSpeciesInformation(req); } 
    else { out.species = await getAllSpecies(req); } 


    res.send(out);
    
});

router.get('/distinct-occurrence-records', async (req, res, next) => {
    const out = {};
    out.localties = await getSpeciesDistinctOccurance(req);
    //console.log(req.query);
    res.send(out);
    
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