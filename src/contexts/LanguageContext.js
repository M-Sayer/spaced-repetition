import React, { useState } from 'react';

const LanguageContext = React.createContext({
  language: '',
  setLanguage: () => {},
});

export default LanguageContext;

export const LanguageProvider = (props) => {
  const [language, setLanguage] = useState('');

  return (
    <LanguageContext.Provider value={{ 
      language, setLanguage,
    }}>
      {props.children}
    </LanguageContext.Provider>
  )
}