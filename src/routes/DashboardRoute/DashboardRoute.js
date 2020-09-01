import React, { Component } from 'react'
import LanguageApiService from '../../services/language-api-service';
import './DashboardRoute.css'

class DashboardRoute extends Component {
  state = {
    language: '',
    words: '',
  }

  async componentDidMount() {
    const data = await LanguageApiService.getUserLanguage();
    this.setState({
      language: data.language,
      words: data.words,
    })
  }
  
  renderWords = () => {
    if (this.state.words) return this.state.words.map(word => {
      return (
        <div className='word'>
          <section>original: {word.original}</section>
          <section>translation:{word.translation}</section>
        </div>
      )
    })
  }
  
  render() {
    return (
      <section className='dash'>
        implement and style me
        <div>
          language:
          {this.state.language.name}
        </div>
        words for language:
        {this.renderWords()}
        total score:

        start learning:
      </section>
    );
  }
}

export default DashboardRoute
