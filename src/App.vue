<template>
  <div id="app">
    <div class="container">
      <h1>Bem vindo ao Petshop</h1>
      <hr>
      <div class="linha">
        <div class="coluna">
          <recepcao @novo-cadastro="novoCliente"></recepcao>
        </div>
        <div class="coluna">
          <div class="linha">
            <veterinario :clientes="clientesVeterinario" @realizado="finalizarConsulta"></veterinario>
          </div>
          <div class="linha">
            <banho :clientes="clientesBanho" @realizado="finalizarBanho"></banho>
          </div>  
        </div>
      </div>
      <hr>
      <div class="linha">
          <balanco :clientes="clientesAtendidos"></balanco>
        </div>
    </div>
  </div>
</template>

<script>
import Vue from 'vue';
import axios from 'axios';
import Cachorro from '@/models/cachorro';

// Importando os componentes que serão utilizados nesta página - caso sejam utilizados com frequência, mover para main.js
import Recepcao from '@/components/Recepcao';
import Banho from '@/components/Banho';
import Veterinario from '@/components/Veterinario';
import Balanco from '@/components/Balanco';

export default {
  name: 'Home',
  components: {
    Recepcao,
    Banho,
    Veterinario,
    Balanco
  },
  data() {
    return {
      clientesBanho: [],
      clientesVeterinario: [],
      clientesAtendidos: []
    }
  },
  created() {
    const { data } = axios.get('http://localhost:3000/clientes');
    if (!data) { return; }

    this.clientesBanho = data.filter((cliente) => cliente.servico.nome === 'banho');
    this.clientesVeterinario = data.filter((cliente) => cliente.servico.nome === 'consulta');
  },
  methods: {
    novoCliente(cliente) {
      cliente.servico.tipo === 'banho'
        ? this.clientesBanho.push(cliente)
        : this.clientesVeterinario.push(cliente);
    },
    finalizarBanho(cliente, index) {
      this.clientesAtendidos.push(cliente);

      // Nem todas as operações são rastreadas pelo Vue, 
      // neste caso temos que "forçar" que a lista seja re-renderizada, 
      // uma vez que operações filter e splice (metodos comuns para remover itens de um array)ao contrário do push não notificam o observador
      Vue.delete(this.clientesBanho, this.clientesBanho.findIndex((clienteBanho) => clienteBanho.nome === cliente.nome));

    },
    finalizarConsulta(cliente) {
      this.clientesAtendidos.push(cliente);
      this.clientesVeterinario = this.clientesVeterinario.filter((clienteAtendido) => clienteAtendido.nome === cliente.nome);
    },
  }
}
</script>

<style lang="scss">
// Podemos usar mais de uma tag style em um componente, esta aqui como não possui o atributo scoped, estará disponível para todos os componentes
 @import './assets/styles/main.scss';
</style>

<style lang="scss" scoped>
.container {
  display: block;
  margin: 20px;
}
</style>
