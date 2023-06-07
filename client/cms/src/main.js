import { createApp, markRaw } from 'vue'
import { createPinia } from 'pinia'
import vue3GoogleLogin from 'vue3-google-login'


import App from './App.vue'
import router from './router'

// import './assets/main.css'

const app = createApp(App)

app.use(vue3GoogleLogin, {
    clientId: '274735990607-5qb855ni8u2o8d7v18gmjuur2pbsnhbl.apps.googleusercontent.com'
})

const pinia = createPinia()

app.use(pinia)
pinia.use(({ store }) => {
    store.router = markRaw(router)
})

app.use(router)

app.mount('#app')
