const mysql = require('../dbcon.js');

module.exports = 
{
    getAllCollectingEvents : getAllCollectingEvents = (req) =>
    {

        let collectingEventQuery = `
            SELECT 
                collecting_event.id, 
                DATE_FORMAT(collecting_event.start_date, "%b %d %Y") AS start_date, 
                DATE_FORMAT(collecting_event.end_date, "%b %d %Y") AS end_date, 
                collecting_event.method,
                locality.country, 
                locality.region, 
                locality.place 
            FROM
                collecting_event
            INNER JOIN 
                locality ON collecting_event.locality_id = locality.id
            ORDER BY 
                collecting_event.id ASC
        `;

        return new Promise((resolve, reject) => {
            mysql.pool.query(collectingEventQuery, (error, elements) => {
                if(error) {
                    return reject(error);
                }
                return resolve(elements);
            }); 
        });
    },
    getCollectingEventById : getCollectingEventById = (req) =>
    {

        let collectingEventQuery = `
            SELECT 
                collecting_event.id, 
                DATE_FORMAT(collecting_event.start_date, "%b %d %Y") AS start_date, 
                DATE_FORMAT(collecting_event.end_date, "%b %d %Y") AS end_date, 
                collecting_event.method,
                locality.country, 
                locality.region, 
                locality.place 
            FROM
                collecting_event
            INNER JOIN 
                locality ON collecting_event.locality_id = locality.id
            WHERE 
                collecting_event.id=?
        `;

        return new Promise((resolve, reject) => {
            mysql.pool.query(collectingEventQuery, req.params.id, (error, elements) => {
                if(error) {
                    return reject(error);
                }
                return resolve(elements);
            }); 
        });
    },
}