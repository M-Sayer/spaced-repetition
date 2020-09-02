import React, { Component } from 'react'
import LanguageApiService from '../../services/language-api-service';
import './DashboardRoute.css'

import LanguageContext from '../../contexts/LanguageContext';
import WordTile from '../../components/Dashboard/WordTile';

class DashboardRoute extends Component {
  static contextType = LanguageContext;

  async componentDidMount() {
    const data = await LanguageApiService.getUserLanguage();
    console.log(data)
    this.context.setLanguage({
      language: {...data.language},
      words: data.words,
    })
    console.log(this.context)
  }
  
  renderWordTiles = () => {
    if (this.context.language.words) return this.context.language.words.map((word, idx) => {
      return (
        <WordTile key={idx} word={word} />
      )
    })
  }

  renderTotalScore = () => {
    let correct = 0
    let incorrect = 0
    
    if (this.context.language.words) this.context.language.words.forEach(word => {
      correct += word.correct_count
      incorrect += word.incorrect_count
    })
    return (correct - incorrect)
  }
  
  render() {
    return (
      <div className='dash'>
        implement and style me
        <div>
          language:
          {this.context.language && this.context.language.language.name}
        </div>
        words for language:
        {this.renderWordTiles()}
        total score:
        {this.renderTotalScore()}
        start learning:
      </div>
    );
  }
}

export default DashboardRoute
