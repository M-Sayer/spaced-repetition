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
  const [words, setWords] = useState('');
  const [displayWord, setDisplayWord] = useState('');

  return (
    <LanguageContext.Provider value={{ 
      language, setLanguage, words, setWords, displayWord, setDisplayWord
    }}>
      {props.children}
    </LanguageContext.Provider>
  )
}