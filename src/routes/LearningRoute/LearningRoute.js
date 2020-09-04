import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { Input, Required, Label } from '../../components/Form/Form'
import LanguageApiService from '../../services/language-api-service'
import Button from '../../components/Button/Button'
import '../../components/RegistrationForm/RegistrationForm.css'
import LanguageContext from '../../contexts/LanguageContext';
import WordTile from '../../components/Dashboard/WordTile';

class LearningRoute extends Component {
  static contextType = LanguageContext;

  state = {
    guess: '',
    isCorrect: '',
    answer: '',
  }

  handleSubmit = async e => {
    e.preventDefault();
    const res = await LanguageApiService.postGuess(this.state.guess)
    console.log(res)
    console.log(this.context)
    this.setState({ isCorrect: res.isCorrect, answer: res.answer })

  }

  handleChange = e => {
    this.setState({ guess: e.target.value })
  }

  async componentDidMount() {
    const res = await LanguageApiService.getLanguageHead();
    console.log(res)
    this.context.setDisplayWord({
      name: res.nextWord,
      correct_count: res.wordCorrectCount,
      incorrect_count: res.wordIncorrectCount, 
    });
    this.context.setTotalScore(res.totalScore);
  }

  renderSubmitResponse = () => {
    if (this.state.isCorrect) return (
      <div className='correct'>
        correct!
      </div>
    )

    if (this.state.isCorrect === false) return (
      <div className='incorrect'>
        incorrect... the correct answer is: {this.state.answer}
      </div>
    )
  }

  render() {
    return (
      <section className='learn'>
       <div className='info'>
         <h2>Learn</h2>
       </div>
       <WordTile totalScore={this.context.totalScore} displayWord={this.context.displayWord} />
        {this.renderSubmitResponse()}
        <form className='learnForm' 
          onSubmit={(e) => this.handleSubmit(e)}>
          <div>
            <label> 
              <input
              value={this.state.guess}
              onChange={(e) => this.handleChange(e)} 
              placeholder='answer' 
              className='guess' type='text' required /> 
            </label>
          </div>
          
          <Button className='joinBtn' type='submit'>
          Submit
          </Button>
          <footer>
            Need a Hint?
            {' '}
            <Link className='footerLink' to='https://www.youtube.com/watch?v=gd4TwRdlMxM'>Get Help</Link>
          </footer>
        </form>
     </section>
    );
  }
}

export default LearningRoute
