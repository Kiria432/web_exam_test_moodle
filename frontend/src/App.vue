<template>
  <div id="app">
    <nav class="navbar navbar-expand navbar-dark bg-dark">
      <router-link to="/products" class="navbar-brand">
        Учёт товаров
      </router-link>

      <div class="navbar-nav mr-auto">
        <li class="nav-item" v-if="currentUser">
          <router-link to="/products" class="nav-link">
            Товары
          </router-link>
        </li>
      </div>

      <div class="navbar-nav ml-auto" v-if="!currentUser">
        <li class="nav-item">
          <router-link to="/register" class="nav-link">
            Регистрация
          </router-link>
        </li>

        <li class="nav-item">
          <router-link to="/login" class="nav-link">
            Вход
          </router-link>
        </li>
      </div>

      <div class="navbar-nav ml-auto" v-if="currentUser">
        <li class="nav-item">
          <span class="nav-link">
            {{ currentUser.username }}
          </span>
        </li>

        <li class="nav-item">
          <a class="nav-link" href @click.prevent="logOut">
            Выход
          </a>
        </li>
      </div>
    </nav>

    <div class="container mt-3">
      <router-view />
    </div>
  </div>
</template>

<script>
export default {
  name: "App",

  computed: {
    currentUser() {
      return this.$store.state.auth.user;
    }
  },

  methods: {
    logOut() {
      this.$store.dispatch("auth/logout");
      this.$router.push("/login");
    }
  }
};
</script>