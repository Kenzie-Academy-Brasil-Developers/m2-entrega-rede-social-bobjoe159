import { instance } from './axios.js'
import { Toast } from './toast.js'

const token = localStorage.getItem('@redeSocial:token')

export class Requests {
  static async login(data) {
    console.log(data)
    const loginData = await instance
      .post('/users/login/', data)
      .then(resp => {
        localStorage.setItem('@redeSocial:token', resp.data.token)
        localStorage.setItem('@redeSocial:userId', resp.data.user_uuid)
        Toast.create('Login realizado com sucesso!', 'green')

        setTimeout(() => {
          window.location.replace('src/pages/dashboard.html')
        }, 2000)
      })
      .catch(err => {
        Toast.create('Usuário ou senha inválidos', 'red')
        console.log(err)
      })
    return loginData
  }

  static async register(data) {
    const registerData = await instance
      .post('/users/', data)
      .then(() => {
        Toast.create('Usuário registrado com sucesso!', 'green')
      })
      .catch(err => {
        console.log(err)
        Toast.create(err, 'red')
      })
    return registerData
  }

  static async getUser(id) {
    const getUser = await instance
      .get(`/users/${id}/`)
      .then(resp => {
        return resp.data
      })
      .catch(err => {
        Toast.create(err, 'red')
        console.log(err)
      })
    return getUser
  }

  static async post(data) {
    const postContent = await instance
      .post('/posts/', data)
      .then(resp => {
        Toast.create('Post realizado com sucesso!', 'green')
        return resp.data
      })
      .catch(err => {
        Toast.create(err, 'red')
      })
    return postContent
  }

  static async getAllPosts() {
    const getAllPosts = await instance
      .get('/posts/')
      .then(resp => {
        return resp.data
      })
      .catch(err => {
        console.log(err)
      })
    return getAllPosts
  }
}
