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
     * @query-params {string} genus
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
    },
    /**
     * Function getAllSpeciesInformation returns all the species information for a species id
     * @query-params {string} id
     * @returns {object}      
     */
    getAllSpeciesInformation : getAllSpeciesInformation = (req) =>
    {
        let speciesQuery = `
            SELECT 
                people.first_name, 
                people.last_name, 
                species.id, 
                species.genus, 
                species.specific_epithet, 
                species.year, 
                species.diagnosis, 
                species.habitus_image 
            FROM 
                people 
            INNER JOIN 
                species_people ON species_people.people_id = people.id 
            INNER JOIN 
                species ON species.id = species_people.species_id 
            WHERE 
                species.id = ?
            `;

        return new Promise((resolve, reject) => {
            mysql.pool.query(speciesQuery, [req.query.id], (error, element) => {
                if(error) {
                    return reject(error);
                }
                return resolve(element);
            }); 
        });
    }
};