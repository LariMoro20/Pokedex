<template>
  <q-page class="poke__page flex">
    <div class="container row flex justify-center q-pa-md">
      <div
        class="col-12 col-md-12 col-lg-12 text-center flex-center text-white"
      >
        <h1>Pokedéx da Lari</h1>
      </div>

      <div class="row col-12 col-md-8 col-lg-8 flex-center" v-if="!has_error">
        <div
          class="col-6 col-md-4 col-lg-3 q-px-sm q-py-sm item__poke"
          v-for="(pokemon, ikey) in pokemons"
          :key="ikey"
          data-cy="pokemons_list"
        >
          <Item :url="pokemon.url" />
        </div>
        <div
          class="col-12 col-md-12 q-pa-md text-center"
          v-if="pokemons.length"
        >
          <q-btn
            color="primary"
            label="Carregar mais.."
            class="col-4"
            @click="getAPI()"
          />
        </div>
      </div>
      <div class="row flex-center column text-center" v-if="has_error">
        <img class="pokemon__notfound" src="images/pokemons/not_found.png" />
        <div class="text-white text-h5">
          Poxa, a pokédex parece estar com problemas no momento. <br />
          Que tal voltar mais tarde?
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
import Item from 'src/components/Pokemons/PokemonItem.vue'

import api from '../services/api'
export default {
  name: 'PokemonPage',
  components: { Item },
  data: () => ({
    pokemons: [],
    is_loading: false,
    has_error: false,
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
      this.$q.loading.show({
        message: 'Carregando pokédex..'
      })
    },
    hideLoading () {
      this.$q.loading.hide()
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
      this.is_loading = true
      await api
        .get(this.nextUrl)
        .then(res => {
          this.nextUrl = res.data.next
          this.pokemons.push(...res.data.results)
          this.hideLoading()
          this.is_loading = false
          this.has_error = false
        })
        .catch(e => {
          this.has_error = true
          this.is_loading = false
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
}
.pokemon__notfound {
  width: 50%;
}
</style>
