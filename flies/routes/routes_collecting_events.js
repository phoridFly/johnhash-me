const router = require('express').Router({ mergeParams: true });

const
{
    getAllCollectingEvents,
    getCollectingEventById,
    updateCollectingEvent,
    createCollectingEvent,
} = require('../db_functions/functions_collecting_events');

router.get('/', async (req, res, next) => {

    const data = {};
    if (req.params.id) { 
        data.collectingEvent = await getCollectingEventById(req); 
    } 
    else { 
        data.collectingEvents = await getAllCollectingEvents(req); 
    } 

    res.send(data);
    
});

router.put('/', async (req, res, next) => {

    await updateCollectingEvent(req);

    res.sendStatus(200);
    
});

router.post('/', async (req, res, next) => {

    await createCollectingEvent(req);

    res.sendStatus(200);
    
});

module.exports = router;