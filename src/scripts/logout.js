import { Toast } from './toast.js'

class Logout {
  static handleLogout() {
    const headerExit = document.querySelector('.headerExit')

    headerExit.addEventListener('click', event => {
      event.preventDefault()
      Toast.create('Você saiu da conta.', 'red')
      setTimeout(() => {
        window.location.replace('./index.html')
      }, 2000)
      localStorage.clear()
    })
  }
}

Logout.handleLogout()
