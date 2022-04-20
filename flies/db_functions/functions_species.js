/*
* functions_species.js
* 
* This file contains all the routes for interacting with the species.
*
*
*
*
*/

const mysql = require('../dbcon.js');

module.exports = 
{
    /**
     * Function getAllSpeciesByGenus returns all the species information in the database
     * @query-params {string}      genus
     * @returns [array]       Array of species objects
     */
    getAllSpeciesByGenus : getAllSpeciesByGenus = (req) =>
    {
        let speciesQuery = `
            SELECT 
                species.id, 
                species.genus, 
                species.specific_epithet, 
                species.habitus_image 
            FROM 
                species 
            WHERE 
                species.genus =? AND species.specific_epithet <> "Unidentified" 
            GROUP BY 
                genus, specific_epithet ASC
            `;

        return new Promise((resolve, reject) => {
            mysql.pool.query(speciesQuery, [req.query.genus], (error, elements) => {
                if(error) {
                    return reject(error);
                }
                return resolve(elements);
            }); 
        });
    }
};