import Vue from 'vue';

// @ é equivalente a pasta src de nosso projeto
import App from '@/App';

// Filtro para formatação de valores numéricos em monetário
Vue.filter('grana', function (value) {
  if (typeof value !== 'number') { return value; }

  value = value.toFixed(2);
  return `R$ ${value}`;
});

// Filtro para formatação de campos booleanos em sim/não
Vue.filter('pergunta', function (value) {
  if (value === undefined) { return 'Não'; }
  if (typeof value !== 'boolean') { return value; }

  return value ? 'Sim' : 'Não';
});

// Indicação no console do browser do "modo produção"
Vue.config.productionTip = false;

// Inicialização da instância global do Vue no elemento app
const vm = new Vue({
  el: '#app',
  render: h => h(App)
});