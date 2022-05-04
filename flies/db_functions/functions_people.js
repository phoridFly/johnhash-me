const mysql = require('../dbcon.js');

module.exports = 
{
    getAllPeople : getAllPeople = (req) =>
    {

        let personQuery = `
            SELECT 
                people.id, 
                people.first_name, 
                people.last_name 
            FROM 
                people
        `;

        return new Promise((resolve, reject) => {
            mysql.pool.query(personQuery, (error, elements) => {
                if(error) {
                    return reject(error);
                }
                return resolve(elements);
            }); 
        });

    },
    getPersonById : getPersonById = (req) =>
    {

        let personQuery = `
            SELECT 
                people.id, 
                people.first_name, 
                people.last_name 
            FROM 
                people
            WHERE 
                people.id = ?
        `;

        return new Promise((resolve, reject) => {
            mysql.pool.query(personQuery, [req.query.id], (error, elements) => {
                if(error) {
                    return reject(error);
                }
                return resolve(elements);
            }); 
        });

    },
}