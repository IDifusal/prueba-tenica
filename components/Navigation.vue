<template>
  <div class="nav-component">
    <div class="flex navigaiton-bar justify-center pt-4">
      <nav class="navbar navbar-expand-lg navbar-light bg-light">
        <img
          src="https://upload.wikimedia.org/wikipedia/commons/a/ae/Nuxt_logo.svg"
          width="80px"
          alt="Smart App"
          class="m-auto"
        />
        <div v-if="loggedIn" id="navbarNav">
          <ul class="navbar-nav flex">
            <li class="nav-item">
              <nuxt-link to="/perfil">Mi perfil</nuxt-link>
            </li>
            <li class="nav-item mx-5">
              <nuxt-link to="/crear-consulta">Registrar una Cita</nuxt-link>
            </li>
            <li class="nav-item mx-5">
              <nuxt-link to="/mis-citas">Mis citas</nuxt-link>
            </li>
          </ul>
        </div>
        <div v-else>
          <ul class="navbar-nav flex">
            <li class="nav-item">
              <nuxt-link to="perfil">Ingresar</nuxt-link>
            </li>
            <li class="nav-item mx-5">
              <nuxt-link to="crear-consulta">Acerca</nuxt-link>
            </li>
            <li class="nav-item mx-5">
              <nuxt-link to="lista-citas">Contacto</nuxt-link>
            </li>
          </ul>
        </div>
      </nav>
    </div>
  </div>
</template>
<script>
export default {
  created() {
    this.$fire.auth.onAuthStateChanged(() => {
      const user = this.$fire.auth.currentUser
      if (user) {
        this.uid = user.email
        this.loggedIn = true
      } else {
        this.loggedIn = false
      }
    })
  },
  data() {
    return {
      loggedIn: false,
    }
  },
}
</script>

<style scoped>
.navigaiton-bar {
  background: white;
  z-index: 10;
  text-align: center;
}
.nav-item {
  margin: 30px;
}

@media (min-width: 850px) {
  .navbar-toggler {
    display: none;
  }
}
</style>