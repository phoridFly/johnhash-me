const mysql = require('../dbcon.js');

module.exports = 
{
    getAllAlcoholLots : getAllAlcoholLots = (req) =>
    {

        let lotQuery = `
            SELECT 
                alcohol_lots.id, 
                collecting_event.id AS cei, 
                locality.country, 
                locality.region, 
                alcohol_lots.empty, 
                alcohol_lots.approx_number, 
                alcohol_lots.sample_taxa, 
                alcohol_lots.collector_code 
            FROM 
                locality
            INNER JOIN 
                collecting_event ON locality.id = collecting_event.locality_id
            INNER JOIN 
                alcohol_lots ON collecting_event.id = alcohol_lots.collecting_event_id
            ORDER BY 
                alcohol_lots.id ASC
        `;

        return new Promise((resolve, reject) => {
            mysql.pool.query(lotQuery, (error, elements) => {
                if(error) {
                    return reject(error);
                }
                return resolve(elements);
            }); 
        });

    },
    getAlcoholLotsByID : getAlcoholLotsByID = (req) =>
    {

        let lotQuery = `
            SELECT 
                alcohol_lots.id, 
                collecting_event.id AS cei, 
                locality.country, 
                locality.region, 
                alcohol_lots.empty, 
                alcohol_lots.approx_number, 
                alcohol_lots.sample_taxa, 
                alcohol_lots.collector_code 
            FROM 
                locality
            INNER JOIN 
                collecting_event ON locality.id = collecting_event.locality_id
            INNER JOIN 
                alcohol_lots ON collecting_event.id = alcohol_lots.collecting_event_id
            WHERE 
                alcohol_lots.id = ?
        `;

        return new Promise((resolve, reject) => {
            mysql.pool.query(lotQuery, [req.params.id], (error, elements) => {
                if(error) {
                    return reject(error);
                }
                return resolve(elements);
            }); 
        });

    },
    /* Function updatePerson
    * @param {string} id
    * @returns nothing
    */
//     updateAlcoholLot : updateAlcoholLot = (req) =>
//    {
//        let updateQuery = `
//        UPDATE
//            people
//        SET
//            first_name =?,
//            last_name =?
//        WHERE
//            id =?
//        `;

//        let params = [
//            req.body.first_name, 
//            req.body.last_name, 
//            req.query.id
//        ];

//        return new Promise((resolve, reject) => {
//            mysql.pool.query(updateQuery, params, (error, elements) => {
//                if(error) {
//                    return reject(error);
//                }
//                return resolve(elements);
//            }); 
//        });
//    }
}