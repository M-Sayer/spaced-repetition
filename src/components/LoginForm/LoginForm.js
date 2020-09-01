import React, { Component } from 'react'
import { Input, Label } from '../Form/Form'
import AuthApiService from '../../services/auth-api-service'
import UserContext from '../../contexts/UserContext'
import Button from '../Button/Button'
import './LoginForm.css'

class LoginForm extends Component {
  static defaultProps = {
    onLoginSuccess: () => { }
  }

  static contextType = UserContext

  state = { error: null }

  firstInput = React.createRef()

  handleSubmit = ev => {
    ev.preventDefault()
    const { username, password } = ev.target

    this.setState({ error: null })

    AuthApiService.postLogin({
      username: username.value,
      password: password.value,
    })
      .then(res => {
        username.value = ''
        password.value = ''
        this.context.processLogin(res.authToken)
        this.props.onLoginSuccess()
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
      <div className='loginSection'>
        <form
          className='loginForm'
          onSubmit={this.handleSubmit}
        >
          <div role='alert'>
            {error && <p>{error}</p>}
          </div>
          <div>
            <Label htmlFor='login-username-input'>
            </Label>
            <Input className='inputFields'
              ref={this.firstInput}
              id='login-username-input'
              name='username'
              required
              placeholder='Username'
            />
          </div>
          <div>
            <Label htmlFor='login-password-input'>
            </Label>
            <Input className='inputFields'
              id='login-password-input'
              name='password'
              type='password'
              required
              placeholder='password'
            />
          </div>
          <Button className='loginBtn' type='submit'>
            Login
          </Button>
        </form>
      </div>
    )
  }
}

export default LoginForm
