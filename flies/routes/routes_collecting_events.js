const router = require('express').Router();

const
{
    getAllCollectingEvents
} = require('../db_functions/functions_collecting_events');

router.get('/', async (req, res, next) => {

    const out = {};
    //console.log(req.query);
    // if (req.query.id) { out.person = await getPersonById(req); } 
    // else { out.people = await getAllPeople(req); } 
    out.collectingEvents = await getAllCollectingEvents(req);

    res.send(out);
    
});

module.exports = router;