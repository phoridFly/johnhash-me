const router = require('express').Router({ mergeParams: true });

const
{
    getAuthorSpecies,
    getAllAuthors,
    updateAuthorSpecies
} = require('../db_functions/functions_authors');

router.get('/', async (req, res, next) => {

    const data = {};

    console.log(req);

    //console.log(req.query);
    if (req.params.pid && req.params.sid) { data.author = await getAuthorSpecies(req); } 
    else { data.authors = await getAllAuthors(req);  }

    res.send(data);
    
});

router.put('/', async (req, res, next) => {

    await updateAuthorSpecies(req);

    res.sendStatus(200);
    
});

module.exports = router;