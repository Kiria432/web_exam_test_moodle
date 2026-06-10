<template>
  <div class="col-md-12">
    <div class="card card-container mt-5 p-4">
      <h3 class="text-center">Регистрация</h3>

      <div class="form-group">
        <label>Имя пользователя</label>
        <input
          type="text"
          class="form-control"
          v-model="user.username"
        />
      </div>

      <div class="form-group">
        <label>Email</label>
        <input
          type="email"
          class="form-control"
          v-model="user.email"
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

      <div class="form-group">
        <label>Роль</label>
        <select class="form-control" v-model="user.role">
          <option value="user">Пользователь</option>
          <option value="admin">Администратор</option>
        </select>
      </div>

      <button class="btn btn-success btn-block mt-3" @click="handleRegister">
        Зарегистрироваться
      </button>

      <div
        v-if="message"
        class="alert mt-3"
        :class="successful ? 'alert-success' : 'alert-danger'"
      >
        {{ message }}
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "RegisterPage",

  data() {
    return {
      user: {
        username: "",
        email: "",
        password: "",
        role: "user"
      },
      successful: false,
      message: ""
    };
  },

  methods: {
    handleRegister() {
      this.message = "";
      this.successful = false;

      if (!this.user.username || !this.user.email || !this.user.password) {
        this.message = "Заполните все поля";
        return;
      }

      this.$store.dispatch("auth/register", this.user).then(
        (data) => {
          this.message = data.message;
          this.successful = true;
        },
        (error) => {
          this.message =
            error.response && error.response.data
              ? error.response.data.message
              : "Ошибка регистрации";
          this.successful = false;
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