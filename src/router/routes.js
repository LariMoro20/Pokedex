import Error404 from '../pages/errors/404.vue'

const routes = [{
  path: '/',
  component: () =>
    import('layouts/MainLayout.vue'),
  children: [{
    path: '',
    component: () =>
      import('src/pages/PokemonHomePage.vue')
  },
  { path: 'game', name: 'game', component: () => import('src/pages/PokemonGamePage.vue') },

  ]
},
{
  path: '/:catchAll(.*)',
  component: Error404,
  name: 'NotFound'
}]

export default routes
