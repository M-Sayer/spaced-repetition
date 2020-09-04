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
  }
  
  renderWordTiles = () => {
    if (this.context.words) return this.context.words.map((word, idx) => {
      return (
        <li>
          <h4>
            {word.original}
          </h4>
          <h5>
            {word.translation}
          </h5>
          <p>
            correct answer count: {word.correct_count}
          </p>
          <p>
            incorrect answer count: {word.incorrect_count}
          </p>
        </li>
      )
    })
  }
  
  render() {
    return (
      <section className='dash'>
        <h2>
        {this.context.language.name}
        </h2>
        <div className='score-box'>
        <p>Total correct answers: {this.context.language.total_score}</p>
        </div>
        <Link to='/learn'>Start practicing</Link>
        <h3>Words to practice</h3>
        <ul className='word-class-wrapper'>
          {this.renderWordTiles()}
        </ul>

      </section>
    );
  }
}

export default DashboardRoute
