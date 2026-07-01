const { Sequelize } = require('sequelize');
require('dotenv').config();

let sequelize;

const dbUrl = process.env.DATABASE_URL || 'postgresql://neondb_owner:npg_ECXfNZ6ysgI1@ep-still-sun-aovkr6kn-pooler.c-2.ap-southeast-1.aws.neon.tech/neondb?sslmode=require&channel_binding=require';

if (dbUrl) {
  console.log(`Connecting to database via connection string...`);
  sequelize = new Sequelize(dbUrl, {
    dialect: 'postgres',
    logging: false,
    dialectOptions: {
      ssl: {
        require: true,
        rejectUnauthorized: false
      }
    },
    define: {
      timestamps: true
    }
  });
} else {
  const dbName = process.env.DB_NAME || 'sports_inventory';
  const dbUser = process.env.DB_USER || 'postgres';
  const dbPass = process.env.DB_PASS || 'postgres';
  const dbHost = process.env.DB_HOST || '127.0.0.1';
  const dbPort = process.env.DB_PORT || 5432;

  console.log(`Connecting to database ${dbName} on ${dbHost}:${dbPort} as ${dbUser}...`);

  sequelize = new Sequelize(dbName, dbUser, dbPass, {
    host: dbHost,
    port: parseInt(dbPort),
    dialect: 'postgres',
    logging: process.env.NODE_ENV === 'development' ? (msg) => console.log(`[Sequelize] ${msg}`) : false,
    pool: {
      max: 10,
      min: 0,
      acquire: 30000,
      idle: 10000
    },
    define: {
      timestamps: true
    }
  });
}

module.exports = sequelize;
