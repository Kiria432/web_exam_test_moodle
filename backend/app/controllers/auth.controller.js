const db = require("../models");
const config = require("../config/auth.config");

const User = db.user;
const Role = db.role;

const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

exports.signup = async (req, res) => {
  try {
    const roleName = req.body.role || "user";

    const role = await Role.findOne({
      where: {
        name: roleName
      }
    });

    const user = await User.create({
      username: req.body.username,
      email: req.body.email,
      password: bcrypt.hashSync(req.body.password, 8),
      role_id: role.id
    });

    res.send({
      message: "Пользователь успешно зарегистрирован",
      userId: user.id
    });
  } catch (error) {
    res.status(500).send({
      message: error.message
    });
  }
};

exports.signin = async (req, res) => {
  try {
    const user = await User.findOne({
      where: {
        username: req.body.username
      },
      include: [
        {
          model: Role
        }
      ]
    });

    if (!user) {
      return res.status(404).send({
        message: "Пользователь не найден"
      });
    }

    const passwordIsValid = bcrypt.compareSync(
      req.body.password,
      user.password
    );

    if (!passwordIsValid) {
      return res.status(401).send({
        accessToken: null,
        message: "Неверный пароль"
      });
    }

    const token = jwt.sign(
      {
        id: user.id
      },
      config.secret,
      {
        expiresIn: 86400
      }
    );

    res.status(200).send({
      id: user.id,
      username: user.username,
      email: user.email,
      roles: ["ROLE_" + user.role.name.toUpperCase()],
      accessToken: token
    });
  } catch (error) {
    res.status(500).send({
      message: error.message
    });
  }
};