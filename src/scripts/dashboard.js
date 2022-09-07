import { Modal } from './modal.js'
import { Requests } from './requests.js'

const postsContentList = document.querySelector('.dashBoardList')
const sugestionList = document.querySelector('.sugestionList')

class Dashboard {
  static renderDashboard() {
    const token = localStorage.getItem('@redeSocial:token')

    if (!token) {
      window.location.replace('/index.html')
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
      mainFooterBtn.id = user.uuid
      li.id = user.uuid
      mainFooterImg.src = '../assets/likeHeart.svg'
      mainFooterImg.id = user.uuid
      mainFooterSpan.innerHTML = user.likes.length
    })
    Dashboard.likePost()
    await Modal.showModal(postsList)
  }

  static likePost() {
    const postFooterImg = document.querySelectorAll('.postFooterImg')
    let liked = false
    postFooterImg.forEach(likeButton => {
      likeButton.addEventListener('click', async () => {
        if (!liked) {
          likeButton.src = '../assets/likeheartRed.svg'
          liked = true
          const data = {
            post_uuid: likeButton.id
          }
          await Requests.likePost(data)
        } else {
          likeButton.src = '../assets/likeHeart.svg'
          liked = false
          await Requests.unlikePost(likeButton.id)
        }
      })
    })
  }

  static async randomSugestions() {
    const getAllUsers = await Requests.getAllUsers()
    const randomUsers = []
    for (let i = 0; i < 3; i++) {
      const randomSugestions = Math.floor(
        Math.random(getAllUsers.results.length) * 10
      )
      randomUsers.push(getAllUsers.results[randomSugestions])
    }
    randomUsers.forEach(users => {
      const cardSugestion = document.createElement('li')
      const cardContent = document.createElement('section')
      const cardInfos = document.createElement('div')
      const followedAvatar = document.createElement('img')
      const followedName = document.createElement('div')
      const followedUserTitle = document.createElement('h4')
      const followedUserP = document.createElement('p')
      const cardButton = document.createElement('button')

      cardSugestion.classList.add('cardSugestion')
      cardSugestion.append(cardContent)

      cardContent.classList.add('cardContent')
      cardContent.append(cardInfos, cardButton)

      cardInfos.classList.add('cardInfos')
      cardInfos.append(followedAvatar, followedName)
      followedName.append(followedUserTitle, followedUserP)

      followedAvatar.classList.add('followedAvatar')
      followedName.classList.add('followedName')
      followedAvatar.src = users.image
      followedUserTitle.innerText = users.username
      followedUserP.innerText = users.work_at
      cardButton.innerText = 'Seguir'
      cardButton.classList.add('cardButton')

      cardSugestion.id = users.uuid
      cardButton.id = users.uuid

      sugestionList.append(cardSugestion)
    })
    Dashboard.followRandomSugestions()
  }

  static followRandomSugestions() {
    const cardButton = document.querySelectorAll('.cardButton')
    let following = false
    cardButton.forEach(card => {
      card.addEventListener('click', async event => {
        const data = {
          following_users_uuid: event.target.id
        }
        if (!following) {
          card.innerHTML = 'Seguindo'
          following = true
          await Requests.follow(data)
        } else {
          card.innerHTML = 'Seguir'
          following = false
        }
      })
    })
  }
}

// ;<li class="cardSugestion">
//   <section class="cardContent">
//     <div class="cardInfos">
//       <img class="followedAvatar" src="../assets/followedAvatar.svg" alt="" />
//       <div class="followedName">
//         <h4>Carlos Lima</h4>
//         <p>Ux e UI Designer</p>
//       </div>
//     </div>
//     <button class="cardButton">Seguir</button>
//   </section>
// </li>

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
Dashboard.randomSugestions()
