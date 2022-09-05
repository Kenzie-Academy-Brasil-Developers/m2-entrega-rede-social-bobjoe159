class Register {
  static sendloginPage() {
    const headerLogin = document.querySelector('.headerLogin')
    headerLogin.addEventListener('click', () => {
      window.location.replace('/index.html')
    })
  }
}

Register.sendloginPage()
