const router = require('express').Router();

const 
{
    getAllLocalities,
    updateLocality
} = require('../db_functions/functions_localities');

router.get('/', async (req, res, next) => {

    const out = {};
    //console.log(req.query);
    //if (req.query.id) { out.specimenDetails = await getSpecimenById(req); } 
    //else { out.specimens = await getAllSpecimens(req); } 
    out.localities = await getAllLocalities(req);
    res.send(out);
    
});

router.put('/', async (req, res, next) => {


    await updateLocality(req);

    res.sendStatus(200);
    
});

module.exports = router;