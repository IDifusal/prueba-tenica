<template>
  <div class="top-bar" v-show="loggedIn">
    <p>Bievenido {{ uid }}</p>
    <button
      @click="signOut"
      class="bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-3 rounded"
    >
      Cerrar Sesion
    </button>
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
      uid: '',
    }
  },
  methods: {
    async signOut() {
      try {
        const data = this.$fire.auth.signOut()
        console.log(data)
        this.$nuxt.$options.router.push({ name: 'index' })
      } catch (error) {}
    },
  },
}
</script>
<style scoped>
.top-bar {
  text-align: right;
  background: #edf2f4;
  padding: 10px;
}
</style>