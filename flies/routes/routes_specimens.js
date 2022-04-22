const router = require('express').Router();

const 
{
    getAllSpecimens,
} = require('../db_functions/functions_specimens');

router.get('/', async (req, res, next) => {

    const out = await getAllSpecimens(req); 
    
    res.send(out);
    
});

module.exports = router;