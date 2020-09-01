import React from 'react';

import { StyledWordTile } from './WordTile.styled';

const WordTile = (props) => {
  const word = props.word;
  return (
    <StyledWordTile>
      <section clasName='wordInLang'>
        <h2>{word.original}</h2>
      </section>
      <section className='wordInEng'>
        <h4>{word.translation}</h4>
      </section>
      <div className='count'>
        <span className='correctCount'>
          {word.correct_count}</span>
        <span className='incorrectCount'>
          {word.incorrect_count}
        </span>
      </div>
    </StyledWordTile>
  )
}

export default WordTile;