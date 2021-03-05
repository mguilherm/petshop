<template>
  <div>
    <h3>Serviços do dia</h3>
    <table>
      <thead>
        <tr>
          <th>Nome</th>
          <th>Idade</th>
          <th>Raça</th>
          <th>Serviço</th>
          <th>Valor</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(cliente, index) in clientes" :key="index">
          <td>{{ cliente.nome }}</td>
          <td>{{ cliente.idade }}</td>
          <td>{{ cliente.raca }}</td>
          <td>{{ cliente.servico.nome }}</td>
          <td>{{ cliente.servico.preco | grana }}</td>
        </tr>
      </tbody>
      <tfoot>
        <tr>
          <td>Total</td>
          <td colspan="5">{{ totalServicos | grana }}</td>
        </tr>
      </tfoot>
    </table>
  </div>
</template>

<script>
export default {
  props: {
    clientes: { type: Array, default: () => {}}
  },
  computed: {
    totalServicos() {
      if (!Array.isArray(this.clientes)) { return 0; }
      return this.clientes.reduce((total, cliente) => total + cliente.servico.preco, 0);
    }
  }
}
</script>

<style lang="scss" scoped>
table {
  tr {
    justify-content: space-evenly;
  }
}
</style>