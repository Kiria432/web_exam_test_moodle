module.exports = (sequelize, Sequelize) => {
  const Operation = sequelize.define(
    "operation",
    {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      product_id: {
        type: Sequelize.INTEGER
      },
      type: {
        type: Sequelize.STRING
      },
      quantity: {
        type: Sequelize.INTEGER
      },
      operation_date: {
        type: Sequelize.DATE
      }
    },
    {
      schema: "moodles_exam",
      tableName: "operations",
      timestamps: false
    }
  );

  return Operation;
};