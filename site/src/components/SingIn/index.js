import React, { Component } from "react";
import './style.scss';
import Button from "./../Forms/Button/index.js"; // Fixed typo 'Buttton' to 'Button'
import FormInput from "../Forms/FormInput";
import { signInWithGoogle,auth } from "../../firebase/utils";


const initialState = {
  email: '',
  password: ''
}
class SignIn extends Component {
  constructor (props){
    super(props);
    this.state = {
      ...initialState

    };

    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(e){
    const {name,value } = e.target;
    this.setState({[name]: value});
  }

  handleSubmit = async (e) => {
    e.preventDefault();
    const {email,password} = this.state;

    try{
      await auth().signInWithEmailAndPassword(email ,  password);  
      this.state({
        ...initialState
      });
    } catch(e){
      console.log(e);
    }
  }

  render() {

    const{email,password} = this.state;

    return (
      <div className="signin">
        <div className="wrap">
          <h2>Log In</h2>
          <div className="formWrap">
            <form onSubmit={this.handleSubmit}>

              <FormInput
                type="email"
                name="email"
                value={email}
                placeholder = "Email"
                handleChange={this.handleChange}/>

              <FormInput
                type="password"
                name="password"
                value={password}
                placeholder = "Password"
                handleChange={this.handleChange}/>

                <Button type="submit">
                  Log in
                </Button>

              {/* <div className="socialSignin">
                <div className="row">
                  <Button onClick={signInWithGoogle}>
                    Sign In with Google
                  </Button>
                </div>
              </div> */}
            </form>
          </div>
        </div>
      </div>
    );
  }
}

export default SignIn;
