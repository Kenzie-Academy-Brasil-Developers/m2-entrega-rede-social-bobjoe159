import { Requests } from './requests.js'

class Index {
  // static renderIndex() {
  //   const token = localStorage.getItem('redeSocial:token')

  //   if (token) {
  //     window.location.replace('/src/pages/dashboard.html')
  //   }
  // }
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
      const login = await Requests.login(data)
    })
  }

  static sendregisterPage() {
    const headerRegister = document.querySelector('.headerRegister')
    headerRegister.addEventListener('click', () => {
      window.location.replace('src/pages/register.html')
    })
  }
}

Index.handleLogin()
Index.sendregisterPage()
