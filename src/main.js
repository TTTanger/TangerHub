// import './assets/main.css'

import { createApp } from 'vue'
import { createRouter, createWebHistory } from 'vue-router'
import VueLazyload from 'vue-lazyload'

import MainPage from './components/MainPage.vue'
import Post from './components/Post.vue'
import Comment from './components/Comment.vue'
import CreatePost from './components/CreatePost.vue'
import User from './components/User.vue'
import UserProfile from './components/UserProfile.vue'

import App from './App.vue'

const routes = [
    {
      path: '/',
      name: 'MainPage',
      component: MainPage
    },
    {
      path: '/post',
      name: 'Post',
      component: Post
    },
    {
      path: '/comment',
      name: 'Comment',
      component: Comment
    },
    {
      path: '/post/create',
      name: 'CreatePost',
      component: CreatePost
    },
    {
      path:'/user',
      name:'User',
      component:User
    },
    {
      path: '/userproile',
      name: 'UserProfile',
      component: UserProfile
    }
  ]

const router = createRouter({
    history: createWebHistory(),
    routes,
  })

const app = createApp(App)
app.use(router)
app.use(VueLazyload, {
  preLoad: 1.3,
  error: 'path/to/error-image.jpg',
  loading: 'path/to/loading-image.gif',
  attempt: 1
})
app.mount('#app')
