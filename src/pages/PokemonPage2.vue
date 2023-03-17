<template>
  <q-page class="bg-black">
    <Header />
    <div class="row q-pt-md q-pa-lg bg-red-10 full-width">
      <div class="col-11 bg-white q-pa-sm">
        <q-input
          input-style="background:white"
          dense
          label="Pesquisar o pokemon"
        />
      </div>
      <div class="col-1">
        <q-btn
          color="primary"
          label="GO!"
          class="full-height full-width"
        />
      </div>
    </div>
     <div class="col-12 col-md-12 text-white text-center">
        <small>
          Esta aplicação utiliza a api extena
          <a href="https://pokeapi.co/" target="_blank">https://pokeapi.co/</a>.
          Por este motivo, pode apresentar instabilidade
        </small>
      </div>
    <div class="container q-pa-lg">
    <div class="row flex-center">
      <div
        class="col-md-4 col-12 q-pa-lg"
        v-for="(pokemon, ikey) in pokemons"
        :key="ikey"
      >
      <Item :url="pokemon.url"/>
      </div>
        <div class="col-12 col-md-12 q-pa-md  text-center">
          <q-btn
          color="primary"
          label="Carregar mais.."
          class="col-4"
          @click="getAPI()"
        />
        </div>
     
    </div>
    </div>
  </q-page>
</template>

<script>
import Header from "src/components/Parts/Header.vue";
import Item from "src/components/pokemons/Item.vue";

import api from "../services/api";
export default {
  components: { Header },
  name: "PokemonPage",
  components: { Header,Item },
  data: () => ({
    currentPokemon: {
      name: "",
      image: "",
      base_experience: "",
      hability: {},
      id: 1
    },
    pokemons: [],
    pokemonsList: [],
    nextUrl: '/pokemon/'
  }),

  created() {
    
  },
  async mounted(){
  await this.getAPI();
  },
  methods: {

    triggerPositive() {
      this.$q.notify({
        type: "positive",
        position: "top",
        message: `Pokemon encontrado.`
      });
    },

    triggerNegative() {
      this.$q.notify({
        type: "negative",
        position: "top",
        message: `Ops, parece que este não existe..`
      });
    },
    showLoading() {
      this.$q.loading.show();
    },
    hideLoading() {
      this.$q.loading.hide();
    },

    goBack() {
      this.currentPokemon.id = this.currentPokemon.id - 1;
      this.getAPI(this.currentPokemon.id);
    },
    goNext() {
      this.currentPokemon.id = this.currentPokemon.id + 1;
      this.getAPI(this.currentPokemon.id);
    },
    async getAPI() {
      this.showLoading();
      await api.get(this.nextUrl).then(res => {
        this.nextUrl= res.data.next
        this.pokemons.push(...res.data.results)
        console.log('nextUrl',this.pokemons)
        this.hideLoading();
      });
    }
  }
};
</script>
