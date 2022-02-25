module.exports = {
    client: 'pg',
    connection: { 
        host : '127.0.0.1',
        port : 5432,
        user : 'postgres',
        password : '18062003',
        database : 'food'
    },
    migrations: {
        tableName: 'migrations'
    },
    seeds: {
        directory: "./seeds"
    }
};