import React from 'react';

import { StyledWordTile } from './WordTile.styled';

const WordTile = (props) => {
  const word = props.word;
  return (
    <section className='word-card'>
      <div className='wordInLang'>
        <h2>{word.original}</h2>
      </div>
      <div className='wordInEng'>
        <h4>{word.translation}</h4>
      </div>
      <div className='count'>
        <span className='correctCount'>
          {word.correct_count}</span>
        <span className='incorrectCount'>
          {word.incorrect_count}
        </span>
      </div>
    </section>
  )
}

export default WordTile;