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
        color="grey-9"
        :disable="current_id === ''"
        @click="setCurrentPokemon"
      >
        <q-tooltip anchor="bottom middle" self="center middle">
          Pesquisar
        </q-tooltip>
      </q-btn>
      <q-btn icon="close" color="grey-9" @click="cancelSearch">
        <q-tooltip anchor="bottom middle" self="center middle">
          Cancelar
        </q-tooltip>
      </q-btn>
    </template>
  </q-input>

  <q-dialog
    class="text-white no-scroll q-pa-none no-scroll"
    v-model="openModal"
    data-cy="pokemon_search_modal"
  >
    <div v-if="currentPokemon_url" class="pokemon__search-result q-pa-sm">
      <div class="row flex-center">
        <div class="text-h6 q-pl-lg">Pokemon encontrado</div>
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
</template>

<script>
import Item from 'src/components/Pokemons/PokemonItem.vue'

export default {
  name: 'PokemonSearch',
  components: { Item },
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
