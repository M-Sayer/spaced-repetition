import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import LanguageApiService from '../../services/language-api-service';
import './DashboardRoute.css'

import LanguageContext from '../../contexts/LanguageContext';
import WordTile from '../../components/Dashboard/WordTile';

class DashboardRoute extends Component {
  static contextType = LanguageContext;

  async componentDidMount() {
    const data = await LanguageApiService.getUserLanguage();
    console.log(data)
    this.context.setLanguage({ ...data.language })
    this.context.setWords(data.words)
    console.log('context: ', this.context)
  }
  
  renderWordTiles = () => {
    if (this.context.words) return this.context.words.map((word, idx) => {
      return (
        <WordTile className='word-card' key={idx} word={word} />
      )
    })
  }

  renderTotalScore = () => {
    let correct = 0
    let incorrect = 0
    
    if (this.context.words) {
      this.context.words.forEach(word => {
        correct += word.correct_count
        incorrect += word.incorrect_count
      })
    }
    return (correct - incorrect)
  }
  
  render() {
    return (
      <div className='dash'>
        <div className="language-header-text">
          Language: {this.context.language.name}
        </div>
       
        <div className='score-box'>
        <p>total score: {this.renderTotalScore()}</p>

        </div>

        <Link to='/learn'>Start learning</Link>
        

        <section className='word-card-wrapper'>
        {this.renderWordTiles()}
        </section>

      </div>
    );
  }
}

export default DashboardRoute
