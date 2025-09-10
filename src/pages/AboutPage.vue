<template>
  <q-page class="about-page">
    <!-- Hero Section -->
    <section class="hero-section q-pa-xl">
      <div class="container">
        <div class="row justify-center">
          <div class="col-12 col-md-10 col-lg-8">
            <!-- Avatar e Título -->
            <div class="text-center q-my-xl">
              <h1 class="hero-title text-h3 text-white q-my-md">
                Sobre a Pokédex
              </h1>

              <p class="hero-subtitle text-h6 text-grey-3">
                Desenvolvido com ❤️ por Larissa Santos
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Main Content -->
    <section class="content-section q-pa-xl">
      <div class="container">
        <div class="row justify-center">
          <div class="col-12 col-md-10 col-lg-8">
            <!-- Sobre o Projeto -->
            <q-card class="content-card q-mb-xl" flat>
              <q-card-section class="q-pa-xl">
                <div class="text-center q-mb-lg">
                  <q-icon
                    name="mdi-information-outline"
                    size="48px"
                    class="section-icon"
                  />
                  <h2 class="text-h5 q-mt-md q-mb-lg">Sobre o Projeto</h2>
                </div>

                <div class="text-body1 line-height-relaxed">
                  <p class="q-mb-md">
                    Olá! Meu nome é <strong>Larissa</strong>, sou desenvolvedora
                    web e criadora desta Pokédex interativa. Esta aplicação foi
                    desenvolvida para fins de estudo e prática dos conhecimentos
                    adquiridos ao longo da minha jornada como desenvolvedora.
                  </p>

                  <p class="q-mb-lg">
                    Aqui você poderá explorar um universo completo de Pokémon,
                    incluindo:
                  </p>

                  <div class="features-grid q-mb-lg">
                    <div class="feature-item">
                      <q-icon name="mdi-view-list" class="feature-icon" />
                      <span>Lista completa de Pokémon</span>
                    </div>
                    <div class="feature-item">
                      <q-icon name="mdi-chart-line" class="feature-icon" />
                      <span>Características e estatísticas</span>
                    </div>
                    <div class="feature-item">
                      <q-icon name="mdi-magnify" class="feature-icon" />
                      <span>Sistema de busca avançada</span>
                    </div>
                    <div class="feature-item">
                      <q-icon name="mdi-gamepad-variant" class="feature-icon" />
                      <span>Jogos interativos</span>
                    </div>
                  </div>
                </div>
              </q-card-section>
            </q-card>

            <!-- Sobre a API -->
            <q-card class="content-card q-mb-xl" flat>
              <q-card-section class="q-pa-xl">
                <div class="text-center q-mb-lg">
                  <q-icon name="mdi-api" size="48px" class="section-icon" />
                  <h2 class="text-h5 q-mt-md q-mb-lg">Tecnologia</h2>
                </div>

                <div class="text-body1 line-height-relaxed">
                  <p class="q-mb-md">
                    A ideia desta aplicação surgiu quando descobri a
                    <strong>PokeAPI</strong>, uma REST API gratuita que fornece
                    dados completos sobre todos os Pokémon, incluindo
                    habilidades, tipos, imagens, evoluções e muito mais!
                  </p>

                  <div class="api-link-container text-center q-mt-lg">
                    <q-btn
                      style="background-color: #000771; color: #000771"
                      outline
                      icon="mdi-link"
                      label="Conhecer a PokeAPI"
                      href="https://pokeapi.co/"
                      target="_blank"
                      class="api-btn"
                      no-caps
                    />
                  </div>
                </div>
              </q-card-section>
            </q-card>

            <!-- Atualizações -->
            <q-card class="content-card q-mb-xl" flat>
              <q-card-section class="q-pa-xl">
                <div class="update-notice">
                  <q-icon name="mdi-rocket-launch" class="update-icon" />
                  <div class="update-content">
                    <h3 class="text-h6 q-mb-sm">Projeto em Evolução</h3>
                    <p class="text-body2 q-mb-none">
                      Esta aplicação está em constante crescimento! Volte de
                      tempos em tempos para conferir as novidades e melhorias
                      implementadas.
                    </p>
                  </div>
                </div>
              </q-card-section>
            </q-card>
          </div>
        </div>
      </div>
    </section>

    <!-- Call to Action Section -->
    <section class="cta-section q-pa-xl">
      <div class="container">
        <div class="row justify-center">
          <div class="col-12 col-md-8 text-center">
            <h2 class="text-h5 text-white q-mb-lg">
              Quer conhecer mais sobre meu trabalho?
            </h2>
            <p class="text-body1 text-grey-3 q-mb-xl">
              Confira meu portfólio para ver outros projetos incríveis!
            </p>

            <div class="cta-buttons">
              <q-btn
                style="
                  background-color: #000771;
                  color: white;
                  border-color: white;
                "
                size="lg"
                icon="mdi-briefcase"
                label="Acessar Portfólio"
                outline
                href="https://larissa-santos.vercel.app/"
                target="_blank"
                class="q-mr-md q-mb-md"
                no-caps
                rounded
              />

              <q-btn
                style="
                  background-color: transparent;

                  color: #fff;
                "
                size="lg"
                icon="mdi-github"
                label="Ver no GitHub"
                href="https://github.com/LariMoro20/Pokedex"
                target="_blank"
                class="q-mb-md"
                outline
                no-caps
                rounded
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  </q-page>
</template>

<script>
export default {
  name: 'AboutPage',
  data () {
    return {}
  }
}
</script>

<style lang="scss" scoped>
.about-page {
  background: linear-gradient(135deg, #000771 0%, #003d82 100%);
  min-height: 100vh;
}

.hero-section {
  background: linear-gradient(rgba(0, 0, 0, 0.3), rgba(0, 0, 0, 0.1));
}

.hero-avatar {
  background: linear-gradient(45deg, #000771, #004499);
  box-shadow: 0 8px 32px rgba(0, 7, 113, 0.5);
  border: 4px solid rgba(255, 255, 255, 0.2);
}

.hero-title {
  font-weight: 700;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.3);
}

.hero-subtitle {
  opacity: 0.9;
}

.content-section {
  background: rgba(0, 7, 113, 0.1);
  backdrop-filter: blur(10px);
}

.content-card {
  background: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(20px);
  border-radius: 24px;
  box-shadow: 0 20px 60px rgba(0, 7, 113, 0.2);
  border: 1px solid rgba(0, 7, 113, 0.1);
  transition: all 0.3s ease;

  &:hover {
    transform: translateY(-4px);
    box-shadow: 0 25px 80px rgba(0, 7, 113, 0.25);
  }
}

.section-icon {
  color: #000771;
}

.line-height-relaxed {
  line-height: 1.7;
}

.features-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 1rem;
  margin: 1.5rem 0;
}

.feature-item {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 1rem;
  background: rgba(0, 7, 113, 0.08);
  border-radius: 12px;
  border-left: 4px solid #000771;
  transition: all 0.3s ease;

  &:hover {
    background: rgba(0, 7, 113, 0.12);
    transform: translateX(4px);
  }
}

.feature-icon {
  color: #000771;
  font-size: 1.25rem;
  flex-shrink: 0;
}

.api-btn {
  font-weight: 500;
  padding: 0.75rem 2rem;
  border-radius: 50px;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 8px 25px rgba(0, 7, 113, 0.3);
  }
}

.update-notice {
  display: flex;
  align-items: flex-start;
  gap: 1rem;
  padding: 1.5rem;
  background: rgba(0, 7, 113, 0.08);
  border-radius: 16px;
  border: 1px solid rgba(0, 7, 113, 0.2);
}

.update-icon {
  color: #000771;
  font-size: 2rem;
  flex-shrink: 0;
  margin-top: 0.25rem;
}

.update-content h3 {
  color: #000771;
  font-weight: 600;
}

.cta-section {
  background: linear-gradient(rgba(0, 7, 113, 0.6), rgba(0, 7, 113, 0.3));
}

.cta-buttons {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 1rem;
}

.cta-buttons .q-btn {
  font-weight: 500;
  transition: all 0.3s ease;

  &:hover {
    transform: translateY(-3px);
    box-shadow: 0 10px 30px rgba(0, 7, 113, 0.3);
  }
}

// Responsividade
@media (max-width: 768px) {
  .hero-section,
  .content-section,
  .cta-section {
    padding: 2rem 1rem;
  }

  .content-card .q-card-section {
    padding: 2rem 1.5rem;
  }

  .features-grid {
    grid-template-columns: 1fr;
  }

  .hero-avatar {
    size: 80px;
  }

  .hero-title {
    font-size: 2rem;
  }

  .cta-buttons {
    flex-direction: column;
    align-items: center;
  }

  .cta-buttons .q-btn {
    width: 100%;
    max-width: 280px;
  }
}

// Animações suaves
.content-card,
.feature-item,
.q-btn {
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

// Melhorias de acessibilidade
.q-btn:focus {
  outline: 2px solid #000771;
  outline-offset: 2px;
}

// Estados de loading e hover mais suaves
.q-btn:hover:not(:disabled) {
  transform: translateY(-2px);
}

.q-btn:active:not(:disabled) {
  transform: translateY(0);
}
</style>
