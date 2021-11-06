<template>
  <div class="consulta-form">
    <h3>Editando Cita</h3>
    <h4>ID Cita: {{ citaId }}</h4>
    <form @submit.prevent="actualizarCita" class="w-full max-w-4xl p-5">
      <div class="flex flex-wrap -mx-3 mb-6">
        <div class="w-full md:w-1/2 px-3 mb-6 md:mb-0">
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
            <div
              class="
                pointer-events-none
                absolute
                inset-y-0
                right-0
                flex
                items-center
                px-2
                text-gray-700
              "
            >
              <svg
                class="fill-current h-4 w-4"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
              >
                <path
                  d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"
                />
              </svg>
            </div>
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
              appearance-none
              block
              w-full
              bg-gray-200 bg-blue-200
              focus:outline-none focus:bg-gray-200
              text-black-700
              rounded
              py-3
              px-4
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
          Actualizar
        </button>
      </div>
    </form>
    <div class="uploadfile">
      <h2>Subir archivo</h2>
      <input
        type="file"
        @change="fileSelected"
        accept="image/png, image/gif, image/jpeg"
      />
      <button
        class="
          bg-green-500
          hover:bg-green-700
          text-white
          font-bold
          py-2
          px-4
          rounded
        "
        @click="uploadFile"
      >
        Subir Archivo
      </button>
    </div>
  </div>
</template>
<script>
export default {
  head: { title: 'Estas ditando una cita' },
  async created() {
    const messageRef = this.$fire.firestore.collection('citas').doc(this.citaId)
    try {
      const messageDoc = await messageRef.get()
      this.cita = messageDoc.data()
      this.nombre = this.cita.Nombre
      this.apellidos = this.cita.Apellidos
      this.dia = this.cita.Dia
      this.hora = this.cita.Hora
      this.estado = this.cita.estado
    } catch (e) {
      alert(e)
      return
    }
  },
  data() {
    return {
      showModal: true,
      nombre: '',
      apellidos: '',
      dia: '',
      hora: '',
      estado: '',
      uid: '',
      cita: {},
      selectedFile: null,
    }
  },
  computed: {
    citaId() {
      return this.$nuxt._route.params.cita
    },
  },
  methods: {
    fileSelected() {
      this.selectedFile = event.target.files[0]
    },
    async uploadFile() {
      console.log(this.selectedFile.type)
      this.selectedFile.type
      const storageRef = this.$fire.storage.ref().child(this.selectedFile.name)
      const message = 'Nuxt-Fire with Firebase Storage rocks!'
      try {
        const snapshot = await storageRef.put(this.selectedFile.name, {
          contentType: 'image/jpeg',
        })
        this.$router.push({ name: 'perfil' })
      } catch (e) {
        alert(e.message)
      }
    },
    async actualizarCita() {
      await this.$fire.firestore.collection('citas').doc(this.citaId).update({
        Nombre: this.nombre,
        Apellidos: this.apellidos,
        Dia: this.dia,
        Hora: this.hora,
        estado: this.estado,
      })
      this.$router.push({ name: 'perfil' })
    },
  },
}
</script>