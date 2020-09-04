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
    submit: true,
    next: false,
  }

  getData = async () => {
    //get word at top of list to display to user
    const res = await LanguageApiService.getLanguageHead();
    console.log('mount: ', res)
    this.context.setDisplayWord({
      name: res.nextWord,
      correct_count: res.wordCorrectCount,
      incorrect_count: res.wordIncorrectCount, 
    });
    this.context.setTotalScore(res.totalScore);
  }

  componentDidMount() {
    this.getData();
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.next !== this.state.next) { 
      this.setState({ 
        guess: '',
        isCorrect: '',
        answer: '',
        submit: true,
        next: false,
      })
      this.getData();
      console.log('updated word and scores')
    }
  }

  handleSubmit = async e => {
    e.preventDefault();
    //when user submits, update scores for current display word
    const res = await LanguageApiService.postGuess(this.state.guess)
    console.log('submit: ',res)
    console.log(this.context)
    //update score for current word and total score
    if (res.isCorrect) {
      this.context.setDisplayWord({
        ...this.context.displayWord,
        correct_count: this.context.displayWord.correct_count+=1
      })
    }

    if (!res.isCorrect) {
      this.context.setDisplayWord({
        ...this.context.displayWord,
        incorrect_count: this.context.displayWord.incorrect_count+=1
      })
    }

    this.context.setTotalScore(res.totalScore)

    this.setState({ isCorrect: res.isCorrect, answer: res.answer })
    //toggle submit to false to display next button
    this.setState({ submit: false })
  }

  handleChange = e => {
    this.setState({ guess: e.target.value })
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
        {this.state.submit &&        
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
          </form>
        }
        {!this.state.submit && 
          <Button onClick={() => this.setState({ next: true })}>
            Next
          </Button>
        }
        {/* <footer>
            Need a Hint?
            {' '}
            <Link className='footerLink' to='https://www.youtube.com/watch?v=gd4TwRdlMxM'>Get Help</Link>
        </footer> */}
     </section>
    );
  }
}

export default LearningRoute
