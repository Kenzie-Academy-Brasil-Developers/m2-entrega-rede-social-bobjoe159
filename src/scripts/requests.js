import { instance } from './axios.js'
import { Toast } from './toast.js'

export class Requests {
  static async login(data) {
    const loginData = await instance
      .post('/users/login/', data)
      .then(resp => {
        console.log(resp)
        localStorage.setItem('@redeSocial:token', resp.data.token)
        Toast.create('Login realizado com sucesso!', 'green')

        setTimeout(() => {
          window.location.replace('src/pages/dashboard.html')
        }, 2000)
      })
      .catch(err => {
        Toast.create(err.response.data.message, 'red')
        console.log(err)
      })
    return loginData
  }
}
