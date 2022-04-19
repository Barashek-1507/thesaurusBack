const pool = require('./dbConnection.js');

const queryString = {
    findByUsername: `SELECT "user_id", "name", "last_name", "role", "username", "hash_password"
                     FROM "user"
                     WHERE "username" = $1`,
    insert: `INSERT INTO "user"("name", "last_name", "role", "username", "hash_password")
             VALUES ($1, $2, $3, $4, $5) RETURNING "user_id", "name", "last_name", "role", "username", "hash_password"`,
    update: `UPDATE "user"
             SET "name"          = $1,
                 "last_name"     = $2,
                 "role"          = $3,
                 "username"      = $4,
                 "hash_password" = $5
             WHERE "user_id" = $6 RETURNING "user_id", "name", "last_name", "role", "username", "hash_password"`,
    delete: `DELETE
             FROM "user"
             WHERE "user_id" = $1 RETURNING "user_id", "name", "last_name", "role", "username", "hash_password"`
}

const findByUsername = async (username) => {
    const query = await pool.query(
        queryString.findByUsername,
        [username]);
    if (query.rows.length < 1) {
        return null
    }
    return query.rows[0];
}

const post = async (user) => {
    const query = await pool.query(
        queryString.insert,
        [user.name, user.last_name, user.role, user.username, user.hash_password,]);

    return query.rows;
}

// const put = async (user_id, user) => {
//     const query = await pool.query(
//         queryString.update,
//         [user.user, user_id]);
//     if(query.rows.length < 1){
//         return null;
//     }
//     return query.rows[0];
// }

module.exports = {findByUsername, post}
