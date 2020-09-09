import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import LanguageApiService from '../../services/language-api-service';
import './DashboardRoute.css'
import LanguageContext from '../../contexts/LanguageContext';
import UIfx from 'uifx'
import loginAudio from '../../SFX/PremiumBeat_0013_cursor_selection_15.wav'


class DashboardRoute extends Component {
  static contextType = LanguageContext;

  async componentDidMount() {
    const data = await LanguageApiService.getUserLanguage();
    console.log(data)
    this.context.setLanguage({ ...data.language })
    this.context.setWords(data.words)
  }
  
  renderWordTiles = () => {
    if (this.context.words) return this.context.words.map((word, idx) => {
      return (
        <li className='animate__animated animate__backInDown word-card'>

          <h4 className='word-dash'>
            {word.original}
          </h4>

          <h5 className='translation-dash'>
            {word.translation}
          </h5>

          <div className='score-wrapper'>

          <div className='score-box'>
          <p className='score'>correct answer count:</p> 
          <span className='correctCount'>{word.correct_count}</span>
          </div>

          <div className='score-box'>
          <p className='score'>incorrect answer count:</p> 
          <span className='incorrectCount'>{word.incorrect_count}</span>
          </div>

          </div>
          
        </li>
      )
    })
  }
  
  render() {
    const bell = new UIfx(loginAudio, { volume: 0.3, throttleMs: 100});
    return (
      <section className='dash'>
        <h2>
        {this.context.language.name}
        </h2>
        <div className='score-box'>
        <p>Total correct answers: {this.context.language.total_score}</p>
        </div>
        <Link onClick={bell.play()} to='/learn' className='learn-start' >Start practicing</Link>
        <h3 className='words-practice'>Words to practice</h3>
        <ul className='word-card-wrapper'>
          {this.renderWordTiles()}
        </ul>

      </section>
    );
  }
}

export default DashboardRoute
