const router = require('express').Router({ mergeParams: true });

const 
{
    getAllSpecimens,
    getSpecimenById,
    createSpecimen
} = require('../db_functions/functions_specimens');

router.get('/', async (req, res, next) => {

    const data = {};
    //console.log(req.query);
    if (req.params.id) { data.specimen = await getSpecimenById(req); } 
    else { data.specimens = await getAllSpecimens(req); } 

    res.send(data);
    
});

router.put('/', async (req, res, next) => {


    await updateSpecimen(req);

    res.sendStatus(200);
    
});

router.post('/', async (req, res, next) => {

    console.log('post specimen');
    await createSpecimen(req);

    res.sendStatus(200);
    
});

module.exports = router;