<template>
  <div>
    <h3>Fila de Banho</h3>
    <table>
      <tr>
        <th>Nome</th>
        <th>Idade</th>
        <th>Raça</th>
        <th>Tosa?</th>
        <th></th>
      </tr>
      <tr v-for="(cliente, index) in clientes" :key="index">
        <td>{{ cliente.nome }}</td>
        <td>{{ cliente.idade }}</td>
        <td>{{ cliente.raca }}</td>
        <td>{{ cliente.servico.extra | pergunta }}</td>
        <td>
          <button @click="realizarServico(cliente)">Dar banho</button>
        </td>
      </tr>
    </table>
  </div>
</template>

<script>
// Componente pai, onde se encontra a função realizarServico
import Servico from '@/components/Servico';

export default {
  props: ['clientes'],
  extends: Servico
}
</script>

<style lang="scss" scoped>
table {
  tr {
    justify-content: space-evenly;
  }
}
</style>