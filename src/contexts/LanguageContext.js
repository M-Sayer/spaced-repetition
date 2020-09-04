import React, { useState } from 'react';

const LanguageContext = React.createContext({
  language: '',
  setLanguage: () => {},
  words: '',
  setWords: () => {},
  totalScore: '',
  setTotalScore: () => {},
});

export default LanguageContext;

export const LanguageProvider = (props) => {
  const [language, setLanguage] = useState('');
  const [words, setWords] = useState('');
  const [displayWord, setDisplayWord] = useState('');
  const [totalScore, setTotalScore] = useState('');

  return (
    <LanguageContext.Provider value={{ 
      language, setLanguage, 
      words, setWords, 
      displayWord, setDisplayWord,
      totalScore, setTotalScore,
    }}>
      {props.children}
    </LanguageContext.Provider>
  )
}