const mysql = require('../dbcon.js');

module.exports = 
{
    getAuthorSpecies : getAuthorSpecies = (req) =>
    {
        console.log(req.params.sid);
        console.log(req.params.pid);
        let authorQuery = `
        SELECT
            people.first_name, 
            people.last_name,
            species.family, 
            species.genus, 
            species.specific_epithet, 
            species.year, 
            species_people.people_id, 
            species_people.species_id 
        FROM 
            people
        INNER JOIN
            species_people ON people.id = species_people.people_id
        INNER JOIN
            species ON species_people.species_id = species.id
        WHERE 
            species_people.species_id =? AND species_people.people_id =?
        ORDER BY 
            species.specific_epithet LIMIT 1
        `;

        let params = [
            req.params.sid,
            req.params.pid
        ]

        return new Promise((resolve, reject) => {
            mysql.pool.query(authorQuery, params, (error, elements) => {
                if(error) {
                    return reject(error);
                }
                return resolve(elements);
            }); 
        });

    },
    getAllAuthors : getAllAuthors = (req) =>
    {
        let authorQuery = `
            SELECT 
                people.first_name, 
                people.last_name,
                species.family, 
                species.genus, 
                species.specific_epithet, 
                species.year, 
                species_people.people_id, 
                species_people.species_id 
            FROM 
                people
            INNER JOIN 
                species_people ON people.id = species_people.people_id
            INNER JOIN 
                species ON species_people.species_id = species.id
            ORDER BY 
                species.specific_epithet
        `;

        return new Promise((resolve, reject) => {
            mysql.pool.query(authorQuery, (error, elements) => {
                if(error) {
                    return reject(error);
                }
                return resolve(elements);
            }); 
        });

    }
};

