<template>
  <q-page class="poke__page">
    <Header />
    <div class="row q-pt-sm q-pa-sm bg-red-10 full-width flex flex-center">
      <div class="col-md-5 col-12">
        <q-input
          dense
          flat
          color="white"
          label-color="black"
          bg-color="white"
          @keydown.enter.prevent="setCurrentPokemon"
          outlined
          v-model="current_id"
          placeholder="Pesquisar o pokemon (digite o nome ou id)"
        >
          <template v-slot:after>
            <q-btn
              label="Procurar"
              @click="setCurrentPokemon"
              class="full-height full-width text-black bg-secondary"
            />
          </template>
        </q-input>
      </div>
    </div>

    <div class="col-12 pokemon__text text-center">
      Esta aplicação utiliza a api
      <a href="https://pokeapi.co/" target="_blank">https://pokeapi.co/</a>
    </div>
    <div class="container q-pa-lg">
      <q-dialog
        class="text-white no-scroll q-pa-none no-scroll"
        v-model="openModal"
      >
        <div v-if="currentPokemon_url" class="pokemon__search-result q-pa-sm">
          <div class="row flex-center">
            <div class="text-h6 q-pl-lg">Pesquisa: {{ current_id }}</div>
            <q-space />
            <q-btn icon="close" flat round dense v-close-popup />
          </div>
          <div class="row flex-center">
            <div class="col-md-4 col-lg-4 col-12 q-px-lg q-py-sm item__poke">
              <Item :url="currentPokemon_url" />
            </div>
          </div>
        </div>
      </q-dialog>
      <div class="row flex-center">
        <div
          class="col-md-4 col-lg-4 col-12 q-px-lg q-py-sm item__poke"
          v-for="(pokemon, ikey) in pokemons"
          :key="ikey"
        >
          <Item :url="pokemon.url" />
        </div>
        <div class="col-12 col-md-12 q-pa-md text-center">
          <q-btn
            color="primary"
            label="Carregar mais.."
            class="col-4"
            @click="getAPI()"
          />
        </div>
      </div>
    </div>
    <q-page-scroller
      position="bottom-right"
      :scroll-offset="150"
      :offset="[18, 18]"
      :duration="800"
    >
      <q-btn fab icon="keyboard_arrow_up" color="primary" />
    </q-page-scroller>
  </q-page>
</template>

<script>
import Header from 'src/components/Parts/Header.vue'
import Item from 'src/components/pokemons/Item.vue'

import api from '../services/api'
export default {
  name: 'PokemonPage',
  components: { Header, Item },
  data: () => ({
    currentPokemon_url: '',
    current_id: '',
    openModal: false,
    pokemons: [],
    pokemonsList: [],
    nextUrl: '/pokemon/'
  }),

  created () {},
  async mounted () {
    await this.getAPI()
  },
  methods: {
    triggerPositive () {
      this.$q.notify({
        type: 'positive',
        position: 'top',
        message: `Pokemon encontrado.`
      })
    },

    triggerNegative () {
      this.$q.notify({
        type: 'negative',
        position: 'top',
        message: `Ops, parece que este não existe..`
      })
    },
    showLoading () {
      this.$q.loading.show()
    },
    hideLoading () {
      this.$q.loading.hide()
    },
    setCurrentPokemon () {
      this.currentPokemon_url =
        'https://pokeapi.co/api/v2/pokemon/' + this.current_id.toLowerCase()
      if (this.currentPokemon_url) this.openModal = true
    },

    goBack () {
      this.currentPokemon.id = this.currentPokemon.id - 1
      this.getAPI(this.currentPokemon.id)
    },
    goNext () {
      this.currentPokemon.id = this.currentPokemon.id + 1
      this.getAPI(this.currentPokemon.id)
    },
    async getAPI () {
      this.showLoading()
      await api.get(this.nextUrl).then(res => {
        this.nextUrl = res.data.next
        this.pokemons.push(...res.data.results)
        this.hideLoading()
      })
    }
  }
}
</script>
<style scoped>
.pokemon__search-result {
  background-color: #afafafe3;
}
.item__poke {
  width: 300px;
}
.pokemon__text {
  background-color: #17244c;
  color: white;
  font-size: 10px;
}
.pokemon__text a {
  color: white;
}
.poke__page {
  background-color: #000 !important;
  background-image: url('/images/bg.jpg');
  background-repeat: repeat;
  background-attachment: fixed;
}
</style>
