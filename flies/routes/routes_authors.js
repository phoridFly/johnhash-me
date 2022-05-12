const router = require('express').Router({ mergeParams: true });

const
{
    getAuthorSpecies,
} = require('../db_functions/functions_authors');

router.get('/', async (req, res, next) => {

    const out = {};

    console.log(req);

    //console.log(req.query);
    // if (req.query.id) { out.person = await getPersonById(req); } 
    out.authors = await getAuthorSpecies(req);  

    res.send(out);
    
});

// router.put('/', async (req, res, next) => {

//     await updatePerson(req);

//     res.sendStatus(200);
    
// });

module.exports = router;