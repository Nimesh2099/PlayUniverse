import React, { Component } from "react";
import './style.scss';
import Button from "../Forms/Button"; // Fixed typo 'Buttton' to 'Button'
import { signInWithGoogle } from "../../firebase/utils";

class SignIn extends Component {

  handleSubmit = async (e) => {
    e.preventDefault();
    // You can add more login logic here if needed
  }

  render() {
    return (
      <div className="signin">
        <div className="wrap">
          <h2>Log In</h2>
          <div className="formWrap">
            <form onSubmit={this.handleSubmit}>
              <div className="socialSignin">
                <div className="row">
                  <Button onClick={signInWithGoogle}>
                    Sign In with Google
                  </Button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

export default SignIn;
