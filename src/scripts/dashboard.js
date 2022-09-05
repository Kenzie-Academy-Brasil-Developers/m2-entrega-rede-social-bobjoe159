import { Requests } from './requests.js'

const postsContentList = document.querySelector('.dashBoardList')

class Dashboard {
  static renderDashboard() {
    const token = localStorage.getItem('@redeSocial:token')

    if (!token) {
      window.location.replace('../../index.html')
    }
  }

  static async userInfosUpdate() {
    const userAvatar = document.querySelector('.userAvatar')
    const userName = document.querySelector('.userName')
    const userBio = document.querySelector('.userBio')
    const userFollowers = document.querySelector('.userFollowers')
    const userId = localStorage.getItem('@redeSocial:userId')
    const getUser = await Requests.getUser(userId)

    const { image, username, work_at, followers } = getUser

    userAvatar.src = image
    userName.innerHTML = username
    userBio.innerHTML = work_at
    userFollowers.innerHTML = `${followers.length} seguidores`
  }

  static createPost() {
    const postTitle = document.querySelector('.postTitle')
    const postDescription = document.querySelector('.postDescription')
    const postButton = document.querySelector('.postButton')

    postButton.addEventListener('click', async event => {
      event.preventDefault()
      const data = {
        title: postTitle.value,
        description: postDescription.value
      }
      postTitle.value = ''
      postDescription.value = ''
      await Requests.post(data)
      Requests.renderPosts()
    })
  }

  static async renderPosts() {
    const postsList = await Requests.getAllPosts()
    postsList.results.forEach(user => {
      const li = document.createElement('li')
      li.classList.add('dashboardPost')
      postsContentList.append(li)
      const cardPost = document.createElement('section')
      cardPost.classList.add('cardPost')
      const cardPostImg = document.createElement('img')
      cardPostImg.classList.add('posterAvatar')
      const posterInfos = document.createElement('div')
      posterInfos.classList.add('posterInfos')
      const posterInfosP = document.createElement('p')
      const posterInfosSpan = document.createElement('span')
      cardPost.append(cardPostImg, posterInfos)
      posterInfos.append(posterInfosP, posterInfosSpan)
      const postMessage = document.createElement('section')
      postMessage.classList.add('postMessage')
      const postMessageH3 = document.createElement('h3')
      postMessageH3.classList.add('postMessageTitle')
      const postMessageDescription = document.createElement('p')
      postMessageDescription.classList.add('postMessageDescription')
      postMessage.append(postMessageH3, postMessageDescription)
      const mainFooter = document.createElement('footer')
      mainFooter.classList.add('mainFooter')
      const mainFooterBtn = document.createElement('button')
      mainFooterBtn.classList.add('postFooterButton')
      const mainFooterImg = document.createElement('img')
      mainFooterImg.classList.add('postFooterImg')
      const mainFooterSpan = document.createElement('span')
      mainFooterSpan.classList.add('likesNumber')
      mainFooter.append(mainFooterBtn, mainFooterImg, mainFooterSpan)
      li.append(cardPost, postMessage, mainFooter)

      cardPostImg.src = user.author.image
      posterInfosP.innerHTML = user.author.username
      posterInfosSpan.innerHTML = user.author.work_at
      postMessageH3.innerHTML = user.title
      postMessageDescription.innerHTML = user.description
      mainFooterBtn.innerText = 'Abrir post'
      mainFooterImg.src = '../assets/likeHeart.svg'
      mainFooterSpan.innerHTML = user.likes.length
    })
  }

  static likePost() {
    const postFooterImg = document.querySelectorAll('.postFooterImg')
    postFooterImg.forEach(button => {
      console.log(button)
      postFooterImg.addEventListener('click', () => {
        console.log('ta funfando')
      })
    })
  }
}

// <li class="dashboardPost">
//   <section class="cardPost">
//     <img
//       class="posterAvatar"
//       src="../assets/posterAvatar.svg"
//       alt=""
//     />
//     <div class="posterInfos">
//       <p>Samuel Persuhn</p>
//       <span> Front-End Engineer </span>
//     </div>
//   </section>
//   <section class="postMessage">
//     <h3 class="postMessageTitle">
//       Como criar uma interface simples e agradável utilizando boas
//       práticas de design
//     </h3>
//     <p class="postMessageDescription">
//       Hoje vamos conversar sobre como criar uma interface agradável
//       mesmo sem ter um design pronto feito por um profissional de UI
//       design
//     </p>
//   </section>
//   <footer class="mainFooter">
//     <button class="postFooterButton">Abrir post</button>
//     <img class="postFooterImg" src="../assets/likeHeart.svg" alt="" />
//     <span class="likesNumber">25</span>
//   </footer>
// </li>

Dashboard.userInfosUpdate()
Dashboard.createPost()
Dashboard.renderPosts()
Dashboard.renderDashboard()
Dashboard.likePost()
