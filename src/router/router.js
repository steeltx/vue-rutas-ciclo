import { createRouter, createWebHashHistory } from 'vue-router'

const routes = [
  {
    path: '/',
    redirect: '/pokemon'
  },
  {
    path: '/pokemon',
    name: 'pokemon',
    component: () => import(/*webpackChunkName: "PokemonLayout"*/'../modules/pokemon/layouts/PokemonLayout'),
    children: [
      {
        path: 'home',
        name: 'pokemon-home',
        component: () => import(/*webpackChunkName: "ListPage"*/'../modules/pokemon/pages/ListPage')
      },
      {
        path: 'about',
        name: 'pokemon-about',
        component: () => import(/*webpackChunkName: "AboutPage"*/'../modules/pokemon/pages/AboutPage')
      },
      {
        path: 'pokemonid/:id',
        name: 'pokemon-id',
        component: () => import(/*webpackChunkName: "PokemonPage"*/'../modules/pokemon/pages/PokemonPage'),
        props: (route) => {
          const id = Number(route.params.id)
          return isNaN(id) ? { id: 1 } : { id }
        },
      },
      {
        path: '',
        redirect: { name: 'pokemon-about' }
      }
    ]
  },
  {
    path: '/dbz',
    name: 'DBZ',
    component: () => import(/*webpackChunkName: "DBZLayout"*/'../modules/dbz/layouts/DragonBallLayout'),
    children: [
      {
        path: 'characters',
        name: 'dbz-characters',
        component: () => import(/*webpackChunkName: "DBZCharacters"*/'../modules/dbz/pages/Characters')
      },
      {
        path: 'about',
        name: 'dbz-about',
        component: () => import(/*webpackChunkName: "DBZAbout"*/'../modules/dbz/pages/About')
      },
      {
        path: '',
        redirect: { name: 'dbz-characters' }
      }
    ]
  },
  {
    path: '/:pathMach(.*)*',
    component: () => import(/*webpackChunkName: "NoPageFound"*/'../modules/shared/pages/NoPageFound')
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

// Guard global - sincrono
// router.beforeEach((to, from, next) => {
//   // console.log({to, from, next})

// const random = Math.random() * 100
// if (random > 50) {
//   console.log('Autenticado')
//   next()
// } else {
//   console.log(random, ' bloqueado por guard')
//   next({ name: 'pokemon-home' })
// }
// })

const canAccess = () => {
  return new Promise(resolve => {
    const random = Math.random() * 100
    if (random > 50) {
      console.log('Autenticado - canAccess')
      resolve(true)
    } else {
      console.log(random, ' bloqueado por guard - canAccess')
      resolve(false)
    }
  })
}

router.beforeEach(async (to, from, next) => {

  const autorized = await canAccess()
  autorized
    ? next()
    : next({ name: 'pokemon-home' })

})

export default router