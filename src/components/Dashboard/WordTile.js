import React from 'react';

import { StyledWordTile } from './WordTile.styled';

const WordTile = (props) => {

  return (
    <section className='word-card'>
      <div className='wordInLang'>
        <h2>
          Translate the word:
        </h2>   
        <span>
          {props.displayWord.name}
        </span>
      </div>
      <div className='count'>
        { props.displayWord &&
          <p>You have answered this word correctly {props.displayWord} times</p>
        }
        { props.displayWord &&
          <p>You have answered this word incorrectly {props.displayWord.incorrect_count} times</p>
        }
        {props.totalScore >=0 && 
          <div className='totalScore'>
            <p>Your total score is: {props.totalScore}</p>
          </div>}
      </div>
    </section>
  )
}

export default WordTile;