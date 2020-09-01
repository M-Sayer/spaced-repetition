import React, { Component } from 'react'
import LanguageApiService from '../../services/language-api-service';
import './DashboardRoute.css'

import WordTile from '../../components/Dashboard/WordTile';

class DashboardRoute extends Component {
  state = {
    language: '',
    words: '',
  }

  async componentDidMount() {
    const data = await LanguageApiService.getUserLanguage();
    console.log(data)
    this.setState({
      language: data.language,
      words: data.words,
    })
  }
  
  renderWordTiles = () => {
    if (this.state.words) return this.state.words.map((word, idx) => {
      return (
        <WordTile key={idx} word={word} />
      )
    })
  }

  renderTotalScore = () => {
    let correct = 0
    let incorrect = 0
    
    if (this.state.words) this.state.words.forEach(word => {
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
          {this.state.language.name}
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
