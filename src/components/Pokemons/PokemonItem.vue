<template>
  <q-card
    class="my-card q-pa-sm q-my-md"
    v-if="currentPokemon.types && currentPokemon.image"
  >
    <div class="poke-card" :style="'background-color:' + getColor.background">
      <div
        class="col-md-12 pokemon__card-number flex justify-between items-center"
      >
        <div
          class="text-h6 text-capitalize q-pa-xs pokemon__card-pokename"
          :style="'color:' + getColor.color"
        >
          {{ currentPokemon.name }}
        </div>
        <small class="pokemon__card-HP" :style="'color:' + getColor.color">
          HP: {{ currentPokemon.hp }}</small
        >
      </div>
      <div
        class="text-center pokemon__card-image q-px-lg flex items-center justify-center"
        :style="
          'background: url(' + getColor.background_img + ') 50% no-repeat;'
        "
      >
        <div>
          <img class="pokemon__card-image-img" :src="currentPokemon.image" />
        </div>
      </div>
      <div
        class="pokemon__pokedex flex items-center justify-center"
        :style="'color:' + getColor.color"
      >
        Número na pokedex: {{ currentPokemon.id }}
      </div>
      <div class="pokemon__skills items-center justify-center">
        <div class="pokemon__skills-item" :style="'color:' + getColor.color">
          <b> Ataque:</b> {{ currentPokemon.attack }}<br />
          <b> Defesa:</b> {{ currentPokemon.defense }}
        </div>
        <div class="pokemon__skills-item" :style="'color:' + getColor.color">
          <b> Ataque V:</b> {{ currentPokemon.special_attack }}<br />
          <b> Defesa V:</b>
          {{ currentPokemon.special_defense }}
        </div>
      </div>

      <q-card-section class="text-center">
        <div class="col-md-12 items-center justify-center flex">
          <q-btn
            label="Detalhes"
            data-cy="pokemon_details"
            color="primary"
            @click="handleOpenDialog"
          />
        </div>

        <q-dialog
          class="text-white no-scroll q-pa-none no-scroll"
          v-model="openDialog"
          data-cy="pokemon_details_modal"
        >
          <q-card class="bg-grey-10 no-scroll text-white full-height">
            <q-card-section class="text-center q-pa-sm">
              <div class="text-h6 text-capitalize">
                #{{ currentPokemon.id }} {{ currentPokemon.name }}
              </div>
            </q-card-section>

            <q-card-section
              class="q-pt-none scroll full-height flex items-center justify-center"
              style="max-height: 72vh"
            >
              <div class="itemtrst full-width">
                <div class="row">
                  <div class="col-md-12 text-center full-width">
                    <div class="pokemon__modal-image">
                      <img
                        class="pokemon__modal-image-img q-pa-sm"
                        :src="currentPokemon.image"
                      />
                    </div>
                  </div>
                </div>
                <div class="row">
                  <div class="col-md-12 full-width">
                    <div class="col-md-12 full-width text-center text-h6">
                      HP: {{ currentPokemon.hp }}
                    </div>

                    <div
                      class="row flex q-pa-md bg-black text-white flex-center justify-around"
                    >
                      <div>
                        <span
                          class="pokemon__types-item pokemon__types-item-type bg-primary text-white text-capitalize"
                          v-for="(type, ikey) in currentPokemon.types"
                          :key="ikey"
                        >
                          {{ type.type.name }}
                        </span>
                      </div>
                    </div>
                  </div>
                  <div class="col-md-12 full-width">
                    <div
                      class="row flex pokemon__modal__skills q-pa-sm bg-black text-white flex-center justify-around"
                    >
                      <div
                        class="col-6 text-center pokemon__modal__skills-item text-capitalize"
                      >
                        Habilidade:<br />
                        <span
                          class="pokemon__types-item text-capitalize"
                          v-for="(hability, ikey) in currentPokemon.abilities"
                          :key="ikey"
                        >
                          {{ hability.ability.name }}
                        </span>
                      </div>
                      <div
                        class="col-6 text-center pokemon__modal__skills-item text-capitalize"
                      >
                        Grupo de ovos:<br />
                        <span
                          class="pokemon__types-item text-capitalize"
                          v-for="(egg, ikey) in currentPokemon.egg_groups"
                          :key="ikey"
                        >
                          {{ egg.name }}
                        </span>
                      </div>
                    </div>

                    <div
                      class="row flex pokemon__modal__skills q-pa-sm bg-black text-white flex-center justify-around"
                    >
                      <div class="pokemon__modal__skills-item">
                        Altura: {{ currentPokemon.height }} m
                      </div>
                      <div class="pokemon__modal__skills-item">
                        Peso: {{ currentPokemon.weight }} kg
                      </div>
                      <div class="pokemon__modal__skills-item">
                        Forma: {{ currentPokemon.shape.name }}
                      </div>
                      <div class="pokemon__modal__skills-item">
                        Velocidade: {{ currentPokemon.speed }}
                      </div>
                    </div>
                    <div
                      class="row flex pokemon__modal__skills q-pa-sm bg-black text-white flex-center justify-between"
                    >
                      <div class="pokemon__modal__skills-item">
                        Ataque: {{ currentPokemon.attack }}
                      </div>
                      <div class="pokemon__modal__skills-item">
                        Defesa: {{ currentPokemon.defense }}
                      </div>
                      <div class="pokemon__modal__skills-item">
                        Ataque esp.: {{ currentPokemon.special_attack }}
                      </div>
                      <div class="pokemon__modal__skills-item">
                        Defesa esp.: {{ currentPokemon.special_defense }}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </q-card-section>

            <q-card-actions
              align="right"
              class="bg-grey-10 text-white text-center flex justify-center flex-center q-pt-md q-mb-lg"
            >
              <q-btn
                size="md"
                label="Fechar"
                class="bg-red-10 col-4"
                v-close-popup
              />
            </q-card-actions>
          </q-card>
        </q-dialog>
      </q-card-section>
    </div>
  </q-card>
  <LoadItem v-else-if="!error_poke" />

  <q-card class="my-card" v-else>
    <q-img src="/not_found_pikachu.png">
      <div class="absolute-bottom text-subtitle2 text-center">
        Pokemon não encontrado..
      </div>
    </q-img>
  </q-card>
</template>

<script>
import api from '../../services/api'
import LoadItem from 'src/components/Pokemons/PokemonLoad.vue'
import { pokemontypes } from 'src/constants/pokemonTypes'

export default {
  props: {
    url: {
      type: String,
      default: ''
    }
  },
  components: { LoadItem },
  computed: {
    getColor () {
      let pokemonType =
        this.pokemontypes[this.currentPokemon.types[0].type.name]
      let bgcolor = pokemonType.color
      let color = pokemonType.textColor
      let background_img = pokemonType.bg
        ? pokemonType.bg
        : 'images/backgrounds_pokemons/fundo-poke.jpg'
      return {
        background: bgcolor,
        color: color,
        background_img: background_img
      }
    }
  },
  data: () => ({
    openDialog: false,
    maximizedToggle: true,
    error_poke: false,
    currentPokemon: {
      id: '',
      name: '',
      shape: '',
      id: '',
      type: ''
    },
    pokemontypes
  }),
  created () {
    this.getPokeByURL()
  },
  watch: {
    url: function () {
      this.getPokeByURL()
    }
  },
  methods: {
    async handleOpenDialog () {
      this.$q.loading.show()
      this.currentPokemon.species_url
        ? (await this.getPokeSpecie(this.currentPokemon.species_url),
          (this.openDialog = !this.openDialog))
        : ''
      this.$q.loading.hide()
    },

    async getPokeByURL () {
      await api
        .get(this.url)
        .then(async response => {
          this.currentPokemon.name = response.data.name
          this.currentPokemon.types = response.data.types
          this.currentPokemon.id = response.data.id
          this.currentPokemon.abilities = response.data.abilities
          this.currentPokemon.height = response.data.height / 10
          this.currentPokemon.weight = response.data.weight / 10
          this.currentPokemon.base_experience = response.data.base_experience
          this.currentPokemon.image =
            response.data.sprites.other['official-artwork'].front_default !=
            null
              ? response.data.sprites.other['official-artwork'].front_default
              : '/notfound.png'
          //Special stats
          this.currentPokemon.hp = response.data.stats[0].base_stat
          this.currentPokemon.attack = response.data.stats[1].base_stat
          this.currentPokemon.defense = response.data.stats[2].base_stat
          this.currentPokemon.special_attack = response.data.stats[3].base_stat
          this.currentPokemon.special_defense = response.data.stats[4].base_stat
          this.currentPokemon.speed = response.data.stats[5].base_stat
          this.currentPokemon.species_url = response.data.species.url

          await this.getPokeSpecie(this.currentPokemon.species_url)
        })
        .catch(() => {
          this.$q.notify({
            type: 'negative',
            position: 'bottom',
            message: `Ops, parece que este não existe..`
          })
          this.error_poke = true
        })
    },
    async getPokeSpecie (url) {
      await api.get(url).then(response => {
        this.currentPokemon.egg_groups = response.data.egg_groups
        this.currentPokemon.shape = response.data.shape || ''
        this.currentPokemon.flavor_text_entries =
          response.data.flavor_text_entries
      })
    }
  }
}
</script>

<style scoped>
.my-card {
  background-color: #e2e2e2;
}
.poke-card {
  background-color: #fff;
  min-height: 350px;
}
.pokemon__card-image-img {
  height: 143px;
  max-width: 100%;
  margin-top: 15px;
  transform: scale(1);
}
.pokemon__card-image-img:hover {
  transform: scale(1.1);
}
.pokemon__card-name {
  padding: 10px;
  padding-top: 10px;
  padding-right: 10px;
  padding-bottom: 10px;
  border-radius: 0 13px 35px 8px;
  font-weight: bold;
  color: black;
  line-height: normal;
  font-size: 1.3em;
  border-right: 6px groove;
  padding-right: 71px;
  padding-bottom: 0px;
  padding-top: 7px;
}
.pokemon__card-pokename {
  padding: 0;
}
.pokemon__modal-image-img {
  content: '';
  background: url('/pokeball.png') 50% no-repeat;
  background-size: auto;
  background-size: auto;
  background-size: cover;
  top: 50%;
  left: 50%;
  width: 180px;
  height: 180px;
  max-width: 100%;
}
.pokemon__modal-image::before {
  content: '';
}
.pokemon__types-item {
  background-color: white;
  font-size: 0.7rem;
  color: black;
  padding: 5px;
  margin: 5px;
  border-radius: 10px;
}
.pokemon__types-item-type {
  font-size: 0.7rem;
  padding: 10px;
  margin: 10px;
  color: black;
}
.pokemon__card-image {
  position: inherit;
  width: 94%;
  height: 163px;
  opacity: 1;
  max-width: 100%;
  animation: pulse 1s infinite;
  animation-name: pulse;
  animation-direction: normal;
  animation-direction: alternate;
  border-radius: 5px;
  border: 3px groove;
  margin: auto;
  border: 3px groove;
}
.pokemon__skills {
  z-index: 1;
  display: flex;
  text-align: initial;
  font-size: 12px;
  margin-top: 5px;
}

.pokemon__pokedex {
  font-size: 10px;
}

.pokemon__skills-item {
  padding: 5px;
}
.pokemon__modal__skills {
  border-top: 2px solid #4713d6;
  margin-bottom: 5px;
  border-bottom: 2px solid #4713d6;
}
.pokemon__modal__skills-item {
  padding: 7px;
  font-size: 1rem;
}
.pokemon__card-number {
  padding-left: 10px;
  padding-right: 10px;
  color: white;
}

@keyframes pulse {
  0% {
    filter: brightness(100%);
  }
  100% {
    filter: brightness(125%);
  }
}
</style>
