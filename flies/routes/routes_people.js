const router = require('express').Router({ mergeParams: true });

const
{
    getAllPeople,
    getPersonById,
    updatePerson
} = require('../db_functions/functions_people');

router.get('/', async (req, res, next) => {

    const data = {};
    //console.log(req.query);
    if (req.params.id) { data.person = await getPersonById(req); } 
    else { data.people = await getAllPeople(req); } 

    res.send(data);
    
});

router.put('/', async (req, res, next) => {

    await updatePerson(req);

    res.sendStatus(200);
    
});

router.post('/', async (req, res, next) => {

    await createPerson(req);

    res.sendStatus(200);
    
});

module.exports = router;