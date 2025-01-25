<template>
  <q-input
    dense
    flat
    color="white"
    label-color="black"
    data-cy="pokemon_search_input"
    class="q-pa-none"
    bg-color="white"
    @keydown.enter.prevent="setCurrentPokemon"
    outlined
    v-model="current_id"
    placeholder="Digite o nome (em inglês) ou o número na pokédex"
  >
    <template v-slot:after>
      <q-btn
        icon="search"
        data-cy="pokemon_search_button"
        color="primary
"
        :disable="current_id === ''"
        @click="setCurrentPokemon"
      >
        <q-tooltip anchor="bottom middle" self="center middle">
          Pesquisar
        </q-tooltip>
      </q-btn>
      <q-btn flat icon="close" color="grey-9" @click="cancelSearch">
        <q-tooltip anchor="bottom middle" self="center middle">
          Cancelar
        </q-tooltip>
      </q-btn>
    </template>
  </q-input>
  <PokemonItemModal :url="currentPokemon_url" v-if="currentPokemon_url" />
</template>

<script>
import PokemonItemModal from 'src/components/Pokemons/PokemonItemModal.vue'

export default {
  name: 'PokemonSearch',
  components: { PokemonItemModal },
  emits: ['closeSearch'],
  data: () => ({
    currentPokemon_url: '',
    current_id: '',
    openModal: false,
    pokemons: [],
    pokemonsList: [],
    nextUrl: '/pokemon/'
  }),

  created () {},

  methods: {
    setCurrentPokemon () {
      if (this.current_id != '') {
        this.currentPokemon_url =
          'https://pokeapi.co/api/v2/pokemon/' + this.current_id.toLowerCase()
        if (this.currentPokemon_url) this.openModal = true
      }
    },
    cancelSearch () {
      this.$emit('closeSearch', this.editor)
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
</style>
