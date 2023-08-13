<template>
  <q-toolbar class="bg-black text-white" v-if="!isMobile">
    <q-toolbar-title class="flex items-center">
      <img src="/images/logo.png" class="pokemon_logotipo" alt="pokemon logo" />
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
    <q-btn icon="home" class="q-mr-xs" color="grey-10" to="/" label="Inicial" />
    <q-btn color="grey-10" icon="gamepad" label="Game" to="/game" />
  </q-toolbar>

  <q-toolbar class="bg-black text-white" v-else>
    <q-toolbar-title class="flex items-center">
      <img src="/images/logo.png" class="pokemon_logotipo" alt="pokemon logo" />
    </q-toolbar-title>
    <div class="row">
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
      <PokemonSearch v-if="is_show_search" @closeSearch="showSearch" />
    </div>
    <q-btn
      icon="home"
      class="q-mr-xs"
      color="grey-10"
      to="/"
      v-if="!is_show_search"
    />
    <q-btn color="grey-10" icon="gamepad" to="/game" v-if="!is_show_search" />
  </q-toolbar>
</template>

<script>
import PokemonSearch from 'src/components/Pokemons/PokemonSearch.vue'
import { useQuasar, Platform } from 'quasar'
import { defineComponent, ref, computed } from 'vue'
export default defineComponent({
  components: { PokemonSearch },
  name: 'Header',
  setup () {
    const is_show_search = ref(false)
    const $q = useQuasar()

    const showSearch = () => {
      is_show_search.value = !is_show_search.value
    }

    return {
      is_show_search,
      isMobile: computed(() => Platform.is.mobile),
      showSearch
    }
  }
})
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
