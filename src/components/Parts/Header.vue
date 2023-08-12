<template>
  <q-toolbar class="bg-black text-white">
    <q-toolbar-title class="flex items-center">
      <img src="/images/logo.png" class="pokemon_logotipo" alt="pokemon logo" />
    </q-toolbar-title>
    <q-btn
      icon="search"
      v-if="!is_show_search"
      @click="showSearch"
      class="q-mr-xs"
      color="grey-9"
    />

    <PokemonSearch v-if="is_show_search" @closeSearch="showSearch" />

    <q-btn
      icon="home"
      class="q-mr-xs"
      color="grey-10"
      to="/home"
      label="Inicial"
    />
    <q-btn color="grey-10" icon="gamepad" label="Game" to="/game" />
  </q-toolbar>
</template>

<script>
import PokemonSearch from 'src/components/Pokemons/PokemonSearch.vue'

export default {
  components: { PokemonSearch },
  name: 'Header',
  data: () => ({
    is_show_search: false,
    current_id: '',
    openModal: false,
    pokemons: [],
    pokemonsList: [],
    nextUrl: '/pokemon/'
  }),
  methods: {
    showSearch () {
      this.is_show_search = !this.is_show_search
    }
  }
}
</script>
<style scoped>
.pokemon_card-image {
  height: 250px;
}
.pokemon_logotipo {
  width: 100px;
}
.home-title {
  font-size: 2em;
  line-height: 3rem;
}

.pokemon__text {
  background-color: #17244c;
  color: white;
  font-size: 10px;
}
.pokemon__text a {
  color: white;
}
</style>
