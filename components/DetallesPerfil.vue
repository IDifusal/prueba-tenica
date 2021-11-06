<template>
  <div class="white-bar">
    <img
      src="https://smartdoctor.la/wp-content/uploads/2021/04/Logo_Smart_Dr_1080x580.png"
    />
    <h3>Mis Datos</h3>
    <p class="txt">Correo Registrado:<br />{{ email }}</p>
    <p class="txt">Mi identificador de usuario<br />{{ uid }}</p>
  </div>
</template>
<script>
export default {
  methods: {
    search() {
      // Declare variables
      var input, filter, ul, li, a, i, txtValue
      input = document.getElementById('myInput')
      filter = input.value.toUpperCase()
      ul = document.getElementById('myUL')
      li = ul.getElementsByTagName('li')

      // Loop through all list items, and hide those who don't match the search query
      for (i = 0; i < li.length; i++) {
        a = li[i].getElementsByTagName('a')[0]
        txtValue = a.textContent || a.innerText
        if (txtValue.toUpperCase().indexOf(filter) > -1) {
          li[i].style.display = ''
        } else {
          li[i].style.display = 'none'
        }
      }
    },
  },
  created() {
    this.$fire.auth.onAuthStateChanged(() => {
      const user = this.$fire.auth.currentUser
      if (user) {
        this.uid = user.uid
        this.email = user.email
        this.loggedI = true
      } else {
        this.loggedIn = false
      }
    })
  },
  data() {
    return {
      loggedI: '',
      email: '',
      uid: '',
    }
  },
}
</script>
<style scoped>
.white-bar {
  background: white;
  padding: 20px;
}
.txt {
  font-size: 12px;
  text-align: text-center;
  margin-bottom: 10px;
}
</style>