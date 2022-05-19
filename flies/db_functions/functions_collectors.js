const mysql = require('../dbcon.js');

module.exports = 
{
    getAllCollectors : getAllCollectors = (req) =>
    {

        let collectorQuery = `
            SELECT 
                people.first_name, 
                people.last_name, 
                DATE_FORMAT(collecting_event.start_date, "%b %d %Y") AS start_date, 
                DATE_FORMAT(collecting_event.end_date, "%b %d %Y") AS end_date,
                collecting_event.method,
                locality.country,
                locality.region,
                locality.place,
                coll_event_people.coll_event_id,
                coll_event_people.people_id FROM people
            INNER JOIN 
                coll_event_people ON people.id = coll_event_people.people_id
            INNER JOIN 
                collecting_event ON coll_event_people.coll_event_id = collecting_event.id
            INNER JOIN 
                locality ON collecting_event.locality_id = locality.id
            ORDER BY 
                people.last_name
        `;

        return new Promise((resolve, reject) => {
            mysql.pool.query(collectorQuery, (error, elements) => {
                if(error) {
                    return reject(error);
                }
                return resolve(elements);
            }); 
        });

    },
    getCollectorandEvent : getCollectorandEvent = (req) =>
    {

        let collectorQuery = `
            SELECT 
                people.first_name, 
                people.last_name, 
                DATE_FORMAT(collecting_event.start_date, "%b %d %Y") AS start_date, 
                DATE_FORMAT(collecting_event.end_date, "%b %d %Y") AS end_date, 
                collecting_event.method, 
                locality.country, 
                locality.region, 
                locality.place, 
                coll_event_people.coll_event_id,
                coll_event_people.people_id 
            FROM 
                people
            INNER JOIN
                coll_event_people ON people.id = coll_event_people.people_id
            INNER JOIN 
                collecting_event ON coll_event_people.coll_event_id = collecting_event.id
            INNER JOIN 
                locality ON collecting_event.locality_id = locality.id
            WHERE 
                coll_event_people.coll_event_id =? AND coll_event_people.people_id=? 
            ORDER BY 
                people.last_name LIMIT 1
        `;

        let params = [
            req.params.cid,
            req.params.pid
        ]

        return new Promise((resolve, reject) => {
            mysql.pool.query(collectorQuery, params, (error, elements) => {
                if(error) {
                    return reject(error);
                }
                return resolve(elements);
            }); 
        });

    },
    /* Function updateCollector
    * @param {string} id
    * @returns nothing
    */
    // updateCollectorAndEvent : updateCollectorAndEvent = (req) =>
    // {
    //     let updateQuery = `
    //         UPDATE 
    //             coll_event_people 
    //         SET  
    //             coll_event_id =?,
    //             people_id =?
    //         WHERE 
    //             coll_event_people.people_id=? 
    //         AND 
    //             coll_event_people.coll_event_id =?
    //     `;

    //     let params = [
            
    //         req.body.coll_event_id, 
    //         req.body.people_id,
    //         req.params.cid, 
    //         req.params.pid,  
    //     ];

    //     return new Promise((resolve, reject) => {
    //         mysql.pool.query(updateQuery, params, (error, elements) => {
    //             if(error) {
    //                 return reject(error);
    //             }
    //             return resolve(elements);
    //         }); 
    //     });
    // }

}