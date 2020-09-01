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
  }
}

export default LanguageApiService;