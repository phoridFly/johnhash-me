const router = require('express').Router();

const
{
    getAllPeople,
    getPersonById
} = require('../db_functions/functions_people');

router.get('/', async (req, res, next) => {

    const out = {};
    //console.log(req.query);
    if (req.query.id) { out.peopleDetails = await getPersonById(req); } 
    else { out.people = await getAllPeople(req); } 

    res.send(out);
    
});

module.exports = router;