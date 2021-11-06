<template>
  <div class="perfil">
    <CerrarSesion />
    <Navigation />
    <div class="profile-pag">
      <DetallesPerfil />
      <div class="consulta-form">
        <form @submit.prevent="enviarCita" class="w-full max-w-4xl p-3">
          <div class="flex flex-wrap -mx-3 mb-6">
            <div class="w-full md:w-1/2 px-3 mb-6 md:mb-0 form-registro">
              <label
                class="
                  block
                  uppercase
                  tracking-wide
                  text-gray-700 text-xs
                  font-bold
                  mb-2
                "
                for="grid-first-name"
              >
                Nombre del paciente
              </label>
              <input
                required
                class="
                  appearance-none
                  block
                  w-full
                  bg-blue-200
                  focus:outline-none focus:bg-gray-200
                  text-black-700
                  rounded
                  py-3
                  px-4
                  mb-3
                  leading-tight
                "
                v-model="nombre"
                type="text"
                placeholder="Maria"
              />
            </div>
            <div class="w-full md:w-1/2 px-3">
              <label
                class="
                  block
                  uppercase
                  tracking-wide
                  text-gray text-xs
                  font-bold
                  mb-2
                "
                for="grid-last-name"
              >
                Apellidos del paciente
              </label>
              <input
                required
                class="
                  appearance-none
                  block
                  w-full
                  bg-blue-200
                  focus:outline-none focus:bg-gray-200
                  text-black-700
                  rounded
                  py-3
                  px-4
                  mb-3
                  leading-tight
                "
                v-model="apellidos"
                type="text"
                placeholder="Mercedez"
              />
            </div>
          </div>

          <div class="flex flex-wrap -mx-3 mb-2">
            <div class="w-full md:w-1/3 px-3 mb-6 md:mb-0">
              <label
                class="
                  block
                  uppercase
                  tracking-wide
                  text-gray-700 text-xs
                  font-bold
                  mb-2
                "
                for="grid-city"
              >
                Dia de la cita
              </label>
              <input
                class="
                  appearance-none
                  block
                  w-full
                  bg-blue-200
                  focus:outline-none focus:bg-gray-200
                  text-black-700
                  rounded
                  py-3
                  px-4
                  leading-tight
                "
                type="date"
                v-model="dia"
                :placeholder="obtenerDia"
                required
              />
            </div>
            <div class="w-full md:w-1/3 px-3 mb-6 md:mb-0">
              <label
                class="
                  block
                  uppercase
                  tracking-wide
                  text-gray-700 text-xs
                  font-bold
                  mb-2
                "
                for="grid-state"
              >
                Hora de la Cita
              </label>
              <div class="relative">
                <input
                  required
                  min="09:00"
                  max="17:00"
                  type="time"
                  class="
                    block
                    appearance-none
                    w-full
                    bg-blue-200
                    focus:outline-none focus:bg-gray-200
                    text-black-700
                    py-3
                    px-4
                    pr-8
                    rounded
                    leading-tight
                  "
                  v-model="hora"
                />
              </div>
            </div>
            <div class="w-full md:w-1/3 px-3 mb-6 md:mb-0">
              <label
                class="
                  block
                  uppercase
                  tracking-wide
                  text-gray-700 text-xs
                  font-bold
                  mb-2
                "
                for="grid-zip"
              >
                Estado
              </label>
              <select
                required
                v-model="estado"
                class="
                  intento-fecha
                  block
                  appearance-none
                  w-full
                  bg-blue-200
                  focus:outline-none focus:bg-gray-200
                  text-black-700
                  py-3
                  px-4
                  pr-8
                  rounded
                  leading-tight
                "
                type="text"
              >
                <option value="Nuevo">Nuevo</option>
                <option value="Pendiente">Pendiente</option>
                <option value="Realizado">Realizado</option>
                <option value="Cancelado">Cancelado</option>
              </select>
            </div>
            <div class="btn-zone">
              <button
                class="
                  bg-blue-500
                  hover:bg-blue-700
                  text-white
                  font-bold
                  py-2
                  px-4
                  rounded
                "
              >
                Enviar
              </button>
            </div>
          </div>
        </form>
      </div>
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
  head: {
    title: 'Creando una consulta - Smart Doc',
  },
  created() {
    this.$fire.auth.onAuthStateChanged(() => {
      const user = this.$fire.auth.currentUser
      if (user) {
        this.uid = user.uid
      } else {
      }
    })
  },
  data() {
    return {
      nombre: '',
      apellidos: '',
      dia: '',
      hora: '',
      estado: '',
      uid: '',
    }
  },
  computed: {
    obtenerDia() {
      return new Date().toLocaleDateString()
    },
  },
  methods: {
    async enviarCita() {
      await this.$fire.firestore.collection('citas').add({
        Nombre: this.nombre,
        Apellidos: this.apellidos,
        Dia: this.dia,
        Hora: this.hora,
        estado: this.estado,
        uid: this.uid,
      })
      this.$nuxt.$options.router.push({ name: 'perfil' })
    },
  },
}
</script>
<style  scoped>
.consulta-form {
  margin: auto !important;
}
.btn-zone {
  margin-left: 13 px !important;
  margin-top: 20 px !important;
}
</style>