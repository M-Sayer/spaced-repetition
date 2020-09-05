import React, { Component } from 'react'
import LanguageApiService from '../../services/language-api-service'
import Button from '../../components/Button/Button'
import '../../components/RegistrationForm/RegistrationForm.css'
import LanguageContext from '../../contexts/LanguageContext';

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
      <>
        <div className='DisplayScore'>
          <p>
            Your total score is: {this.context.totalScore}
          </p>
        </div>
        <div className='DisplayFeedback'>
          <h2>
            You were correct! :D
          </h2>
          <p>
            The correct translation for {this.context.displayWord.name} was {this.state.answer} and you chose {this.state.guess}!
          </p>
        </div>
      </>
    )

    if (this.state.isCorrect === false) return (
      <>
        <div className='DisplayScore'>
          <p>
            Your total score is: {this.context.totalScore}
          </p>
        </div>
        <div className='DisplayFeedback'>
        <h2>
          {'Good try, but not quite right :('}
        </h2>
          <p className='learn-count'>
            The correct translation for {this.context.displayWord.name} was {this.state.answer} and you chose {this.state.guess}!
          </p>
        </div>
      </>
    )
  }

  renderDisplayWord = () => {
    const word = this.context.displayWord;
    return (
      <div>
        <h2>
          Translate the word:
        </h2>
        <span className='learn-word'>
          {word.name}
        </span>
        <p className='learn-total-score'>Your total score is: {this.context.totalScore} </p>
        <p className='learn-count'> You have answered this word correctly <span className='correctCount'>{word.correct_count}</span> times. </p>
        <p className='learn-count'> You have answered this word incorrectly <span className='incorrectCount'>{word.incorrect_count}</span> times. </p>
      </div>
    )
}

  render() {
    return (
      <section className='learn'>
       {this.renderDisplayWord()}
        {this.renderSubmitResponse()}
        {this.state.submit &&        
          <form className='learnForm' onSubmit={(e) => this.handleSubmit(e)}>
            <div>
              <label htmlFor='learn-guess-input'>What's the translation for this word?
                <input
                value={this.state.guess}
                onChange={(e) => this.handleChange(e)} 
                placeholder='answer' 
                id='learn-guess-input'
                className='guess-input' type='text' required /> 
              </label>
            </div>
            <Button className='joinBtn' type='submit'>
              Submit your answer
            </Button>
          </form>
        }
        {!this.state.submit && 
          <Button onClick={() => this.setState({ next: true })}>
            Try another word!
          </Button>
        }
        
     </section>
    );
  }
}

export default LearningRoute
