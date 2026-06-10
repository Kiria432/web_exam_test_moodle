const jwt = require("jsonwebtoken");
const config = require("../config/auth.config.js");
const db = require("../models");

const User = db.user;
const Role = db.role;

verifyToken = (req, res, next) => {
  let token = req.headers["x-access-token"];

  if (!token) {
    return res.status(403).send({
      message: "Токен не предоставлен"
    });
  }

  jwt.verify(token, config.secret, (err, decoded) => {
    if (err) {
      return res.status(401).send({
        message: "Ошибка авторизации"
      });
    }

    req.userId = decoded.id;
    next();
  });
};

isAdmin = async (req, res, next) => {
  try {
    const user = await User.findByPk(req.userId, {
      include: [
        {
          model: Role
        }
      ]
    });

    if (user && user.role && user.role.name === "admin") {
      next();
      return;
    }

    res.status(403).send({
      message: "Доступ только для администратора"
    });
  } catch (error) {
    res.status(500).send({
      message: error.message
    });
  }
};

const authJwt = {
  verifyToken,
  isAdmin
};

module.exports = authJwt;