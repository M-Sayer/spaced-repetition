import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { Input, Label } from '../Form/Form'
import AuthApiService from '../../services/auth-api-service'
import Button from '../Button/Button'
import './RegistrationForm.css'

class RegistrationForm extends Component {
  static defaultProps = {
    onRegistrationSuccess: () => { }
  }

  state = { error: null }

  firstInput = React.createRef()

  handleSubmit = ev => {
    ev.preventDefault()
    const { name, username, password } = ev.target
    AuthApiService.postUser({
      name: name.value,
      username: username.value,
      password: password.value,
    })
      .then(user => {
        name.value = ''
        username.value = ''
        password.value = ''
        this.props.onRegistrationSuccess()
      })
      .catch(res => {
        this.setState({ error: res.error })
      })
  }

  componentDidMount() {
    this.firstInput.current.focus()
  }

  render() {
    const { error } = this.state
    return (
     <div className='signupSection'>
       <div className='info'>
         <h2>Sign up</h2>
         <p>
            Practice learning a language with the spaced reptition revision technique.
          </p>
       </div>
        <form className='signupForm'
          onSubmit={this.handleSubmit}
        >
          <div role='alert'>
            {error && <p>{error}</p>}
          </div>
          <div>
            <Label placeholder='test' htmlFor='registration-name-input'>Enter your name*
            </Label>
            <Input className='inputFields'
              type='text'
              ref={this.firstInput}
              id='registration-name-input'
              name='name'
              required
              placeholder='Enter your name'
            />
          </div>
          <div>
            <Label htmlFor='registration-username-input'>Choose a username*
            </Label>
            <Input className='inputFields'
              type='text'
              id='registration-username-input'
              name='username'
              required
              placeholder='Choose a username'
            />
          </div>
          <div>
            <Label htmlFor='registration-password-input'>Choose a password*
            </Label>
            <Input className='inputFields'
              id='registration-password-input'
              name='password'
              type='password'
              required
              placeholder='Choose a password'
            />
          </div>
          <Button className='joinBtn' type='submit'>
          Sign up
          </Button>
          <footer>
            Already have an account?
            <Link className='footerLink' to='/login'>Log in</Link>
          </footer>
        </form>
     </div>
    )
  }
}

export default RegistrationForm
