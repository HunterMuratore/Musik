const { Sequelize } = require('sequelize');
require('dotenv').config();

const is_production = process.env.PORT;
let sequelize;

// Create and export the database connection
if(is_production) {
    sequelize = new Sequelize(process.env.JAWSDB_URL);
} else {
    sequelize = new Sequelize(
        process.env.DB_NAME, 
        process.env.DB_USERNAME, 
        process.env.DB_PASSWORD, 
        {
            host: 'localhost',
            dialect: 'mysql',
            logging: false
    });
}

module.exports = sequelize;