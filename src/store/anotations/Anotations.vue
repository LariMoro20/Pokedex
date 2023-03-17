<template>
  <q-page class=" flex-center">
    <q-parallax :height="150" :speed="0.5" class="text-center justify-center">
      <template v-slot:media>
        <img
          src="https://cdn.pixabay.com/photo/2017/08/30/01/05/milky-way-2695569_1280.jpg"
        />
      </template>
      <h2 class="header-text">Anotações</h2>
      <br />
    </q-parallax>
    <div class="row">
      <div class="col-12 col-md-8">
        <div class="row">
          <div class="col-12 col-md-12">
            <text-component @newItem="saveAnotation" />
          </div>
          <div class="col-12 col-md-12 q-pa-md">
            <q-list
              bordered
              padding
              class="rounded-borders full-width"
            >
              <q-item-label header>Anotações</q-item-label>

              <q-item v-ripple v-for="(anotation, ikey) in anotations" :key="ikey">
                <q-item-section avatar top>
                  <q-avatar icon="label" color="green" text-color="white" />
                </q-item-section>

                <q-item-section>
                  <q-item-label lines="1" v-html="anotation.text"></q-item-label>
                </q-item-section>

                <q-item-section side>
                  <q-btn round color="primary" icon="delete" @click="removeAnotation(anotation.id)"/>

                </q-item-section>
              </q-item>
            </q-list>
          </div>
        </div>
      </div>
    </div>
  </q-page>
</template>

<script>
import { mapActions, mapState } from "vuex";
import TextComponent from "src/components/Forms/TextComponent.vue";
export default {
  components: {
    TextComponent
  },
  computed: {
    ...mapState("anotations", ["anotations"]),
  },
  name: "PageAnotations",

  mounted() {
    this.actGetAnotations()
  },
  methods: {
    ...mapActions("anotations", ["actGetAnotations", "actSetAnotations","actRemoveAnotations"]),
    removeAnotation(value){
      this.$dialog.confirm('Apagar?','Tem certeza que deseja deletar a anotação?').onOk(async () =>{
        this.actRemoveAnotations(value)
        this.$notify.success("Apagado com sucesso")
      })
      
    },
    saveAnotation(value) {
      this.actSetAnotations(value);
      this.$q.notify({
        message: "Salvo no armazenamento local!",
        color: "green-4",
        textColor: "white",
        icon: "cloud_done"
      });
    }
  }
};
</script>
<style scoped>
.pokemon_card-image {
  height: 250px;
}
.pokemon_logotipo {
  width: 200px;
}
.home-title {
  font-size: 2em;
  line-height: 3rem;
}
.header-text{
    color: white;
}
</style>
