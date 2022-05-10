const mysql = require('../dbcon.js');

module.exports = 
{
    getAllLocalities : getAllLocalities = (req) =>
    {

        let localityQuery = `
            SELECT 
                id, 
                country, 
                region, 
                place, 
                longitude, 
                latitude, 
                elevation 
            FROM 
                locality
        `;

        return new Promise((resolve, reject) => {
            mysql.pool.query(localityQuery, (error, elements) => {
                if(error) {
                    return reject(error);
                }
                return resolve(elements);
            }); 
        });

    }
}