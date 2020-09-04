import config from '../config';
import TokenService from './token-service';


const LanguageApiService = {
  async getUserLanguage() {
    
  try {  
    const res = await fetch(`${config.API_ENDPOINT}/language`, {
      headers: {
        'authorization': `Bearer ${TokenService.getAuthToken()}`
      }
    })
    const languageAndWords = await res.json()
    return languageAndWords
  } 
  catch (error) {
    console.log(error)
  }
  },
  async getLanguageHead() {
    try {
      const res = await fetch(`${config.API_ENDPOINT}/language/head`, {
        headers: {
          'authorization': `Bearer ${TokenService.getAuthToken()}`,
        }
      })

      const head = await res.json()
      return head
    } catch (error) {
      console.log(error)
    }
  },
  async postGuess(guess) {
    try {
      const res = await fetch(`${config.API_ENDPOINT}/language/guess`, {
        method: 'POST',
        headers: {
          'authorization': `Bearer ${TokenService.getAuthToken()}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({guess: `${guess}`}),
      });

      return res.json()

    } catch (error) {
      console.log(error)
    }
  },
}

export default LanguageApiService;