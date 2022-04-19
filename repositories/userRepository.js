const pool = require('./dbConnection.js');

const queryString = {
    selectAll: `SELECT "user_id", "name", "last_name", "role", "username", "hash_password"
                FROM "user"
                ORDER BY "user_id"`,
    select: `SELECT "user_id", "name", "last_name", "role", "username", "hash_password"
             FROM "user"
             WHERE "user_id" = $1`,
    insert: `INSERT INTO "user"("name", "last_name", "role", "username", "hash_password")
             VALUES ($1, $2, $3, $4, $5)
             RETURNING "name", "last_name", "role", "username", "hash_password"`,
    update: `UPDATE "user"
             SET "name"          = $1,
                 "last_name"     = $2,
                 "role"          = $3,
                 "username"      = $4,
                 "hash_password" = $5
             WHERE "user_id" = $6
             RETURNING "user_id", "name", "last_name", "role", "username", "hash_password"`,
    updateUser: `UPDATE "user"
                 SET "name"      = $1,
                     "last_name" = $2,
                     "username"  = $3
                 WHERE "user_id" = $4
                 RETURNING "user_id", "name", "last_name", "username"`,
    delete: `DELETE
             FROM "user"
             WHERE "user_id" = $1
             RETURNING "user_id", "name", "last_name", "role", "username", "hash_password"`
}

const getAll = async () => {
    const query = await pool.query(queryString.selectAll);
    return query.rows;
}

const get = async (user_id) => {
    const query = await pool.query(
        queryString.select,
        [user_id]);
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

const put = async (user_id, user) => {
    const query = await pool.query(
        queryString.updateUser,
        [user.name, user.last_name, user.username, user_id]);
    if (query.rows.length < 1) {
        return null;
    }
    return query.rows[0];
}

const remove = async (user_id) => {
    const query = await pool.query(
        queryString.delete,
        [user_id]);
    if (query.rows.length < 1) {
        return null;
    }
    return query.rows[0];
}

module.exports = {getAll, get, post, put, remove}
