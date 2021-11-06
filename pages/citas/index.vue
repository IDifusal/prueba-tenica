<template>
  <div class="perfil">
    <CerrarSesion />
    <Navigation />

    <div class="profile-pag">
      <DetallesPerfil />
      <div class="content">
        <div class="info">
          <p>Buenos días</p>
          <br />
          <h2>Arequipa,</h2>
          <p>{{ hora }}</p>
        </div>
        <ListaCitas />
      </div>
    </div>
  </div>
</template>
<script>
export default {
  head: {
    title: 'Estas en tu perfil',
  },
  computed: {
    hora() {
      var dateString = new Date().toLocaleString({
        timeZone: 'America/Sao_Paulo',
      })
      var formattedString = dateString.replace(', ', ' - ')
      return formattedString
    },
  },
}
</script>
<style scoped>
@media (max-width: 850px) {
  .profile-pag {
    display: block !important;
  }
}
.profile-pag {
  display: grid;
  grid-template-columns: 330px 1fr;
}
.info {
  padding: 20px 60px;
  color: white;
  background: #2193b0; /* fallback for old browsers */
  background: -webkit-linear-gradient(
    to right,
    #6dd5ed,
    #2193b0
  ); /* Chrome 10-25, Safari 5.1-6 */
  background: linear-gradient(
    to right,
    #6dd5ed,
    #2193b0
  ); /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */
}
</style>