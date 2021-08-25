import {createRouter, createWebHashHistory} from 'vue-router'

import ListPage from '../modules/pokemon/pages/ListPage.vue'
import AboutPage from '../modules/pokemon/pages/AboutPage.vue'
import PokemonPage from '../modules/pokemon/pages/PokemonPage.vue'
import NoPageFound from '../modules/shared/pages/NoPageFound.vue'


const routes = [
    { path: '/', component: ListPage },
    { path: '/about', component: AboutPage },
    { path: '/id', component: PokemonPage },
    { path: '/:pathMach(.*)*', component: NoPageFound}
]

  const router = createRouter({
    history: createWebHashHistory(),
    routes,
  })

  export default router