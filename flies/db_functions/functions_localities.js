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
    },
    updateLocality : updateLocality = (req) =>
    {

        let updateQuery = `
            UPDATE 
                locality 
            SET 
                country =?, 
                region =?, 
                place =?, 
                longitude =?, 
                latitude =?, 
                elevation =? 
            WHERE 
                id =?
        `;

        let params = [
            req.body.country, 
            req.body.region, 
            req.body.place, 
            req.body.longitude, 
            req.body.latitude, 
            req.body.elevation, 
            req.query.id
        ]

        return new Promise((resolve, reject) => {
            mysql.pool.query(updateQuery, params, (error, elements) => {
                if(error) {
                    return reject(error);
                }
                return resolve(elements);
            }); 
        });
    },
    createLocality : createLocality = (req) =>
    {

        let insertQuery = `
            INSERT INTO 
                locality ( 
                    country, 
                    region, 
                    place, 
                    longitude, 
                    latitude, 
                    elevation)
            VALUES 
                (?,?,?,?,?,?)
        `;

        let params = [
            req.body.country, 
            req.body.region, 
            req.body.place, 
            req.body.longitude, 
            req.body.latitude, 
            req.body.elevation, 
        ]

        return new Promise((resolve, reject) => {
            mysql.pool.query(insertQuery, params, (error, elements) => {
                if(error) {
                    return reject(error);
                }
                return resolve(elements);
            }); 
        });
    },
}