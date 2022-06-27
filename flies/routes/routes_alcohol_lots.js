const router = require('express').Router({ mergeParams: true });

const
{
    getAllAlcoholLots,
    getAlcoholLotsByID,
    // updateAlcoholLot,
} = require('../db_functions/functions_alcohol_lots');

router.get('/', async (req, res, next) => {

    const out = {};

    console.log(req);

    //console.log(req.query);
    if (req.params.id) { out.lot = await getAlcoholLotsByID(req); } 
    else { out.lot = await getAllAlcoholLots(req);  }

    res.send(out);
    
});

// router.put('/', async (req, res, next) => {

//     await updateAlcoholLot(req);

//     res.sendStatus(200);
    
// });

module.exports = router;