import {baseURL, eventQuantity} from '/src/scripts/variables.js'
async function getEvent(userName){
  const response = await fetch(`${baseURL}/${userName}/events?per_page=${eventQuantity}`)
  return await response.json()
}

export{getEvent}