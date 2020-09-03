import React, { useState } from 'react';

const LanguageContext = React.createContext({
  language: '',
  setLanguage: () => {},
  words: '',
  setWords: () => {},
});

export default LanguageContext;

export const LanguageProvider = (props) => {
  const [language, setLanguage] = useState('');
  const [words, setWords] = useState('')

  return (
    <LanguageContext.Provider value={{ 
      language, setLanguage, words, setWords
    }}>
      {props.children}
    </LanguageContext.Provider>
  )
}