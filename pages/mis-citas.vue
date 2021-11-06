<template>
  <div class="perfil">
    <CerrarSesion />
    <Navigation />
    <div class="profile-pag">
      <DetallesPerfil />
      <ListaCitas />
    </div>
  </div>
</template>

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
</style>
<script>
export default {
  head: { title: 'Lista de citas' },
}
</script>