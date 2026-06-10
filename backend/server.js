const express = require("express");
const cors = require("cors");

const app = express();

const corsOptions = {
  origin: "http://localhost:8081"
};

app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.json({
    message: "Сервис учета товаров работает"
  });
});

require("./app/routes/auth.routes")(app);
require("./app/routes/product.routes")(app);

const db = require("./app/models");

db.sequelize.sync({ force: false }).then(() => {
  console.log("База данных подключена");
});

const PORT = process.env.PORT || 8080;

app.listen(PORT, () => {
  console.log(`Сервер запущен на порту ${PORT}`);
});