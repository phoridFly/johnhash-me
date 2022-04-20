const router = require('express').Router();

const 
{
    getAllSpeciesByGenus,
    getAllSpeciesInformation,
    getSpeciesDistinctOccurance,
} = require('../db_functions/functions_species');

router.get('/', async (req, res, next) => {

    const out = {};
    //console.log(req.query);
    if (req.query.genus) { out.species = await getAllSpeciesByGenus(req); } 
    if (req.query.id) { out.speciesDetails = await getAllSpeciesInformation(req); } 

    res.send(out);
    
});

router.get('/distinct-occurrence-records', async (req, res, next) => {

    const out = await getSpeciesDistinctOccurance(req);
    //console.log(req.query);
    res.send(out);
    
});


module.exports = router;