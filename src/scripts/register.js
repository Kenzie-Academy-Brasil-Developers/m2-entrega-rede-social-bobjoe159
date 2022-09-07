import { Requests } from './requests.js'

class Register {
  static sendloginPage() {
    const loginPageBtn = document.querySelector('.loginPageBtn')
    const backButton = document.querySelector('.backButton')
    loginPageBtn.addEventListener('click', () => {
      window.location.replace('../index.html')
    })
    backButton.addEventListener('click', () => {
      window.location.replace('../index.html')
    })
  }
  static handleRegister() {
    const input = document.querySelectorAll('input')
    const registerButton = document.querySelector('.registerButton')

    registerButton.addEventListener('click', async event => {
      event.preventDefault()
      const data = {
        username: input[0].value,
        email: input[1].value,
        password: input[2].value,
        work_at: input[3].value,
        image: input[4].value
      }
      await Requests.register(data)
      input[0].value = ''
      input[1].value = ''
      input[2].value = ''
      input[3].value = ''
      input[4].value = ''
    })
  }
}

Register.handleRegister()
Register.sendloginPage()
