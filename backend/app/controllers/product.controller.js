const db = require("../models");

const Product = db.product;
const Operation = db.operation;

exports.create = async (req, res) => {
  try {
    const product = await Product.create({
      name: req.body.name,
      description: req.body.description,
      price: req.body.price,
      quantity: req.body.quantity || 0,
      supplier: req.body.supplier
    });

    res.status(201).send(product);
  } catch (error) {
    res.status(500).send({
      message: error.message
    });
  }
};

exports.findAll = async (req, res) => {
  try {
    const products = await Product.findAll({
      order: [["id", "ASC"]]
    });

    res.send(products);
  } catch (error) {
    res.status(500).send({
      message: error.message
    });
  }
};

exports.findOne = async (req, res) => {
  try {
    const product = await Product.findByPk(req.params.id);

    if (!product) {
      return res.status(404).send({
        message: "Товар не найден"
      });
    }

    res.send(product);
  } catch (error) {
    res.status(500).send({
      message: error.message
    });
  }
};

exports.update = async (req, res) => {
  try {
    const id = req.params.id;

    const result = await Product.update(
      {
        name: req.body.name,
        description: req.body.description,
        price: req.body.price,
        supplier: req.body.supplier
      },
      {
        where: {
          id: id
        }
      }
    );

    if (result[0] === 1) {
      res.send({
        message: "Товар успешно обновлен"
      });
    } else {
      res.status(404).send({
        message: "Товар не найден"
      });
    }
  } catch (error) {
    res.status(500).send({
      message: error.message
    });
  }
};

exports.delete = async (req, res) => {
  try {
    const id = req.params.id;

    const result = await Product.destroy({
      where: {
        id: id
      }
    });

    if (result === 1) {
      res.send({
        message: "Товар успешно удален"
      });
    } else {
      res.status(404).send({
        message: "Товар не найден"
      });
    }
  } catch (error) {
    res.status(500).send({
      message: error.message
    });
  }
};

exports.supply = async (req, res) => {
  try {
    const id = req.params.id;
    const quantity = Number(req.body.quantity);

    if (!quantity || quantity <= 0) {
      return res.status(400).send({
        message: "Количество должно быть больше 0"
      });
    }

    const product = await Product.findByPk(id);

    if (!product) {
      return res.status(404).send({
        message: "Товар не найден"
      });
    }

    product.quantity = product.quantity + quantity;
    await product.save();

    await Operation.create({
      product_id: id,
      type: "supply",
      quantity: quantity
    });

    res.send({
      message: "Поставка выполнена",
      product: product
    });
  } catch (error) {
    res.status(500).send({
      message: error.message
    });
  }
};

exports.sale = async (req, res) => {
  try {
    const id = req.params.id;
    const quantity = Number(req.body.quantity);

    if (!quantity || quantity <= 0) {
      return res.status(400).send({
        message: "Количество должно быть больше 0"
      });
    }

    const product = await Product.findByPk(id);

    if (!product) {
      return res.status(404).send({
        message: "Товар не найден"
      });
    }

    if (product.quantity < quantity) {
      return res.status(400).send({
        message: "Недостаточно товара на складе"
      });
    }

    product.quantity = product.quantity - quantity;
    await product.save();

    await Operation.create({
      product_id: id,
      type: "sale",
      quantity: quantity
    });

    res.send({
      message: "Продажа выполнена",
      product: product
    });
  } catch (error) {
    res.status(500).send({
      message: error.message
    });
  }
};

exports.history = async (req, res) => {
  try {
    const operations = await Operation.findAll({
      include: [
        {
          model: Product
        }
      ],
      order: [["id", "DESC"]]
    });

    res.send(operations);
  } catch (error) {
    res.status(500).send({
      message: error.message
    });
  }
};