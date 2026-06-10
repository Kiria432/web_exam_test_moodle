module.exports = (sequelize, Sequelize) => {
  const Role = sequelize.define(
    "role",
    {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      name: {
        type: Sequelize.STRING
      }
    },
    {
      schema: "moodles_exam",
      tableName: "roles",
      timestamps: false
    }
  );

  return Role;
};