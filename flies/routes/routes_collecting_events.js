const router = require('express').Router({ mergeParams: true });

const
{
    getAllCollectingEvents,
    getCollectingEventById,
    updateCollectingEvent,
} = require('../db_functions/functions_collecting_events');

router.get('/', async (req, res, next) => {

    const out = {};
    if (req.params.id) { out.collectingEvent = await getCollectingEventById(req); } 
    else { out.collectingEvents = await getAllCollectingEvents(req); } 

    res.send(out);
    
});

router.put('/', async (req, res, next) => {

    await updateCollectingEvent(req);

    res.sendStatus(200);
    
});

module.exports = router;