const db = require("../models");

const User = db.user;
const Role = db.role;

checkDuplicateUsernameOrEmail = async (req, res, next) => {
  try {
    const userByUsername = await User.findOne({
      where: {
        username: req.body.username
      }
    });

    if (userByUsername) {
      return res.status(400).send({
        message: "Имя пользователя уже занято"
      });
    }

    const userByEmail = await User.findOne({
      where: {
        email: req.body.email
      }
    });

    if (userByEmail) {
      return res.status(400).send({
        message: "Email уже используется"
      });
    }

    next();
  } catch (error) {
    res.status(500).send({
      message: error.message
    });
  }
};

checkRoleExisted = async (req, res, next) => {
  try {
    const roleName = req.body.role || "user";

    const role = await Role.findOne({
      where: {
        name: roleName
      }
    });

    if (!role) {
      return res.status(400).send({
        message: "Такой роли нет"
      });
    }

    next();
  } catch (error) {
    res.status(500).send({
      message: error.message
    });
  }
};

const verifySignUp = {
  checkDuplicateUsernameOrEmail,
  checkRoleExisted
};

module.exports = verifySignUp;