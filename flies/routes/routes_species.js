const router = require('express').Router();

const 
{
    getAllSpeciesByGenus,
    getAllSpeciesInformation,
} = require('../db_functions/functions_species');

router.get('/', async (req, res, next) => {

    const out = {};
    console.log(req.query);
    if (req.query.genus) { out.species = await getAllSpeciesByGenus(req); } 
    if (req.query.id) { out.speciesDetails = await getAllSpeciesInformation(req); } 

    res.send(out);
    
});

module.exports = router;