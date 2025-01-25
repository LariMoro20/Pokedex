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
        color="primary"
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
  <PokemonItemModal
    :url="currentPokemon_url"
    v-if="currentPokemon_url"
    :openModal="openModal"
    :ref="currentPokemon_url"
    @closeModal="openModal = false"
  />
</template>

<script>
import { ref } from 'vue'
import PokemonItemModal from 'src/components/Pokemons/PokemonItemModal.vue'

export default {
  name: 'PokemonSearch',
  components: { PokemonItemModal },
  emits: ['closeSearch'],

  setup (props, { emit }) {
    const currentPokemon_url = ref('')
    const current_id = ref('')
    const openModal = ref(false)

    const setCurrentPokemon = () => {
      if (current_id.value !== '') {
        currentPokemon_url.value =
          'https://pokeapi.co/api/v2/pokemon/' + current_id.value.toLowerCase()
        if (currentPokemon_url.value) openModal.value = true
      }
    }

    const cancelSearch = () => {
      emit('closeSearch', current_id.value)
    }

    return {
      currentPokemon_url,
      current_id,
      openModal,
      setCurrentPokemon,
      cancelSearch
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
