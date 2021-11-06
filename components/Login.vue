<template>
  <div class="w-full max-w-xs mx-auto pt-5">
    <form class="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
      <div class="mb-4">
        <h3 class="font-bold text-center">
          {{ newUser ? 'Creando cuenta' : 'Iniciando Sesion' }}
        </h3>
        <label
          class="block text-gray-700 text-sm font-bold mb-2"
          for="username"
        >
          Correo
        </label>
        <input
          v-model="correo"
          class="
            shadow
            appearance-none
            border
            rounded
            w-full
            py-2
            px-3
            text-gray-700
            leading-tight
            focus:outline-none focus:shadow-outline
          "
          id="correo"
          type="email"
          placeholder="Su correo"
        />
      </div>
      <div class="mb-6">
        <label
          class="block text-gray-700 text-sm font-bold mb-2"
          for="password"
        >
          Contraseña
        </label>
        <input
          v-model="password"
          class="
            shadow
            appearance-none
            rounded
            w-full
            py-2
            px-3
            text-gray-700
            mb-3
            leading-tight
            focus:outline-none focus:shadow-outline
          "
          id="password"
          type="password"
          placeholder="******************"
        />
      </div>
      <div class="flex items-center justify-between">
        <button
          @click="signInOrCreateUser"
          class="
            bg-blue-500
            hover:bg-blue-700
            text-white
            font-bold
            py-1
            px-3
            rounded
            focus:outline-none focus:shadow-outline
          "
          type="button"
        >
          {{ newUser ? 'Crear Cuenta' : 'Iniciar Sesion' }}
        </button>
        <a
          @click="newUser = !newUser"
          class="
            text-right
            inline-block
            align-baseline
            font-bold
            text-sm text-blue-500
            hover:text-blue-800
          "
          href="#"
        >
          {{ newUser ? 'Ya tiene una cuenta?' : 'Crear Cuenta' }}
        </a>
      </div>
      <p class="text-red text-sm">
        {{ errorMessage }}
      </p>
    </form>
  </div>
</template>
<script>
export default {
  data() {
    return {
      correo: '',
      password: '',
      newUser: true,
      errorMessage: '',
    }
  },
  methods: {
    async signInOrCreateUser() {
      this.errorMessage = ''
      try {
        if (this.newUser) {
          await this.$fire.auth.createUserWithEmailAndPassword(
            this.correo,
            this.password
          )
          this.$nuxt.$options.router.push({ name: 'perfil' })
        } else {
          await this.$fire.auth.signInWithEmailAndPassword(
            this.correo,
            this.password
          )
          this.$nuxt.$options.router.push({ name: 'perfil' })
        }
      } catch (error) {
        this.errorMessage = error.message
      }
    },
  },
}
</script>