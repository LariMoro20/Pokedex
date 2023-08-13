<template>
  <q-layout view="lHh Lpr lFf">
    <q-pull-to-refresh @refresh="refresh">
      <Header />
      <q-page-container>
        <router-view />
        <Footer />
      </q-page-container>
    </q-pull-to-refresh>
  </q-layout>
</template>

<script>
//import MainMenu from "src/components/Menu/MainMenu.vue";

import Footer from 'src/components/Parts/Footer.vue'
import Header from 'src/components/Parts/Header.vue'

export default {
  name: 'MainLayout',
  components: {
    Header,
    Footer
  },
  data: () => ({
    year: new Date().getFullYear(),
    leftDrawerOpen: false
  }),
  methods: {
    refresh (done) {
      setTimeout(() => {
        console.log('Refresh..')
        done()
      }, 1000)
    }
  }
}
</script>
<style>
* {
  font-family: 'Inter', sans-serif;
}
</style>
