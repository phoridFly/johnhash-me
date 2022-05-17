const router = require('express').Router({ mergeParams: true });

const
{
    getAllPeople,
    getPersonById,
    updatePerson
} = require('../db_functions/functions_people');

router.get('/', async (req, res, next) => {

    const out = {};
    //console.log(req.query);
    if (req.params.id) { out.person = await getPersonById(req); } 
    else { out.people = await getAllPeople(req); } 

    res.send(out);
    
});

router.put('/', async (req, res, next) => {

    await updatePerson(req);

    res.sendStatus(200);
    
});

module.exports = router;