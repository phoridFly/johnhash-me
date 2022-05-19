const router = require('express').Router({ mergeParams: true });

const
{
    getAuthorSpecies,
    getAllAuthors
} = require('../db_functions/functions_authors');

router.get('/', async (req, res, next) => {

    const out = {};

    console.log(req);

    //console.log(req.query);
    if (req.params.pid && req.params.sid) { out.author = await getAuthorSpecies(req); } 
    else { out.authors = await getAllAuthors(req);  }

    res.send(out);
    
});

// router.put('/', async (req, res, next) => {

//     await updatePerson(req);

//     res.sendStatus(200);
    
// });

module.exports = router;