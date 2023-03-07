const axios = require("axios")

const api = axios.create({ baseURL: 'https://api.livy.chat' })

api.interceptors.request.use(
  (config) => {
    const access_token = localStorage.getItem('access_token')

    if (access_token) {
      config.headers.access_token = access_token
    }
    return config
  },
  (error) => {
    return Promise.reject(error)
  }
)

api.interceptors.response.use(
  (res) => {
    return res
  },
  (error) => {
    if (error.response.status === 401) {
      localStorage.removeItem('access_token')
    }
    return Promise.reject(error)
  }
)

const verifyUser = async () => {
  const access_token = localStorage.getItem('access_token')
  if (access_token) {
    const response = await api.post('/verify', { access_token })
    const submission = await api.get('/counselor/status')
    if (submission.data.status === 'pending') return null
    const user = { ...response.data, submission: submission.data }
    return user
  }

  throw new Error()
}

const formatedDate = (date) => {
  return new Date(date)
    .toLocaleDateString('id-ID', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
    })
    .split('/')
    .reverse()
    .join('-')
}


module.exports = { verifyUser, api, formatedDate }