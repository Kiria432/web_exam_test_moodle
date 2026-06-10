module.exports = {
  HOST: "localhost",
  USER: "postgres",
  PASSWORD: "Titanfall070909",
  DB: "postgres",
  SCHEMA: "moodles_exam",
  PORT: 5432,
  dialect: "postgres",
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000
  }
};