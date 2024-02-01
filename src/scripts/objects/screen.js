const screen  = {
  userProfile : document.querySelector('.profile-data'),
  userEvents: document.querySelector('.profile-events'),
  renderUser(user){
   this.userProfile.innerHTML = `<div class="info">
                    
                                  <div class="data">
                                    <img src="${user.avatarUrl}"alt="Foto de perfil do usuario"/>
                                    <h1>${user.name ?? 'Não possui nome cadastrado 😢'} </h1>
                                    <p class="bio">${user.bio ?? 'Não possui bio cadastrada 😢'}</p>
                                    </div>
                        
                                    <div class="followers">
                                      <p>Followers:  ${user.followers}</p>
                                      <p>Following:  ${user.following}</p>
                                     </div>
                                  </div>`
     let repositoriesItens = ""
     user.repositories.forEach(repo => repositoriesItens += `<li><a target="_blank" href="${repo.html_url}">${repo.name}
                                                              </a>
                                                            
                                                                <p>forks:${repo.forks_count}
                                                                                       star:${repo.stargazers_count}
                                                                                       watches:${repo.watchers}
                                                                                       ${repo.language}</p> </li>`)


     console.log(user.repositories)
      if(user.repositories.length > 0){
          this.userProfile.innerHTML += `
                                          <div class="repositories-container">
                                            <h2>Repositorios</h2> 
                                            <div class="repositories">
                                              <ul>${repositoriesItens ?? 'Não possui repositorios 😢 '}</ul>   
                                            </div> 
                                          
                                          </div>
                                        `;

      }else{
        this.userProfile.innerHTML += `
        <div class="repositories-container">
          <div class="repositorio-vazio">
            <h3>Não possui repositorio</h3> 
          </div> 
        
        </div>
      `;
      }
      
     let eventItens = ''
      user.event.forEach(event =>{
      
        if(event.type === "CreateEvent" || event.type === "PushEvent"){
          
              if (event.payload.commits && event.payload.commits.length > 0){
                for(let i = 0; i < event.payload.commits.length; i++){
                  const message = event.payload.commits[i].message
                  const repoName = event.repo.name
                  eventItens += `<li><p class="eventText">${repoName}: <span class="messageEvent">${message}</span></p></li>`
                 }
              } 
               
            }
           
         })
    this.userEvents.innerHTML = ''
  if(eventItens != ''){
    this.userEvents.innerHTML += `
                                  <div class="events">
                                    <h2>Eventos</h2>
                                    <ul>${eventItens ?? 'Não possui eventos 😢'}</ul>
                                   </div>`
    }else{
     this.userEvents.innerHTML += `<div class="events">
                                    <h2>eventos</h2>
                                    <p>Nao possui eventos</p>
                                   </div>`
                                  }
   },

    renderNotFound(){
      this.userProfile.innerHTML = "<h2>Usuário não encontrado</h2>"
    }
  
}

  
export {screen}