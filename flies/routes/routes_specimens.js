const router = require('express').Router();

const 
{
    getAllSpecimens,
    getSpecimenById
} = require('../db_functions/functions_specimens');

router.get('/', async (req, res, next) => {

    const out = {};
    //console.log(req.query);
    if (req.query.id) { out.specimenDetails = await getSpecimenById(req); } 
    else { out.specimens = await getAllSpecimens(req); } 

    res.send(out);
    
});

router.put('/', async (req, res, next) => {

    console.log("HERE");
    console.log(req);
    console.log(req.query);
    console.log(req.body);

    await updateSpecimen(req);

    //res.send(out);
    
});

module.exports = router;