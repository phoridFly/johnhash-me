const router = require('express').Router({ mergeParams: true });

const
{
    getAllCollectors,
    getCollectorandEvent,
    updateCollectorAndEvent
} = require('../db_functions/functions_collectors');

router.get('/', async (req, res, next) => {

    const data = {};

    console.log(req.params);

    //console.log(req.query);
    if (req.params.cid && req.params.pid) { data.collector = await getCollectorandEvent(req); } 
    else {data.collectors = await getAllCollectors(req);  }

    res.send(data);
    
});

router.put('/', async (req, res, next) => {

    await updateCollectorAndEvent(req);

    res.sendStatus(200);
    
});

module.exports = router;