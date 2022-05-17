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
            mysql.pool.query(personQuery, [req.params.id], (error, elements) => {
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
   updatePerson : updatePerson = (req) =>
   {
       let updateQuery = `
       UPDATE
           people
       SET
           first_name =?,
           last_name =?
       WHERE
           id =?
       `;

       let params = [
           req.body.first_name, 
           req.body.last_name, 
           req.query.id
       ];

       return new Promise((resolve, reject) => {
           mysql.pool.query(updateQuery, params, (error, elements) => {
               if(error) {
                   return reject(error);
               }
               return resolve(elements);
           }); 
       });
   }
}