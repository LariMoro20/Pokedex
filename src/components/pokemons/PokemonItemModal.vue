<template>
  <q-dialog
    class="text-white no-scroll q-pa-none"
    v-model="openDialog"
    data-cy="pokemon_details_modal"
    :style="{
      backdropFilter: 'blur(4px) saturate(150%) brightness(40%)'
    }"
  >
    <q-card
      class="bg-white no-scroll"
      :style="[$q.screen.gt.sm ? 'max-width: 70vw' : 'max-width: 100vw']"
    >
      <q-card-section
        class="q-pa-none scroll full-height flex items-center justify-center"
        :style="{
          backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url(${pokemonTypesAssets.background_img})`,
          backgroundRepeat: 'no-repeat',
          backgroundSize: 'cover',
          backgroundPosition: 'center'
        }"
      >
        <div class="full-width full-heigth row">
          <div class="col-md-8 row flex items-center q-pa-lg">
            <div
              class="col-md-12 full-width text-right text-h5"
              v-if="!$q.screen.gt.sm"
            >
              <q-btn
                icon="close"
                class="text-white"
                flat
                round
                dense
                v-close-popup
              />
            </div>

            <div class="col-md-12 text-center full-width">
              <div class="pokemon__modal-image">
                <img
                  class="pokemon__modal-image-img q-pa-sm"
                  :src="currentPokemon.image"
                />
              </div>
            </div>
            <div class="col-12 row flex justify-center" v-if="$q.screen.gt.sm">
              <div
                class="col-md-2 q-pa-sm text-black"
                v-for="(sprintes, ikey) in currentPokemon.galery"
                :key="ikey"
              >
                <img style="width: 90%" :src="sprintes.front_default" />
              </div>
            </div>
          </div>
          <div
            :class="[
              'col-md-4 row bg-primary ',
              $q.screen.gt.sm ? 'pokeball-red q-pl-xl' : 'q-pa-xl'
            ]"
          >
            <div class="col-md-12 full-width">
              <div
                class="col-md-12 full-width text-right text-h5"
                v-if="$q.screen.gt.sm"
              >
                <q-btn
                  icon="close"
                  class="text-white"
                  flat
                  round
                  dense
                  v-close-popup
                />
              </div>
              <div
                class="col-md-12 full-width text-center text-h4 text-capitalize"
              >
                #{{ currentPokemon.id }} {{ currentPokemon.name }}
              </div>

              <div class="col-md-12 full-width text-center text-h6">
                HP: {{ currentPokemon.hp }}
              </div>
            </div>
            <div class="col-md-12 full-width row">
              <div class="col-12">Habilidades</div>
              <div
                class="col-6 q-mb-sm"
                v-for="(hability, ikey) in currentPokemon.abilities"
                :key="ikey"
              >
                <span class="pokemon__types-item text-capitalize">
                  {{ hability.ability.name }}
                </span>
              </div>
            </div>
            <div class="col-md-12 full-width row">
              <div class="col-12">Grupo de ovos</div>
              <div
                class="col-6 q-mb-sm"
                v-for="(egg, ikey) in currentPokemon.egg_groups"
                :key="ikey"
              >
                <span class="pokemon__types-item text-capitalize">
                  {{ egg.name }}
                </span>
              </div>
            </div>
            <div class="col-md-12 full-width row">
              <div class="col-12">Dados</div>

              <div class="col-12 q-mb-sm">
                <span class="pokemon__types-item text-capitalize">
                  Altura: {{ currentPokemon.height }} m
                </span>
              </div>
              <div class="col-12 q-mb-sm">
                <span class="pokemon__types-item text-capitalize">
                  Peso: {{ currentPokemon.weight }} kg
                </span>
              </div>

              <div class="col-12 q-mb-sm">
                <span class="pokemon__types-item text-capitalize">
                  Velocidade: {{ currentPokemon.speed }}
                </span>
              </div>
              <div class="col-12 q-mb-sm">
                Energias:

                <div class="text-capitalize flex flex-center">
                  <span
                    class="pokemon__modal-energy q-pr-sm"
                    v-for="(type, ikey) in currentPokemon.types"
                    :key="ikey"
                  >
                    <img :src="getTypesForModal(type.type.name).energy" />
                    <q-tooltip
                      anchor="bottom middle"
                      self="center middle"
                      class="text-capitalize"
                    >
                      {{ type.type.name }}
                    </q-tooltip>
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </q-card-section>
    </q-card>
  </q-dialog>
</template>

<script>
import api from '../../services/api'
import { pokemontypes } from 'src/constants/pokemonTypes'

export default {
  props: {
    url: {
      type: String,
      default: ''
    }
  },
  computed: {
    pokemonTypesAssets () {
      let pokemonType =
        this.pokemontypes[this.currentPokemon.types[0].type.name]
      let background_img = pokemonType.bg
        ? pokemonType.bg
        : 'images/backgrounds_pokemons/fundo-poke.jpg'
      return {
        background_img: background_img
      }
    }
  },
  data: () => ({
    openDialog: false,
    currentPokemon: {
      id: '',
      name: '',
      types: [],
      abilities: [],
      height: '',
      weight: '',
      hp: '',
      speed: '',
      galery: [],
      image: ''
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
    getTypesForModal (type) {
      let pokemonType = this.pokemontypes[type] || this.pokemontypes['normal']
      return pokemonType
    },

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
          this.currentPokemon = {
            name: response.data.name,
            types: response.data.types,
            id: response.data.id,
            abilities: response.data.abilities,
            height: response.data.height / 10,
            weight: response.data.weight / 10,
            hp: response.data.stats[0].base_stat,
            speed: response.data.stats[5].base_stat,
            image:
              response.data.sprites.other['official-artwork'].front_default ||
              '/notfound.png',
            galery: response.data.sprites.other,
            species_url: response.data.species.url
          }
          await this.getPokeSpecie(this.currentPokemon.species_url)
          this.openDialog = true
        })
        .catch(() => {
          this.$q.notify({
            type: 'negative',
            position: 'bottom',
            message: `Ops, parece que este não existe..`
          })
        })
    },
    async getPokeSpecie (url) {
      await api.get(url).then(response => {
        this.currentPokemon.egg_groups = response.data.egg_groups
      })
    }
  }
}
</script>

<style scoped>
.pokemon__types-item {
  background-color: white;
  font-size: 0.7rem;
  color: black;
  border-radius: 10px;
  padding: 5px;
  width: 90%;
  display: block;
}

.pokemon__modal-image-img {
  content: '';
  background: url('/pokeball.png') 50% no-repeat;
  background-size: auto;
  background-size: auto;
  background-size: cover;
  top: 50%;
  left: 50%;
  width: 40%;
  max-width: 100%;
}

.pokemon__modal-energy img {
  width: 30px;
  border-radius: 100px;
}

.pokeball-red {
  clip-path: polygon(11% 0, 100% 0, 100% 100%, 0 100%);
}
</style>
