module.exports = (sequelize, Sequelize) => {
  const Product = sequelize.define(
    "product",
    {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      name: {
        type: Sequelize.STRING
      },
      description: {
        type: Sequelize.TEXT
      },
      price: {
        type: Sequelize.DECIMAL(10, 2)
      },
      quantity: {
        type: Sequelize.INTEGER
      },
      supplier: {
        type: Sequelize.STRING
      },
      created_at: {
        type: Sequelize.DATE
      }
    },
    {
      schema: "moodles_exam",
      tableName: "products",
      timestamps: false
    }
  );

  return Product;
};