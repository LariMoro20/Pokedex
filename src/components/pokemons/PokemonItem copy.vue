<template>
  <div class="pokemon-card-wrapper">
    <q-card
      class="pokemon-card"
      v-if="currentPokemon.types && currentPokemon.image"
      :class="{ 'pokemon-card--loading': loading }"
    >
      <!-- Card Header -->
      <div
        class="pokemon-card__header"
        :style="{ backgroundColor: pokemonTypesAssets.background }"
      >
        <div class="pokemon-card__header-content">
          <div class="pokemon-card__name-section">
            <h3
              class="pokemon-card__name text-capitalize"
              :style="{ color: pokemonTypesAssets.color }"
            >
              {{ currentPokemon.name }}
            </h3>
            <span
              class="pokemon-card__id"
              :style="{ color: pokemonTypesAssets.color }"
            >
              #{{ String(currentPokemon.id).padStart(3, '0') }}
            </span>
          </div>

          <div class="pokemon-card__stats-section">
            <div
              class="pokemon-card__hp"
              :style="{ color: pokemonTypesAssets.color }"
            >
              <span class="pokemon-card__hp-label">HP</span>
              <span class="pokemon-card__hp-value">{{
                currentPokemon.hp
              }}</span>
            </div>
            <div class="pokemon-card__energy">
              <img
                :src="pokemonTypesAssets.energy"
                :alt="`${currentPokemon.types[0].type.name} energy`"
                class="pokemon-card__energy-icon"
              />
            </div>
          </div>
        </div>
      </div>

      <!-- Card Body -->
      <div
        class="pokemon-card__body"
        :style="{ backgroundColor: pokemonTypesAssets.background }"
      >
        <!-- Pokemon Image -->
        <div class="pokemon-card__image-container">
          <div
            class="pokemon-card__image-background"
            :style="pulseBackgroundStyle"
          ></div>
          <div class="pokemon-card__image-wrapper">
            <img
              :src="currentPokemon.image"
              :alt="currentPokemon.name"
              class="pokemon-card__image"
              @load="onImageLoad"
              @error="onImageError"
            />
          </div>

          <!-- Type badges -->
          <div class="pokemon-card__types">
            <span
              v-for="type in currentPokemon.types"
              :key="type.type.name"
              class="pokemon-card__type-badge text-capitalize"
              :class="`pokemon-card__type-badge--${type.type.name}`"
            >
              {{ type.type.name }}
            </span>
          </div>
        </div>

        <!-- Pokemon Stats -->
        <div
          class="pokemon-card__stats"
          :style="{ color: pokemonTypesAssets.color }"
        >
          <div class="pokemon-card__stats-grid">
            <div class="pokemon-card__stat-item">
              <span class="pokemon-card__stat-label">ATK</span>
              <span class="pokemon-card__stat-value">{{
                currentPokemon.attack
              }}</span>
            </div>
            <div class="pokemon-card__stat-item">
              <span class="pokemon-card__stat-label">DEF</span>
              <span class="pokemon-card__stat-value">{{
                currentPokemon.defense
              }}</span>
            </div>
            <div class="pokemon-card__stat-item">
              <span class="pokemon-card__stat-label">SP.ATK</span>
              <span class="pokemon-card__stat-value">{{
                currentPokemon.special_attack
              }}</span>
            </div>
            <div class="pokemon-card__stat-item">
              <span class="pokemon-card__stat-label">SP.DEF</span>
              <span class="pokemon-card__stat-value">{{
                currentPokemon.special_defense
              }}</span>
            </div>
          </div>
        </div>
      </div>

      <!-- Card Footer -->
      <div class="pokemon-card__footer">
        <q-btn
          class="pokemon-card__details-btn"
          :style="{
            backgroundColor: pokemonTypesAssets.background,
            color: pokemonTypesAssets.color
          }"
          icon="mdi-information-outline"
          label="Ver Detalhes"
          no-caps
          rounded
          @click="handleOpenDialog"
          :loading="dialogLoading"
        />
      </div>

      <!-- Modal/Dialog -->
      <q-dialog
        v-model="openDialog"
        class="pokemon-modal"
        :maximized="$q.screen.lt.md"
        transition-show="slide-up"
        transition-hide="slide-down"
      >
        <q-card class="pokemon-modal__card">
          <!-- Modal Header -->
          <q-card-section
            class="pokemon-modal__header"
            :style="{
              backgroundImage: `linear-gradient(135deg, ${pokemonTypesAssets.background}cc, ${pokemonTypesAssets.background}aa), url(${pokemonTypesAssets.background_img})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center'
            }"
          >
            <div class="pokemon-modal__header-content">
              <q-btn
                icon="mdi-close"
                flat
                round
                color="white"
                class="pokemon-modal__close-btn"
                v-close-popup
              />
              <div class="pokemon-modal__title">
                <h2 class="text-white text-capitalize q-mb-xs">
                  {{ currentPokemon.name }}
                </h2>
                <span class="text-white opacity-80">
                  #{{ String(currentPokemon.id).padStart(3, '0') }}
                </span>
              </div>
            </div>
          </q-card-section>

          <!-- Modal Content -->
          <q-card-section class="pokemon-modal__content">
            <div class="row q-col-gutter-lg">
              <!-- Left Column - Image & Gallery -->
              <div class="col-12 col-md-6">
                <div class="pokemon-modal__image-section">
                  <div class="pokemon-modal__main-image">
                    <img
                      :src="currentPokemon.image"
                      :alt="currentPokemon.name"
                      class="pokemon-modal__image"
                    />
                  </div>

                  <!-- Image Gallery -->
                  <div
                    v-if="
                      currentPokemon.galery && currentPokemon.galery.length > 0
                    "
                    class="pokemon-modal__gallery"
                  >
                    <div
                      v-for="(sprite, index) in currentPokemon.galery"
                      :key="index"
                      class="pokemon-modal__gallery-item"
                    >
                      <img
                        :src="sprite.front_default"
                        :alt="`${currentPokemon.name} sprite ${index}`"
                        class="pokemon-modal__gallery-image"
                      />
                    </div>
                  </div>
                </div>
              </div>

              <!-- Right Column - Details -->
              <div class="col-12 col-md-6">
                <div class="pokemon-modal__details">
                  <!-- HP and Types -->
                  <div class="pokemon-modal__section">
                    <div class="pokemon-modal__hp">
                      <q-icon name="mdi-heart" color="red-5" size="sm" />
                      <span>HP: {{ currentPokemon.hp }}</span>
                    </div>
                    <div class="pokemon-modal__types">
                      <span
                        v-for="type in currentPokemon.types"
                        :key="type.type.name"
                        class="pokemon-modal__type-badge text-capitalize"
                        :class="`pokemon-modal__type-badge--${type.type.name}`"
                      >
                        <img :src="getTypesForModal(type.type.name).energy" />
                        {{ type.type.name }}
                      </span>
                    </div>
                  </div>

                  <!-- Physical Stats -->
                  <div class="pokemon-modal__section">
                    <h4 class="pokemon-modal__section-title">Dados Físicos</h4>
                    <div class="pokemon-modal__info-grid">
                      <div class="pokemon-modal__info-item">
                        <q-icon name="mdi-ruler" />
                        <span>Altura: {{ currentPokemon.height }}m</span>
                      </div>
                      <div class="pokemon-modal__info-item">
                        <q-icon name="mdi-weight" />
                        <span>Peso: {{ currentPokemon.weight }}kg</span>
                      </div>
                      <div class="pokemon-modal__info-item">
                        <q-icon name="mdi-speedometer" />
                        <span>Velocidade: {{ currentPokemon.speed }}</span>
                      </div>
                    </div>
                  </div>

                  <!-- Abilities -->
                  <div
                    v-if="
                      currentPokemon.abilities &&
                      currentPokemon.abilities.length > 0
                    "
                    class="pokemon-modal__section"
                  >
                    <h4 class="pokemon-modal__section-title">Habilidades</h4>
                    <div class="pokemon-modal__abilities">
                      <span
                        v-for="ability in currentPokemon.abilities"
                        :key="ability.ability.name"
                        class="pokemon-modal__ability-badge text-capitalize"
                      >
                        {{ ability.ability.name.replace('-', ' ') }}
                      </span>
                    </div>
                  </div>

                  <!-- Egg Groups -->
                  <div
                    v-if="
                      currentPokemon.egg_groups &&
                      currentPokemon.egg_groups.length > 0
                    "
                    class="pokemon-modal__section"
                  >
                    <h4 class="pokemon-modal__section-title">Grupos de Ovos</h4>
                    <div class="pokemon-modal__egg-groups">
                      <span
                        v-for="egg in currentPokemon.egg_groups"
                        :key="egg.name"
                        class="pokemon-modal__egg-badge text-capitalize"
                      >
                        {{ egg.name }}
                      </span>
                    </div>
                  </div>

                  <!-- Battle Stats -->
                  <div class="pokemon-modal__section">
                    <h4 class="pokemon-modal__section-title">
                      Estatísticas de Batalha
                    </h4>
                    <div class="pokemon-modal__stats-detailed">
                      <div class="pokemon-modal__stat-bar">
                        <span class="pokemon-modal__stat-name">Ataque</span>
                        <div class="pokemon-modal__stat-bar-container">
                          <div
                            class="pokemon-modal__stat-bar-fill"
                            :style="{
                              width: `${(currentPokemon.attack / 255) * 100}%`,
                              backgroundColor: pokemonTypesAssets.background
                            }"
                          ></div>
                        </div>
                        <span class="pokemon-modal__stat-value">{{
                          currentPokemon.attack
                        }}</span>
                      </div>

                      <div class="pokemon-modal__stat-bar">
                        <span class="pokemon-modal__stat-name">Defesa</span>
                        <div class="pokemon-modal__stat-bar-container">
                          <div
                            class="pokemon-modal__stat-bar-fill"
                            :style="{
                              width: `${(currentPokemon.defense / 255) * 100}%`,
                              backgroundColor: pokemonTypesAssets.background
                            }"
                          ></div>
                        </div>
                        <span class="pokemon-modal__stat-value">{{
                          currentPokemon.defense
                        }}</span>
                      </div>

                      <div class="pokemon-modal__stat-bar">
                        <span class="pokemon-modal__stat-name"
                          >Ataque Especial</span
                        >
                        <div class="pokemon-modal__stat-bar-container">
                          <div
                            class="pokemon-modal__stat-bar-fill"
                            :style="{
                              width: `${
                                (currentPokemon.special_attack / 255) * 100
                              }%`,
                              backgroundColor: pokemonTypesAssets.background
                            }"
                          ></div>
                        </div>
                        <span class="pokemon-modal__stat-value">{{
                          currentPokemon.special_attack
                        }}</span>
                      </div>

                      <div class="pokemon-modal__stat-bar">
                        <span class="pokemon-modal__stat-name"
                          >Defesa Especial</span
                        >
                        <div class="pokemon-modal__stat-bar-container">
                          <div
                            class="pokemon-modal__stat-bar-fill"
                            :style="{
                              width: `${
                                (currentPokemon.special_defense / 255) * 100
                              }%`,
                              backgroundColor: pokemonTypesAssets.background
                            }"
                          ></div>
                        </div>
                        <span class="pokemon-modal__stat-value">{{
                          currentPokemon.special_defense
                        }}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </q-card-section>
        </q-card>
      </q-dialog>
    </q-card>

    <!-- Loading State -->
    <q-card v-else-if="!error_poke" class="pokemon-card pokemon-card--loading">
      <q-card-section class="text-center q-pa-xl">
        <q-spinner-pokeball color="primary" size="2rem" />
        <div class="q-mt-md text-grey-6">Carregando Pokémon...</div>
      </q-card-section>
    </q-card>

    <!-- Error State -->
    <q-card v-else class="pokemon-card pokemon-card--error">
      <q-card-section class="text-center q-pa-xl">
        <q-icon name="mdi-pokemon-go" size="4rem" color="grey-5" />
        <div class="text-h6 q-mt-md text-grey-7">Pokémon não encontrado</div>
        <div class="text-body2 text-grey-5 q-mt-sm">
          Este Pokémon pode não existir ou estar temporariamente indisponível
        </div>
      </q-card-section>
    </q-card>
  </div>
</template>

<script>
import api from '../../services/api'
import { pokemontypes } from 'src/constants/pokemonTypes'

export default {
  name: 'PokemonCard',
  props: {
    url: {
      type: String,
      default: null
    }
  },
  data () {
    return {
      loading: false,
      dialogLoading: false,
      openDialog: false,
      error_poke: false,
      imageLoaded: false,
      currentPokemon: {
        id: '',
        name: '',
        shape: '',
        type: ''
      },
      pokemontypes
    }
  },
  computed: {
    pokemonTypesAssets () {
      if (
        !this.currentPokemon.types ||
        this.currentPokemon.types.length === 0
      ) {
        return this.pokemontypes.normal || {}
      }

      const pokemonType =
        this.pokemontypes[this.currentPokemon.types[0].type.name] ||
        this.pokemontypes.normal

      return {
        background: pokemonType.color || '#A8A878',
        color: pokemonType.textColor || '#FFFFFF',
        background_img:
          pokemonType.bg || '/images/backgrounds_pokemons/fundo-poke.jpg',
        energy: pokemonType.energy || ''
      }
    },
    pulseBackgroundStyle () {
      return {
        backgroundImage: `radial-gradient(circle, rgba(255,255,255,0.2) 0%, transparent 70%), url(${this.pokemonTypesAssets.background_img})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center'
      }
    }
  },
  watch: {
    url: {
      handler (newUrl) {
        if (newUrl) {
          this.getPokeByURL()
        }
      },
      immediate: true
    }
  },
  methods: {
    onImageLoad () {
      this.imageLoaded = true
    },

    onImageError () {
      this.currentPokemon.image = '/notfound.png'
    },

    getTypesForModal (type) {
      return this.pokemontypes[type] || this.pokemontypes.normal
    },

    async handleOpenDialog () {
      this.dialogLoading = true

      try {
        if (this.currentPokemon.species_url) {
          await this.getPokeSpecie(this.currentPokemon.species_url)
        }
        this.openDialog = true
      } catch (error) {
        this.$q.notify({
          type: 'negative',
          message: 'Erro ao carregar detalhes do Pokémon',
          position: 'bottom'
        })
      } finally {
        this.dialogLoading = false
      }
    },

    async getPokeByURL () {
      if (!this.url) return

      this.loading = true
      this.error_poke = false

      try {
        const response = await api.get(this.url)
        const data = response.data

        // Basic info
        this.currentPokemon.name = data.name
        this.currentPokemon.types = data.types
        this.currentPokemon.id = data.id
        this.currentPokemon.abilities = data.abilities
        this.currentPokemon.height = data.height / 10
        this.currentPokemon.weight = data.weight / 10
        this.currentPokemon.base_experience = data.base_experience
        this.currentPokemon.species_url = data.species.url

        // Image
        this.currentPokemon.image =
          data.sprites.other?.['official-artwork']?.front_default ||
          data.sprites.front_default ||
          '/notfound.png'

        // Gallery
        this.currentPokemon.galery = data.sprites.other
          ? Object.values(data.sprites.other).filter(
              item => item?.front_default
            )
          : []

        // Stats
        if (data.stats && data.stats.length >= 6) {
          this.currentPokemon.hp = data.stats[0].base_stat
          this.currentPokemon.attack = data.stats[1].base_stat
          this.currentPokemon.defense = data.stats[2].base_stat
          this.currentPokemon.special_attack = data.stats[3].base_stat
          this.currentPokemon.special_defense = data.stats[4].base_stat
          this.currentPokemon.speed = data.stats[5].base_stat
        }
      } catch (error) {
        console.error('Error fetching Pokemon:', error)
        this.error_poke = true
        this.$q.notify({
          type: 'negative',
          position: 'bottom',
          message: 'Ops, parece que este Pokémon não existe...'
        })
      } finally {
        this.loading = false
      }
    },

    async getPokeSpecie (url) {
      try {
        const response = await api.get(url)
        this.currentPokemon.egg_groups = response.data.egg_groups || []
        this.currentPokemon.shape = response.data.shape || ''
        this.currentPokemon.flavor_text_entries =
          response.data.flavor_text_entries || []
      } catch (error) {
        console.error('Error fetching Pokemon species:', error)
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.pokemon-card-wrapper {
  width: 100%;
  max-width: 320px;
  margin: 0 auto;
}

.pokemon-card {
  background: #ffffff;
  border-radius: 20px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.15);
  overflow: hidden;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  position: relative;

  &:hover {
    transform: translateY(-8px) scale(1.02);
    box-shadow: 0 20px 40px rgba(0, 0, 0, 0.25);
  }

  &--loading {
    background: #f5f5f5;
    animation: pulse 1.5s ease-in-out infinite alternate;
  }

  &--error {
    background: #fafafa;
    border: 2px dashed #e0e0e0;
  }
}

// Card Header
.pokemon-card__header {
  padding: 1rem;
  position: relative;
  background: linear-gradient(
    135deg,
    var(--pokemon-bg) 0%,
    var(--pokemon-bg-dark) 100%
  );

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: url('/images/backgrounds_site/cardboard.png') center/cover;
    opacity: 0.1;
    pointer-events: none;
  }
}

.pokemon-card__header-content {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  position: relative;
  z-index: 1;
}

.pokemon-card__name-section {
  flex: 1;
}

.pokemon-card__name {
  font-size: 1.25rem;
  font-weight: 700;
  margin: 0;
  text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.3);
}

.pokemon-card__id {
  font-size: 0.85rem;
  font-weight: 600;
  opacity: 0.8;
}

.pokemon-card__stats-section {
  display: flex;
  align-items: center;
  gap: 0.75rem;
}

.pokemon-card__hp {
  display: flex;
  align-items: center;
  gap: 0.25rem;
  font-weight: 600;
}

.pokemon-card__hp-label {
  font-size: 0.75rem;
  opacity: 0.8;
}

.pokemon-card__hp-value {
  font-size: 1.1rem;
  font-weight: 700;
}

.pokemon-card__energy-icon {
  width: 24px;
  height: 24px;
  border-radius: 50%;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.2);
}

// Card Body
.pokemon-card__body {
  padding: 1rem;
  background: linear-gradient(to bottom, transparent, rgba(0, 0, 0, 0.05));
}

.pokemon-card__image-container {
  position: relative;
  height: 180px;
  margin-bottom: 1rem;
  display: flex;
  align-items: center;
  justify-content: center;
}

.pokemon-card__image-background {
  position: absolute;
  inset: 0;
  border-radius: 12px;
  opacity: 0.3;
  animation: pulse-bg 3s ease-in-out infinite alternate;
}

.pokemon-card__image-wrapper {
  position: relative;
  z-index: 2;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
}

.pokemon-card__image {
  max-width: 140px;
  max-height: 140px;
  width: auto;
  height: auto;
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  filter: drop-shadow(0 4px 12px rgba(0, 0, 0, 0.15));

  &:hover {
    transform: scale(1.1) rotate3d(1, 0, 0, 10deg);
    filter: drop-shadow(0 8px 20px rgba(0, 0, 0, 0.3));
  }
}

.pokemon-card__types {
  position: absolute;
  top: 0.5rem;
  right: 0.5rem;
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
  z-index: 3;
}

.pokemon-card__type-badge {
  background: rgba(255, 255, 255, 0.9);
  color: #333;
  padding: 0.25rem 0.5rem;
  border-radius: 12px;
  font-size: 0.7rem;
  font-weight: 600;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  backdrop-filter: blur(4px);
}

// Stats Grid
.pokemon-card__stats {
  margin-top: 0.5rem;
}

.pokemon-card__stats-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 0.5rem;
}

.pokemon-card__stat-item {
  background: rgba(255, 255, 255, 0.2);
  backdrop-filter: blur(4px);
  padding: 0.5rem;
  border-radius: 8px;
  text-align: center;
  transition: background-color 0.2s ease;

  &:hover {
    background: rgba(255, 255, 255, 0.3);
  }
}

.pokemon-card__stat-label {
  display: block;
  font-size: 0.7rem;
  font-weight: 600;
  opacity: 0.8;
  margin-bottom: 0.125rem;
}

.pokemon-card__stat-value {
  font-size: 0.9rem;
  font-weight: 700;
}

// Card Footer
.pokemon-card__footer {
  padding: 1rem;
  text-align: center;
  background: rgba(255, 255, 255, 0.5);
}

.pokemon-card__details-btn {
  font-weight: 600;
  padding: 0.5rem 1.5rem;
  transition: all 0.3s ease;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 6px 20px rgba(0, 0, 0, 0.2);
  }
}

// Modal Styles
.pokemon-modal__card {
  max-width: 900px;
  width: 100%;
  max-height: 90vh;
  overflow: hidden;
  border-radius: 24px;
}

.pokemon-modal__header {
  position: relative;
  padding: 2rem;
  color: white;

  &::before {
    content: '';
    position: absolute;
    inset: 0;
    background: rgba(0, 0, 0, 0.3);
    pointer-events: none;
  }
}

.pokemon-modal__header-content {
  position: relative;
  z-index: 1;
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
}

.pokemon-modal__close-btn {
  margin: -0.5rem -0.5rem -0.5rem 0;
}

.pokemon-modal__title h2 {
  font-size: 2rem;
  font-weight: 700;
  margin: 0;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.5);
}

.pokemon-modal__content {
  padding: 2rem;
  max-height: calc(90vh - 120px);
  overflow-y: auto;
}

.pokemon-modal__image-section {
  text-align: center;
}

.pokemon-modal__main-image {
  background: radial-gradient(circle, rgba(255, 255, 255, 0.1), transparent);
  border-radius: 20px;
  padding: 2rem;
  margin-bottom: 1rem;
}

.pokemon-modal__image {
  max-width: 200px;
  max-height: 200px;
  width: auto;
  height: auto;
  filter: drop-shadow(0 8px 16px rgba(0, 0, 0, 0.2));
}

.pokemon-modal__gallery {
  display: flex;
  justify-content: center;
  gap: 0.5rem;
  flex-wrap: wrap;
}

.pokemon-modal__gallery-item {
  background: #f5f5f5;
  border-radius: 8px;
  padding: 0.5rem;
  transition: transform 0.2s ease;

  &:hover {
    transform: scale(1.1);
  }
}

.pokemon-modal__gallery-image {
  width: 60px;
  height: 60px;
}

.pokemon-modal__details {
  height: 100%;
}

.pokemon-modal__section {
  margin-bottom: 2rem;

  &:last-child {
    margin-bottom: 0;
  }
}

.pokemon-modal__section-title {
  font-size: 1.2rem;
  font-weight: 700;
  margin-bottom: 1rem;
  color: #333;
  border-bottom: 2px solid #e0e0e0;
  padding-bottom: 0.5rem;
}

.pokemon-modal__hp {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 1.1rem;
  font-weight: 600;
  margin-bottom: 1rem;
  color: #d32f2f;
}

.pokemon-modal__types,
.pokemon-modal__abilities,
.pokemon-modal__egg-groups {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
}

.pokemon-modal__type-badge,
.pokemon-modal__ability-badge,
.pokemon-modal__egg-badge {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  background: #f5f5f5;
  color: #333;
  padding: 0.5rem 1rem;
  border-radius: 20px;
  font-size: 0.85rem;
  font-weight: 600;
  border: 2px solid #e0e0e0;
  transition: all 0.2s ease;

  img {
    width: 20px;
    height: 20px;
    border-radius: 50%;
  }

  &:hover {
    background: #eeeeee;
    transform: translateY(-2px);
  }
}

.pokemon-modal__info-grid {
  display: grid;
  gap: 1rem;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
}

.pokemon-modal__info-item {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 0.75rem;
  background: #f8f9fa;
  border-radius: 12px;
  font-weight: 500;
  transition: background-color 0.2s ease;

  &:hover {
    background: #e9ecef;
  }

  .q-icon {
    color: #666;
    font-size: 1.2rem;
  }
}

.pokemon-modal__stats-detailed {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.pokemon-modal__stat-bar {
  display: flex;
  align-items: center;
  gap: 1rem;
}

.pokemon-modal__stat-name {
  flex: 0 0 120px;
  font-weight: 600;
  font-size: 0.9rem;
  color: #555;
}

.pokemon-modal__stat-bar-container {
  flex: 1;
  height: 8px;
  background: #e0e0e0;
  border-radius: 4px;
  overflow: hidden;
  position: relative;
}

.pokemon-modal__stat-bar-fill {
  height: 100%;
  border-radius: 4px;
  transition: width 0.8s cubic-bezier(0.4, 0, 0.2, 1);
  background: linear-gradient(
    90deg,
    var(--fill-color, #4caf50),
    var(--fill-color-dark, #388e3c)
  );
  position: relative;

  &::after {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: linear-gradient(
      90deg,
      transparent,
      rgba(255, 255, 255, 0.3),
      transparent
    );
    animation: shine 2s ease-in-out infinite;
  }
}

.pokemon-modal__stat-value {
  flex: 0 0 40px;
  font-weight: 700;
  font-size: 0.9rem;
  text-align: right;
  color: #333;
}

// Type-specific colors for badges
.pokemon-card__type-badge--fire,
.pokemon-modal__type-badge--fire {
  background: linear-gradient(135deg, #ff6b6b, #ee5a24);
  color: white;
}

.pokemon-card__type-badge--water,
.pokemon-modal__type-badge--water {
  background: linear-gradient(135deg, #74b9ff, #0984e3);
  color: white;
}

.pokemon-card__type-badge--grass,
.pokemon-modal__type-badge--grass {
  background: linear-gradient(135deg, #00b894, #00a085);
  color: white;
}

.pokemon-card__type-badge--electric,
.pokemon-modal__type-badge--electric {
  background: linear-gradient(135deg, #fdcb6e, #e17055);
  color: white;
}

.pokemon-card__type-badge--psychic,
.pokemon-modal__type-badge--psychic {
  background: linear-gradient(135deg, #fd79a8, #e84393);
  color: white;
}

.pokemon-card__type-badge--ice,
.pokemon-modal__type-badge--ice {
  background: linear-gradient(135deg, #81ecec, #00b894);
  color: white;
}

.pokemon-card__type-badge--dragon,
.pokemon-modal__type-badge--dragon {
  background: linear-gradient(135deg, #6c5ce7, #5f3dc4);
  color: white;
}

.pokemon-card__type-badge--dark,
.pokemon-modal__type-badge--dark {
  background: linear-gradient(135deg, #2d3436, #636e72);
  color: white;
}

.pokemon-card__type-badge--fairy,
.pokemon-modal__type-badge--fairy {
  background: linear-gradient(135deg, #fd79a8, #fdcb6e);
  color: white;
}

.pokemon-card__type-badge--fighting,
.pokemon-modal__type-badge--fighting {
  background: linear-gradient(135deg, #e17055, #d63031);
  color: white;
}

.pokemon-card__type-badge--poison,
.pokemon-modal__type-badge--poison {
  background: linear-gradient(135deg, #a29bfe, #6c5ce7);
  color: white;
}

.pokemon-card__type-badge--ground,
.pokemon-modal__type-badge--ground {
  background: linear-gradient(135deg, #fdcb6e, #e17055);
  color: white;
}

.pokemon-card__type-badge--flying,
.pokemon-modal__type-badge--flying {
  background: linear-gradient(135deg, #74b9ff, #0984e3);
  color: white;
}

.pokemon-card__type-badge--bug,
.pokemon-modal__type-badge--bug {
  background: linear-gradient(135deg, #00b894, #00a085);
  color: white;
}

.pokemon-card__type-badge--rock,
.pokemon-modal__type-badge--rock {
  background: linear-gradient(135deg, #636e72, #2d3436);
  color: white;
}

.pokemon-card__type-badge--ghost,
.pokemon-modal__type-badge--ghost {
  background: linear-gradient(135deg, #6c5ce7, #5f3dc4);
  color: white;
}

.pokemon-card__type-badge--steel,
.pokemon-modal__type-badge--steel {
  background: linear-gradient(135deg, #b2bec3, #636e72);
  color: white;
}

.pokemon-card__type-badge--normal,
.pokemon-modal__type-badge--normal {
  background: linear-gradient(135deg, #ddd, #bbb);
  color: #333;
}

// Animations
@keyframes pulse {
  0% {
    opacity: 0.6;
  }
  100% {
    opacity: 1;
  }
}

@keyframes pulse-bg {
  0% {
    filter: brightness(100%);
    transform: scale(1);
  }
  100% {
    filter: brightness(120%);
    transform: scale(1.02);
  }
}

@keyframes shine {
  0% {
    transform: translateX(-100%);
  }
  50% {
    transform: translateX(100%);
  }
  100% {
    transform: translateX(100%);
  }
}

// Responsive Design
@media (max-width: 768px) {
  .pokemon-card-wrapper {
    max-width: 280px;
  }

  .pokemon-card__header {
    padding: 0.75rem;
  }

  .pokemon-card__name {
    font-size: 1.1rem;
  }

  .pokemon-card__body {
    padding: 0.75rem;
  }

  .pokemon-card__image-container {
    height: 150px;
  }

  .pokemon-card__image {
    max-width: 120px;
    max-height: 120px;
  }

  .pokemon-card__stats-grid {
    grid-template-columns: 1fr;
    gap: 0.25rem;
  }

  .pokemon-card__stat-item {
    padding: 0.375rem;
  }

  .pokemon-card__footer {
    padding: 0.75rem;
  }

  .pokemon-modal__content {
    padding: 1rem;
  }

  .pokemon-modal__header {
    padding: 1rem;
  }

  .pokemon-modal__title h2 {
    font-size: 1.5rem;
  }

  .pokemon-modal__main-image {
    padding: 1rem;
  }

  .pokemon-modal__image {
    max-width: 150px;
    max-height: 150px;
  }

  .pokemon-modal__info-grid {
    grid-template-columns: 1fr;
  }

  .pokemon-modal__stat-name {
    flex: 0 0 100px;
    font-size: 0.8rem;
  }

  .pokemon-modal__stat-value {
    flex: 0 0 35px;
    font-size: 0.8rem;
  }
}

@media (max-width: 480px) {
  .pokemon-card-wrapper {
    max-width: 100%;
  }

  .pokemon-card__header-content {
    flex-direction: column;
    gap: 0.5rem;
    align-items: flex-start;
  }

  .pokemon-card__stats-section {
    align-self: flex-end;
  }

  .pokemon-modal__types,
  .pokemon-modal__abilities,
  .pokemon-modal__egg-groups {
    flex-direction: column;
    align-items: stretch;
  }

  .pokemon-modal__type-badge,
  .pokemon-modal__ability-badge,
  .pokemon-modal__egg-badge {
    justify-content: center;
  }
}

// Loading skeleton
.pokemon-card--loading {
  .pokemon-card__header,
  .pokemon-card__body,
  .pokemon-card__footer {
    background: linear-gradient(90deg, #f0f0f0 25%, #e0e0e0 50%, #f0f0f0 75%);
    background-size: 200% 100%;
    animation: loading 1.5s infinite;
  }
}

@keyframes loading {
  0% {
    background-position: 200% 0;
  }
  100% {
    background-position: -200% 0;
  }
}

// Focus states for accessibility
.pokemon-card__details-btn:focus {
  outline: 3px solid rgba(0, 123, 255, 0.5);
  outline-offset: 2px;
}

.pokemon-modal__close-btn:focus {
  outline: 3px solid rgba(255, 255, 255, 0.7);
  outline-offset: 2px;
}

// Print styles
@media print {
  .pokemon-card {
    box-shadow: none;
    border: 2px solid #ddd;
    break-inside: avoid;
  }

  .pokemon-card__details-btn {
    display: none;
  }
}
</style>
