export class Toast {
  static create(text, color) {
    console.log(color)
    Toastify({
      text: text,
      duration: 3000,
      close: true,
      gravity: 'top',
      position: 'center',
      stopOnFocus: true,
      style: {
        background: color
      }
    }).showToast()
  }
}
