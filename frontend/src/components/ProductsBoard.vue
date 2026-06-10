<template>
  <div class="container mt-4">
    <h3>Сервис учёта товаров</h3>

    <div class="alert alert-info">
      Пользователь: <b>{{ currentUser.username }}</b>
      <br />
      Роль:
      <b>{{ isAdmin ? "Администратор" : "Пользователь" }}</b>
    </div>

    <div v-if="isAdmin" class="card p-3 mb-4">
      <h5>Добавить товар</h5>

      <div class="row">
        <div class="col-md-3">
          <input
            class="form-control"
            placeholder="Название"
            v-model="product.name"
          />
        </div>

        <div class="col-md-2">
          <input
            class="form-control"
            placeholder="Описание"
            v-model="product.description"
          />
        </div>

        <div class="col-md-2">
          <input
            type="number"
            class="form-control"
            placeholder="Цена"
            v-model="product.price"
          />
        </div>

        <div class="col-md-2">
          <input
            type="number"
            class="form-control"
            placeholder="Количество"
            v-model="product.quantity"
          />
        </div>

        <div class="col-md-3">
          <input
            class="form-control"
            placeholder="Поставщик"
            v-model="product.supplier"
          />
        </div>
      </div>

      <button class="btn btn-success mt-3" @click="createProduct">
        Добавить товар
      </button>
    </div>

    <div v-else class="alert alert-warning">
      Вам доступен только просмотр товаров.
    </div>

    <div v-if="message" class="alert alert-secondary">
      {{ message }}
    </div>

    <div class="card p-3">
      <h5>Список товаров</h5>

      <button class="btn btn-secondary mb-3" @click="loadProducts">
        Обновить список
      </button>

      <table class="table table-bordered table-hover">
        <thead>
          <tr>
            <th>№</th>
            <th>Наименование</th>
            <th>Описание</th>
            <th>Цена</th>
            <th>Количество</th>
            <th>Поставщик</th>
            <th v-if="isAdmin">Действия</th>
          </tr>
        </thead>

        <tbody>
          <tr v-for="item in products" :key="item.id">
            <td>{{ item.id }}</td>

            <td>
              <input
                v-if="isAdmin"
                class="form-control"
                v-model="item.name"
              />
              <span v-else>{{ item.name }}</span>
            </td>

            <td>
              <input
                v-if="isAdmin"
                class="form-control"
                v-model="item.description"
              />
              <span v-else>{{ item.description }}</span>
            </td>

            <td>
              <input
                v-if="isAdmin"
                type="number"
                class="form-control"
                v-model="item.price"
              />
              <span v-else>{{ item.price }} ₽</span>
            </td>

            <td>
              {{ item.quantity }}
            </td>

            <td>
              <input
                v-if="isAdmin"
                class="form-control"
                v-model="item.supplier"
              />
              <span v-else>{{ item.supplier }}</span>
            </td>

            <td v-if="isAdmin">
              <input
                type="number"
                class="form-control mb-2"
                placeholder="Кол-во"
                v-model="item.operationQuantity"
              />

              <button class="btn btn-sm btn-primary mr-1" @click="supply(item)">
                Поставка
              </button>

              <button class="btn btn-sm btn-warning mr-1" @click="sale(item)">
                Продажа
              </button>

              <button class="btn btn-sm btn-success mr-1" @click="updateProduct(item)">
                Сохранить
              </button>

              <button class="btn btn-sm btn-danger" @click="deleteProduct(item.id)">
                Удалить
              </button>
            </td>
          </tr>
        </tbody>
      </table>

      <p v-if="products.length === 0">
        Товаров пока нет.
      </p>
    </div>
  </div>
</template>

<script>
import ProductService from "../services/product.service";

export default {
  name: "ProductsBoard",

  data() {
    return {
      products: [],
      product: {
        name: "",
        description: "",
        price: "",
        quantity: "",
        supplier: ""
      },
      message: ""
    };
  },

  computed: {
    currentUser() {
      return this.$store.state.auth.user;
    },

    isAdmin() {
      return (
        this.currentUser &&
        this.currentUser.roles &&
        this.currentUser.roles.includes("ROLE_ADMIN")
      );
    }
  },

  methods: {
    loadProducts() {
      ProductService.getAll()
        .then((response) => {
          this.products = response.data;
        })
        .catch(() => {
          this.message = "Ошибка загрузки товаров";
        });
    },

    createProduct() {
      if (!this.product.name || !this.product.price) {
        this.message = "Введите название и цену товара";
        return;
      }

      ProductService.create(this.product)
        .then(() => {
          this.message = "Товар добавлен";

          this.product = {
            name: "",
            description: "",
            price: "",
            quantity: "",
            supplier: ""
          };

          this.loadProducts();
        })
        .catch(() => {
          this.message = "Ошибка добавления товара";
        });
    },

    updateProduct(item) {
      ProductService.update(item.id, {
        name: item.name,
        description: item.description,
        price: item.price,
        supplier: item.supplier
      })
        .then(() => {
          this.message = "Товар обновлён";
          this.loadProducts();
        })
        .catch(() => {
          this.message = "Ошибка обновления товара";
        });
    },

    deleteProduct(id) {
      ProductService.remove(id)
        .then(() => {
          this.message = "Товар удалён";
          this.loadProducts();
        })
        .catch(() => {
          this.message = "Ошибка удаления товара";
        });
    },

    supply(item) {
      if (!item.operationQuantity || item.operationQuantity <= 0) {
        this.message = "Введите количество для поставки";
        return;
      }

      ProductService.supply(item.id, item.operationQuantity)
        .then(() => {
          this.message = "Поставка выполнена";
          this.loadProducts();
        })
        .catch((error) => {
          this.message =
            error.response && error.response.data
              ? error.response.data.message
              : "Ошибка поставки";
        });
    },

    sale(item) {
      if (!item.operationQuantity || item.operationQuantity <= 0) {
        this.message = "Введите количество для продажи";
        return;
      }

      ProductService.sale(item.id, item.operationQuantity)
        .then(() => {
          this.message = "Продажа выполнена";
          this.loadProducts();
        })
        .catch((error) => {
          this.message =
            error.response && error.response.data
              ? error.response.data.message
              : "Ошибка продажи";
        });
    }
  },

  mounted() {
    if (!this.currentUser) {
      this.$router.push("/login");
      return;
    }

    this.loadProducts();
  }
};
</script>