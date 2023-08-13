<template>
  <MenuMobile v-if="isMobile" />
  <MainMenu v-else />
</template>

<script>
import MainMenu from 'src/components/Menu/MainMenu.vue'
import MenuMobile from 'src/components/Menu/MenuMobile.vue'

import { useQuasar, Platform } from 'quasar'
import { defineComponent, ref, computed } from 'vue'
export default defineComponent({
  components: { MainMenu, MenuMobile },
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
