<template>
  <q-dialog
    @hide="handleCloseDialog"
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
                <img
                  style="width: 90%"
                  v-if="sprintes.front_default"
                  :src="sprintes.front_default"
                />
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
                  <span class="mdi mdi-ruler"></span>
                  Altura: {{ currentPokemon.height }} m
                </span>
              </div>
              <div class="col-12 q-mb-sm">
                <span class="pokemon__types-item text-capitalize">
                  <span class="mdi mdi-weight"></span>
                  Peso: {{ currentPokemon.weight }} kg
                </span>
              </div>

              <div class="col-12 q-mb-sm">
                <span class="pokemon__types-item text-capitalize">
                  <span class="mdi mdi-speedometer"></span>
                  Velocidade: {{ currentPokemon.speed }} Km/h
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
import { ref, watch, onMounted, computed } from 'vue'
import { useQuasar } from 'quasar'

export default {
  props: {
    url: {
      type: String,
      default: ''
    },
    openModal: { type: Boolean, default: false }
  },

  setup (props, { emit }) {
    const $q = useQuasar()
    const openDialog = ref(false)
    const currentPokemon = ref({
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
    })
    const pokemontype = ref(pokemontypes)

    const pokemonTypesAssets = computed(() => {
      let pokemonType =
        pokemontype.value[currentPokemon.value.types[0].type.name]
      let background_img =
        pokemonType.bg || 'images/backgrounds_pokemons/fundo-poke.jpg'
      return { background_img }
    })

    const getTypesForModal = type => {
      let pokemonType = pokemontype.value[type] || pokemontype.value['normal']
      return pokemonType
    }

    const getPokeByURL = async () => {
      await api
        .get(props.url)
        .then(async response => {
          currentPokemon.value = {
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
            galery: response.data.sprites.other
              ? Object.values(response.data.sprites.other).filter(
                  item => item.front_default
                )
              : [],
            species_url: response.data.species.url
          }
          await getPokeSpecie(currentPokemon.value.species_url)
          openDialog.value = true
        })
        .catch(() => {
          handleCloseDialog()
          $q.notify({
            type: 'negative',
            position: 'bottom',
            message: `Ops, parece que este não existe..`
          })
        })
    }

    const getPokeSpecie = async url => {
      await api.get(url).then(response => {
        currentPokemon.value.egg_groups = response.data.egg_groups
      })
    }

    watch(
      () => props.url,
      newVal => {
        getPokeByURL()
      },
      { immediate: true, deep: true }
    )
    watch(
      () => props.openModal,
      newVal => {
        //openDialog.value = newVal
      },
      { immediate: true, deep: true }
    )
    const handleCloseDialog = () => {
      emit('closeModal', false)
      openDialog.value = false
    }

    return {
      openDialog,
      currentPokemon,
      pokemontypes,
      pokemontype,
      pokemonTypesAssets,
      getTypesForModal,
      getPokeByURL,
      getPokeSpecie,
      handleCloseDialog
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
