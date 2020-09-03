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
    guess: ''
  }

  handleSubmit = e => {
    e.preventDefault();
    console.log(this.state)
    LanguageApiService.postGuess(this.state)
  }

  handleChange = e => {
    this.setState({ guess: e.target.value })
  }

  async componentDidMount() {
    const res = await LanguageApiService.getLanguageHead();
    this.context.setDisplayWord({
      name: res.nextWord,
      total_score: res.totalScore,
      correct_count: res.wordCorrectCount,
      incorrect_count: res.wordIncorrectCount, 
    })
  }

  render() {
    return (
      <section className='signupSection'>
       <div className='info'>
         <h2>Learn</h2>
         <p>
            Practice learning a language with the spaced reptition revision technique.
          </p>
       </div>
       <WordTile displayWord={this.context.displayWord}/>
        <form className='learnForm' onSubmit={(e) => this.handleSubmit(e)}>
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
