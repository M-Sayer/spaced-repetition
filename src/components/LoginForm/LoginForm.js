import React, { Component } from "react";
import { Link } from "react-router-dom";
import { Input, Label } from "../Form/Form";
import AuthApiService from "../../services/auth-api-service";
import UserContext from "../../contexts/UserContext";
import Button from "../Button/Button";
import "./LoginForm.css";

class LoginForm extends Component {
  static defaultProps = {
    onLoginSuccess: () => {},
  };

  static contextType = UserContext;

  state = { error: null };

  firstInput = React.createRef();

  handleSubmit = (ev) => {
    ev.preventDefault();
    const { username, password } = ev.target;

    this.setState({ error: null });

    AuthApiService.postLogin({
      username: username.value,
      password: password.value,
    })
      .then((res) => {
        username.value = "";
        password.value = "";
        this.context.processLogin(res.authToken);
        this.props.onLoginSuccess();
      })
      .catch((res) => {
        this.setState({ error: res.error });
      });
  };

  componentDidMount() {
    this.firstInput.current.focus();
  }

  render() {
    const { error } = this.state;
    return (
      <div className="loginSection animate__animated animate__backInDown">
        <div className="info">
          <h2>Login</h2>
          <p> Practice learning a language with </p>
          <p> the spaced reptition revision technique. </p>
        </div>
        <section>
          <form className="loginForm" onSubmit={this.handleSubmit}>

            <div role="alert">{error && <p>{error}</p>}</div>

            <div className='input-box'>
              <Label htmlFor="login-username-input"> Username </Label>
              <Input
                className="inputFields"
                ref={this.firstInput}
                id="login-username-input"
                name="username"
                type='text'
                required
                placeholder="Username"/>
              
            </div>
            <div className='input-box'>
              <Label htmlFor="login-password-input">Password</Label>
              <Input
                className="inputFields"
                id="login-password-input"
                name="password"
                type="password"
                required
                placeholder="password"
              />
            </div>
            <Button className="loginBtn" type="submit">
              Login
            </Button>
            <footer>
              Don't have an account?{" "}
              <Link className="footerLink" to="/register">
                Sign up
              </Link>
            </footer>
          </form>
        </section>
      </div>
    );
  }
}

export default LoginForm;
