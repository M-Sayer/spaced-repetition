import React from 'react';

import { StyledWordTile } from './WordTile.styled';

const WordTile = (props) => {
  let word;
  props.word ? word = props.word : word = props.displayWord;
  console.log(props.totalScore)
  console.log(props.displayWord)

  return (
    <section className='word-card'>
      <div className='wordInLang'>
        <h2>
          {word.original || word.name}
        </h2>
      </div>
      {word.translation && <div className='wordInEng'>
        <h4>
          {word.translation}
        </h4>
      </div>}
      <div className='count'>
        <span className='correctCount'>
          {word.correct_count}
        </span>
        <span className='incorrectCount'>
          {word.incorrect_count}
        </span>
        {props.totalScore >=0 && 
          <div className='totalScore'>
            total score: {props.totalScore}
          </div>}
      </div>
    </section>
  )
}

export default WordTile;