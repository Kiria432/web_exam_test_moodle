const dbConfig = require("../config/db.config.js");
const Sequelize = require("sequelize");

const sequelize = new Sequelize(
  dbConfig.DB,
  dbConfig.USER,
  dbConfig.PASSWORD,
  {
    host: dbConfig.HOST,
    dialect: dbConfig.dialect,
    pool: dbConfig.pool
  }
);

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.role = require("./role.model.js")(sequelize, Sequelize);
db.user = require("./user.model.js")(sequelize, Sequelize);
db.product = require("./product.model.js")(sequelize, Sequelize);
db.operation = require("./operation.model.js")(sequelize, Sequelize);

db.role.hasMany(db.user, {
  foreignKey: "role_id"
});

db.user.belongsTo(db.role, {
  foreignKey: "role_id"
});

db.product.hasMany(db.operation, {
  foreignKey: "product_id"
});

db.operation.belongsTo(db.product, {
  foreignKey: "product_id"
});

module.exports = db;