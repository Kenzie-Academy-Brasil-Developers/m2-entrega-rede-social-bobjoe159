import { Requests } from './requests.js'

class Index {
  static renderIndex() {
    const token = localStorage.getItem('@redeSocial:token')

    if (token) {
      window.location.replace('/src/pages/dashboard.html')
    }
  }

  static handleLogin() {
    const mainEmail = document.querySelector('.mainEmail')
    const mainPassword = document.querySelector('.mainPassword')
    const buttonLogin = document.querySelector('.buttonLogin')
    buttonLogin.addEventListener('click', async event => {
      event.preventDefault()
      const data = {
        email: mainEmail.value,
        password: mainPassword.value
      }
      await Requests.login(data)
    })
  }

  static sendregisterPage() {
    const buttonRegister = document.querySelector('.buttonRegister')

    buttonRegister.addEventListener('click', () => {
      window.location.assign('/src/pages/register.html')
    })
  }
}

Index.renderIndex()
Index.handleLogin()
Index.sendregisterPage()
