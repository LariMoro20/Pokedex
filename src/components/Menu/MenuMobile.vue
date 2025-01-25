<template>
  <div>
    <q-header>
      <q-toolbar class="bg-white text-white">
        <q-btn
          flat
          dense
          round
          color="black"
          icon="menu"
          aria-label="Menu"
          @click="leftDrawerOpen = !leftDrawerOpen"
          v-if="!is_show_search"
        />
        <q-toolbar-title class="flex items-center" v-if="!is_show_search">
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
          color="primary"
        >
          <q-tooltip anchor="bottom middle" self="center middle">
            Pesquisar Pokemon
          </q-tooltip>
        </q-btn>
        <div class="col-md-5 col-12 q-mr-sm" v-if="is_show_search">
          <PokemonSearch @closeSearch="showSearch" />
        </div>
      </q-toolbar>
    </q-header>
    <q-drawer v-model="leftDrawerOpen" bordered class="bg-primary">
      <q-list class="">
        <q-item
          color="red-10"
          clickable
          to="/"
          v-ripple
          class="text-white pokemon_menu-item"
        >
          <q-item-section side>
            <q-icon name="home" color="white" />
          </q-item-section>
          <q-item-section>
            <q-item-label>Inicial</q-item-label>
          </q-item-section>
        </q-item>
        <q-item
          color="red-10"
          clickable
          to="/game"
          v-ripple
          class="text-white pokemon_menu-item"
        >
          <q-item-section side>
            <q-icon name="gamepad" color="white" />
          </q-item-section>
          <q-item-section>
            <q-item-label>Game</q-item-label>
          </q-item-section>
        </q-item>

        <q-item
          color="red-10"
          clickable
          v-ripple
          to="/about"
          class="text-white pokemon_menu-item"
        >
          <q-item-section side>
            <q-icon name="info" color="white" />
          </q-item-section>
          <q-item-section>
            <q-item-label>Sobre</q-item-label>
          </q-item-section>
        </q-item>
      </q-list>
    </q-drawer>
  </div>
</template>
<script>
import PokemonSearch from 'src/components/Pokemons/PokemonSearch.vue'
import { useQuasar, Platform } from 'quasar'
import { defineComponent, ref, computed } from 'vue'
export default defineComponent({
  components: { PokemonSearch },
  name: 'MenuMobile',
  setup () {
    const year = new Date().getFullYear()
    const leftDrawerOpen = ref(false)
    const is_show_search = ref(false)
    const $q = useQuasar()

    const showSearch = () => {
      is_show_search.value = !is_show_search.value
    }

    return {
      year,
      leftDrawerOpen,
      is_show_search,
      isMobile: computed(() => Platform.is.mobile),
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
