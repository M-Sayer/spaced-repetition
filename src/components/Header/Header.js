import React, { Component } from "react";
import { Link } from "react-router-dom";
import TokenService from "../../services/token-service";
import UserContext from "../../contexts/UserContext";
import "./Header.css";

class Header extends Component {
  static contextType = UserContext;

  handleLogoutClick = () => {
    this.context.processLogout();
  };

  renderLogoutLink() {
    return (
      <div>
        <span>{this.context.user.name}</span>
        <Link onClick={this.handleLogoutClick} to="/login">
          Logout
        </Link>
      </div>
    );
  }

  renderLoginLink() {
    return (
      <>
        <Link
          className="loginLink"
          activeClassName="loginLinkActive"
          to="/login">
          Login
        </Link>{" "}
        <Link
          className="loginLink"
          activeClassName="loginLinkActive"
          to="/register">
          Sign up
        </Link>
      </>
    );
  }

  render() {
    return (
      <header className='animate__animated animate__backInUp'>
        <h1>
          <Link className="headerLink" to="/">
            Spaced repetition
          </Link>
        </h1>
        <nav>
          {TokenService.hasAuthToken()
            ? this.renderLogoutLink()
            : this.renderLoginLink()}
        </nav>
      </header>
    );
  }
}

export default Header;
