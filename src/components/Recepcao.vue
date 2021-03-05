<template>
  <div>
    <div>
      <label class="espaco-lado">Nome do Cliente:</label>
      <input type="text" v-model="cliente.nome">
    </div>
    <div class="espaco-abaixo"></div>
    <div>
      <label class="espaco-lado">Raça do Cão:</label>
      <select v-model="cliente.raca">
        <option v-for="(raca, index) in racas" :key="index">{{ raca.nome }}</option>
      </select>
    </div>
    <div class="espaco-abaixo"></div>
    <div>
      <label class="espaco-lado">Idade:</label>
      <input type="number" v-model="cliente.idade">
      <div class="erro" v-if="cliente.idade > 30">
        Wow! Tem certeza que é um cachorro?
      </div>
    </div>
    <div class="espaco-abaixo"></div>
    <div>
      <label class="espaco-lado">Serviço:</label>
      <select v-model="cliente.servico">
        <option v-for="(servico, index) in servicos" :key="index" :value="servico">{{ servico.nome }} ({{ servico.preco | grana }})</option>
      </select>
    </div>
    <div class="espaco-abaixo"></div>
    <div class="espaco" v-if="cliente.servico && cliente.servico.tipo === 'consulta'">
      <label class="espaco-lado">Sintomas: </label>
      <textarea v-model="cliente.servico.observacoes" rows="3"></textarea>
    </div>
    <div class="espaco-abaixo"></div>
    <div>
      <button @click="cadastrarCliente">Cadastrar cliente</button>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
import Cachorro from '@/models/cachorro';

export default {
  data() {
    return {
      cliente: new Cachorro(),
      racas: [],
      servicos: []
    }
  },
  async created() {
    try {
      this.racas = await this.buscarRacas();
      this.servicos = await this.buscarServicos();
    } catch (error) {
      console.log(error);
    }
  },
  computed: {
    cadastroInvalido() {
      return this.cliente.nome.length === 0 || 
        this.cliente.idade.length === 0 || 
        this.cliente.idade <= 0 || 
        this.cliente.raca.length === 0 ||
        this.cliente.servico.tipo.length === 0;
    }
  },
  methods: {
    async buscarRacas() {
      const { data } = await axios.get('http://localhost:3000/racas');
      return data;
    },
    async buscarServicos() {
      const { data } = await axios.get('http://localhost:3000/servicos');
      return data;
    },
    cadastrarCliente() {
      if (this.cadastroInvalido) {
        alert('Favor preencher todas as informações corretamente no cadastro do cliente');
        return;
      }

      this.$emit('novo-cadastro', this.cliente);

      // Reinicia o cliente aqui para liberarmos sua referência
      this.cliente = new Cachorro();
    }
  }
}
</script>

<style lang="scss" scoped>
.erro {
  color: red;
}
</style>