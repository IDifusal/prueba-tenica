<template>
  <div class="container-table">
    <table class="table-fixed" id="custom">
      <thead>
        <tr>
          <th class="w-1/2 ...">Paciente</th>
          <th class="w-1/4 ...">Fecha Cita</th>
          <th class="w-1/4 ...">Estado</th>
          <th class="w-1/2 ...">Editar</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="cita in citas" :key="cita.id">
          <td width="4px">{{ cita.Nombre }} {{ cita.Apellidos }}</td>
          <td width="4px">{{ cita.Dia }} - {{ cita.Hora }}</td>
          <td width="4px">{{ cita.estado }}</td>
        </tr>
      </tbody>
    </table>
    <table class="table-fixed" id="custom1">
      <thead>
        <tr>
          <th class="hes">Editar</th>
        </tr>
      </thead>
      <tbody>
        <tr class="hes-i" v-for="id in ids" :key="id.id" width="10px">
          <button
            @click="$router.push(`/citas/${id.id}`)"
            class="
              bg-white
              hover:bg-gray-100
              text-gray-800
              font-semibold
              py-2
              px-4
              border border-gray-400
              rounded
              shadow
            "
          >
            Editar
          </button>
        </tr>
      </tbody>
    </table>
    <input
      type="text"
      class="form-contorl my-3 bg-dark text-light"
      placeholder="Buscar Pacientes"
      @keyup="searchCita()"
      v-model="textSearch"
    />
  </div>
</template>
<script>
export default {
  data() {
    return {
      uid: '',
      citas: [],
      ids: [],
      listraFiltrada: [],
      textSearch: '',
    }
  },
  methods: {
    searchCita() {
      this.listraFiltrada = this.citas.filter((citas) =>
        citas.Nombre.toLowerCase().includes(this.textSearch.toLowerCase())
      )
    },
  },
  async created() {
    this.$fire.auth.onAuthStateChanged(() => {
      const user = this.$fire.auth.currentUser
      if (user) {
        this.uid = user.uid
        const messageRef = this.$fire.firestore
          .collection('citas')
          .where('uid', '==', this.uid)
        try {
          const messageDoc = messageRef.get().then((querySnapshot) => {
            querySnapshot.forEach((doc) => {
              // doc.data() is never undefined for query doc snapshots
              //   this.citas.push(doc.data())
              this.citas.push(doc.data())
              this.ids.push(doc)
            })
          })
        } catch (e) {
          console.log(e)
          return
        }
      }
    })
  },
}
</script>
<style scoped>
td {
  margin: 0px 15px;
}
.table-fixed {
  padding-right: 30px;
}
#custom td,
#custom th {
  border: 1px solid #8ecae6;
  padding: 8px;
}

#custom tr:nth-child(even) {
  background-color: #f2f2f2;
}

#custom tr:hover {
  background-color: #8ecae6;
}

#custom th {
  padding-top: 12px;
  padding-bottom: 12px;
  text-align: left;
  background-color: #219ebc;
  color: white;
}
#custom1 td,
#custom1 th {
  border: 1px solid #8ecae6;
  padding: 8px;
}

#custom1 tr:nth-child(even) {
  background-color: #f2f2f2;
}

#custom1 tr:hover {
  background-color: #8ecae6;
}

#custom1 th {
  padding-top: 12px;
  padding-bottom: 12px;
  text-align: left;
  background-color: #219ebc;
  color: white;
}
.container-table {
  position: relative;
}
#custom1 {
  position: absolute;
  top: 0px;
  right: 0px;
}
@media (max-width: 850px) {
  .hes {
    height: 73px !important;
  }
  .hes-i {
    height: 90px !important;
  }
}
</style>