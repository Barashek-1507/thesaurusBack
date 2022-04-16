const dbConnection = {
    host: 'localhost',
    port: 5433,
    database: 'thesaurus',
    user: 'postgres',
    password: '1234',
}

const port = 1234

const secretKey = "Secret"

module.exports = {dbConnection, port, secretKey}