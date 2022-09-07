export class Modal {
  static async showModal(postsList) {
    const modal = document.querySelector('.modal')
    const postFooterButton = document.querySelectorAll('.postFooterButton')
    const modalText = document.querySelector('.modalText')
    const nameModal = document.querySelector('.nameModal')
    const jobModal = document.querySelector('.jobModal')
    const modalAvatar = document.querySelector('.modalAvatar')

    postFooterButton.forEach(button => {
      button.addEventListener('click', event => {
        postsList.results.forEach(result => {
          if (result.uuid.includes(event.target.id)) {
            nameModal.innerHTML = result.author.username
            jobModal.innerHTML = result.author.work_at
            modalAvatar.src = result.author.image
            modalText.innerHTML = result.description
          }
        })
        modal.classList.toggle('hidden')
      })
    })
    Modal.closeModal()
  }
  static closeModal() {
    const closeModal = document.querySelector('.closeModal')
    const modal = document.querySelector('.modal')
    closeModal.addEventListener('click', () => {
      modal.classList.add('hidden')
    })
  }
}
