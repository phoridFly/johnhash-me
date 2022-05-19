const router = require('express').Router({ mergeParams: true });

const
{
    getAllCollectors,
    getCollectorandEvent,
    updateCollectorAndEvent
} = require('../db_functions/functions_collectors');

router.get('/', async (req, res, next) => {

    const out = {};

    console.log(req.params);

    //console.log(req.query);
    if (req.params.cid && req.params.pid) { out.collector = await getCollectorandEvent(req); } 
    else {out.collectors = await getAllCollectors(req);  }

    res.send(out);
    
});

router.put('/', async (req, res, next) => {

    await updateCollectorAndEvent(req);

    res.sendStatus(200);
    
});

module.exports = router;