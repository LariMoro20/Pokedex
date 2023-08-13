<template>
  <div id="q-app">
    <Header />
    <router-view />
  </div>
</template>
<script>
import Header from 'src/components/Parts/Header.vue'

export default {
  name: 'App',
  components: { Header }
}
</script>
