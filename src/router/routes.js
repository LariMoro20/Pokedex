import Error404 from '../pages/errors/404.vue'

const routes = [{
  path: '/',
  component: () => import('layouts/MainLayout.vue'),
  children: [{
    path: '',
    name: 'home',
    component: () =>
      import('src/pages/PokemonHomePage.vue')
  },
  { path: 'game', name: 'game', component: () => import('src/pages/PokemonGamePage.vue') },

  ]
},
{
  path: '/:catchAll(.*)',
  component: () => import('layouts/MainLayout.vue'),
  children: [{
    path: '',
    name: 'error',
    component: () => import('src/pages/errors/404.vue')
  }]
}]

export default routes
