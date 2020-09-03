import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { Input, Required, Label } from '../../components/Form/Form'
import LanguageApiService from '../../services/language-api-service'
import Button from '../../components/Button/Button'
import '../../components/RegistrationForm/RegistrationForm.css'

class LearningRoute extends Component {

  handleSubmit = ev => {}

  componentDidMount() {
    
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
        <form className='learnForm' onSubmit={this.handleSubmit}>
         <h4 className='learn-word'>Bon</h4>
          <div>
            <label htmlFor='answer1'>Hello</label>
            <input className='inputFields'
              type='text'
              ref={this.firstInput}
              id='guess'
              required
            /> 
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
