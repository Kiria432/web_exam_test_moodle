<template>
  <div class="col-md-12">
    <div class="card card-container mt-5 p-4">
      <h3 class="text-center">Авторизация</h3>

      <div class="form-group">
        <label>Имя пользователя</label>
        <input
          type="text"
          class="form-control"
          v-model="user.username"
        />
      </div>

      <div class="form-group">
        <label>Пароль</label>
        <input
          type="password"
          class="form-control"
          v-model="user.password"
        />
      </div>

      <button class="btn btn-primary btn-block mt-3" @click="handleLogin">
        Войти
      </button>

      <div v-if="message" class="alert alert-danger mt-3">
        {{ message }}
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "LoginPage",

  data() {
    return {
      user: {
        username: "",
        password: ""
      },
      message: ""
    };
  },

  methods: {
    handleLogin() {
      this.message = "";

      if (!this.user.username || !this.user.password) {
        this.message = "Введите имя пользователя и пароль";
        return;
      }

      this.$store.dispatch("auth/login", this.user).then(
        () => {
          this.$router.push("/products");
        },
        (error) => {
          this.message =
            error.response && error.response.data
              ? error.response.data.message
              : "Ошибка входа";
        }
      );
    }
  }
};
</script>

<style scoped>
.card-container {
  max-width: 400px;
  margin: auto;
}
</style>