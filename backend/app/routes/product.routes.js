module.exports = function (app) {
  const controller = require("../controllers/product.controller");
  const { authJwt } = require("../middleware");

  const router = require("express").Router();

  router.get("/", [authJwt.verifyToken], controller.findAll);
  router.post("/", [authJwt.verifyToken, authJwt.isAdmin], controller.create);
  router.put("/:id", [authJwt.verifyToken, authJwt.isAdmin], controller.update);
  router.delete("/:id", [authJwt.verifyToken, authJwt.isAdmin], controller.delete);
  router.post("/:id/supply", [authJwt.verifyToken, authJwt.isAdmin], controller.supply);
  router.post("/:id/sale", [authJwt.verifyToken, authJwt.isAdmin], controller.sale);
  app.use("/api/products", router);
};