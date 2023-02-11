const router = require('express').Router();

const 
{
    getAllLocalities,
    getLocalityById,
    updateLocality,
    createLocality,
} = require('../db_functions/functions_localities');

router.get('/', async (req, res, next) => {

    const data = {};
    //console.log(req.query);
    if (req.query.id) { 
        data.locality = await getLocalityById(req); 
    } 
    else { 
        data.localities = await getAllLocalities(req); 
    } 
    res.send(data);
    
});

router.put('/', async (req, res, next) => {

    await updateLocality(req);

    res.sendStatus(200);
    
});

router.post('/', async (req, res, next) => {

    await createLocality(req);

    res.sendStatus(200);
    
});

module.exports = router;