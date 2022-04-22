/*
* functions_specimens.js
* 
* This file contains all the routes for interacting with the specimens.
*
*
*
*
*/

const mysql = require('../dbcon.js');

module.exports = 
{
    /**
     * Function getAllSpecimens returns all the specimen information in the database
     * @returns [array]       Array of specimen objects
     */
    getSpecimenById : getSpecimenById = (req) =>
    {
        let specimenQuery = `
        SELECT 
            specimen.id,
            specimen.institution_code,
            specimen.collection_code,
            specimen.catalog_number,
            specimen.species_id,
            species.genus,
            species.specific_epithet,
            specimen.collecting_event_id,
            locality.country,
            locality.place,
            DATE_FORMAT(collecting_event.start_date, "%b %d %Y") AS start_date,
            DATE_FORMAT(collecting_event.end_date, "%b %d %Y") AS end_date,
            collecting_event.method,
            specimen.type_status,
            specimen.sex,
            specimen.image_name 
        FROM 
            specimen
        INNER JOIN 
            collecting_event ON specimen.collecting_event_id = collecting_event.id
        INNER JOIN 
            locality ON collecting_event.locality_id = locality.id
        INNER JOIN 
            species ON specimen.species_id = species.id
        WHERE
            specimen.id = ?
        `;

        return new Promise((resolve, reject) => {
            mysql.pool.query(specimenQuery, [req.query.id], (error, elements) => {
                if(error) {
                    return reject(error);
                }
                return resolve(elements);
            }); 
        });
    },
        /**
     * Function getAllSpecimens returns all the specimen information in the database
     * @returns [array]       Array of specimen objects
     */
    // TODO Paginate this. It could get HUUUUUGE 
    getAllSpecimens : getAllSpecimens = (req) =>
    {
        let specimentQuery = `
        SELECT 
            specimen.id,
            specimen.institution_code,
            specimen.collection_code,
            specimen.catalog_number,
            specimen.species_id,
            species.genus,
            species.specific_epithet,
            specimen.collecting_event_id,
            locality.country,
            locality.place,
            DATE_FORMAT(collecting_event.start_date, "%b %d %Y") AS start_date,
            DATE_FORMAT(collecting_event.end_date, "%b %d %Y") AS end_date,
            collecting_event.method,
            specimen.type_status,
            specimen.sex,
            specimen.image_name 
        FROM 
            specimen
        INNER JOIN 
            collecting_event ON specimen.collecting_event_id = collecting_event.id
        INNER JOIN 
            locality ON collecting_event.locality_id = locality.id
        INNER JOIN 
            species ON specimen.species_id = species.id
        ORDER BY 
            species.specific_epithet, specimen.catalog_number
        `;

        return new Promise((resolve, reject) => {
            mysql.pool.query(specimentQuery, (error, elements) => {
                if(error) {
                    return reject(error);
                }
                return resolve(elements);
            }); 
        });
    }
};