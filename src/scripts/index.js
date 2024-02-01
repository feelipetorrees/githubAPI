import { getUser } from "/src/scripts/services/user.js"
import { getRepositories } from "/src/scripts/services/repositories.js"
import { getEvent } from "/src/scripts/services/events.js"
import { user } from "/src/scripts/objects/user.js"
import { screen } from "/src/scripts/objects/screen.js"



document.getElementById('btn-search').addEventListener('click', ()=>{
  const userName = document.getElementById('input-search').value
  if(validateEmptyInput(userName)) return
  getUserData(userName)
})

function validateEmptyInput(userName){
  if(userName.length === 0){
    alert('Digite o campo com o usuário do GitHub')
    return true
  }
}
document.getElementById('input-search').addEventListener('keyup', (e)=>{
  const userName = e.target.value
  const key =  e.keyCode == 13;
 
  if(key){
      if(validateEmptyInput(userName)) return
      getUserData(userName)
   }
})

async function getUserData(userName){
  //pegando repostirorios o github
  const userResponse = await getUser(userName)
  if(userResponse.message === "Not Found"){
    screen.renderNotFound()
    return
}
  const repositoriesResponse = await getRepositories(userName)
  const eventResponse = await getEvent(userName)


  //setando eles no objeto user
  user.setInfo(userResponse)
  user.setRepositories(repositoriesResponse)
  user.setEvent(eventResponse)

  
  //redenrizando na tela
  screen.renderUser(user)

 


//   // getUser(userName).then((userData) =>{
//   //     console.log(userData)

//   //     //avatar
//   //     let userInfo = `<div class="info">
                    
//   //                       <div class="data">
//   //                       <img src="${userData.avatar_url} alt="Foto de perfil do usuario"/>
//   //                         <h1>${userData.name ?? 'Não possui nome cadastrado 😢'} </h1>
//   //                         <p class="bio">${userData.bio ?? 'Não possui bio cadastrada 😢'}</p>
                        
//   //                       </div>
//   //                     </div>
                   
//   //                     ` 
//   //     document.querySelector('.profile-data').innerHTML = userInfo
//   //     getUserRepositories(userName)
//     })
 }

// function getRepositories(userName){
//   getRepositories(userName).then((reposData)=>{
//     console.log(reposData)
//       let repositoriesItens = ""
//       reposData.forEach(repo =>{
//           repositoriesItens += `<li><a href="${repo.html_url}" target="_blank">${repo.name}</a></li>`


//       })
//       document.querySelector('.profile-data').innerHTML += `  
//                                                               <div class="repositories">
                                                              
//                                                               <h3>Repositorios</h3>
//                                                               <ul>${repositoriesItens}<u/>
//                                                             </div>`
//     console.log(repositoriesItens)
//   })
// }







