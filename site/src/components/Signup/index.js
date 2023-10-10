import React, { Component } from 'react';
import './style.scss';

import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth'; // Updated import

import FormInput from '../Forms/FormInput';
import Button from './../Forms/Button';
import { handleUserProfile } from './../../firebase/utils';

const initialState = {
  displayName: '',
  email: '',
  password: '',
  confirmPassword: '',
  errors: [],
};

class Signup extends Component {
  constructor(props) {
    super(props);
    this.state = {
      ...initialState,
    };

    this.handleChange = this.handleChange.bind(this);
  }

  handleChange = (e) => {
    const { name, value } = e.target;
    this.setState({
      [name]: value,
    });
  };

  handleFormSubmit = async (e) => {
    e.preventDefault();

    const { displayName, email, password, confirmPassword } = this.state;

    if (password !== confirmPassword) {
      const err = ["Password Don't Match"];
      this.setState({
        errors: err,
      });

      return;
    }

    try {
      // Initialize Firebase auth
      const auth = getAuth();

      // Attempt to create a new user with email and password
      const { user } = await createUserWithEmailAndPassword(auth, email, password);

      // Store additional user information (displayName) in the user profile
      // await handleUserProfile(user, { displayName });

      // Reset the form and clear any errors
      this.setState({
        ...initialState,
      });

      // You can also perform additional actions, such as redirecting the user to a different page.
    } catch (e) {
      console.log(e);
      // Handle any errors that occurred during user registration, such as displaying an error message to the user.

      // Clear errors in case of an error
      this.setState({
        errors: [],
      });
    }
  };

  render() {
    const { displayName, email, password, confirmPassword, errors } = this.state;
    return (
      <div className="signup">
        <div className="wrap">
          <h2>Sign Up</h2>

          {errors.length > 0 && (
            <ul>
              {errors.map((err, index) => {
                return (
                  <li key={index}>
                    {err}
                  </li>
                );
              })}
            </ul>
          )}
          <div className="formWrap">
            <form onSubmit={this.handleFormSubmit}>
              <FormInput
                type="text"
                name="displayName"
                value={displayName}
                placeholder="Full Name"
                onChange={this.handleChange}
              />

              <FormInput
                type="email"
                name="email"
                value={email}
                placeholder="Email"
                onChange={this.handleChange}
              />

              <FormInput
                type="password"
                name="password"
                value={password}
                placeholder="Password"
                onChange={this.handleChange}
              />

              <FormInput
                type="password"
                name="confirmPassword"
                value={confirmPassword}
                placeholder="Confirm Password"
                onChange={this.handleChange}
              />

              <Button type="submit">Register</Button>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

export default Signup;
