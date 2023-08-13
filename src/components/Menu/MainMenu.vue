<template>
  <div>
    <q-header>
      <q-toolbar class="bg-black text-white">
        <q-toolbar-title class="flex items-center">
          <img
            src="/images/logo.png"
            class="pokemon_logotipo"
            alt="pokemon logo"
          />
        </q-toolbar-title>
        <q-btn
          icon="search"
          v-if="!is_show_search"
          @click="showSearch"
          class="q-mr-xs"
          color="grey-9"
        >
          <q-tooltip anchor="bottom middle" self="center middle">
            Pesquisar Pokemon
          </q-tooltip>
        </q-btn>
        <div class="col-md-5 col-12 q-mr-sm" v-if="is_show_search">
          <PokemonSearch @closeSearch="showSearch" />
        </div>
        <q-btn
          icon="home"
          class="q-mr-xs"
          color="grey-10"
          to="/"
          label="Inicial"
        />
        <q-btn color="grey-10" icon="gamepad" label="Game" to="/game" />
        <q-btn color="grey-10" icon="info" label="Sobre" to="/about" />
      </q-toolbar>
    </q-header>
  </div>
</template>
<script>
import PokemonSearch from 'src/components/Pokemons/PokemonSearch.vue'
import { defineComponent, ref } from 'vue'
export default defineComponent({
  components: { PokemonSearch },
  name: 'MainMenu',
  setup () {
    const is_show_search = ref(false)

    const showSearch = () => {
      is_show_search.value = !is_show_search.value
    }

    return {
      is_show_search,
      showSearch
    }
  }
})
</script>

<style scoped>
.pokemon_logotipo {
  width: 150px;
}

.pokemon_menu-item {
  color: black;
  text-decoration: none;
  font-weight: 600;
  font-size: 1.2em;
  font-family: 'Odibee Sans', cursive;
}
.pokemon_logotipo {
  width: 100px;
}
a {
  text-decoration: none;
}
</style>
