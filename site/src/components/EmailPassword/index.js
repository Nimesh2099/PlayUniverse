//Redirection Requied 
//On Submit is not working need to fix

import React,{Component} from 'react';
// import {withRouter} from 'react-router-dom';
import './style.scss';

import AuthWrapper from '../AuthWrapper/index';
import FormInput from '../Forms/FormInput';
import Button from './../Forms/Button';

import { auth } from '../../firebase/utils';
 
const initialState = {
    email: '',
    err: []
};

class EmailPassword extends Component{
    constructor(props){
        super(props);
        this.state = {
            ...initialState
        };

        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(e){
        const {name,value} = e.target;
        this.setState({
            [name]: value
        })
    }

    handleSubmit = async (e) => {
       e.preventDefault();
        
        try{

            const {email} = this.state;

            const config = {
                url:'http://localhost:3000/login'
            };

            await auth.sendPasswordResetEmail(email,config)
             .then(()=>{
                console.log('reset password link sent');
             })
             .catch(()=>{
                const err = ['Email Not Found Please Try Again']
                this.setState({
                    err: err
                })
             })

        } catch(e) {
            console.log(e);
        }
    }
    render(){

        const {email,err} = this.state;

        const cngAuthWrapper = {

            headline: 'Recover Your Account'
      
          };
        return(
            <AuthWrapper {...cngAuthWrapper}>
                <div className='form-Wrap'>

                    {err.length > 0 && (
                        <ul>
                            {err.map((e,index)=>{
                                return (
                                    <li key={index}>
                                        {e}
                                    </li>
                                );
                            })}
                        </ul>
                    )}
                    <form onSubmit={this.handleSubmit}>
                        <FormInput 
                         type="email"
                         name="email"
                         value={email}
                         placeholder="Email"
                         onChange={this.handleChange}
                        />
                    </form>

                    <Button type="submit">
                        Recover Password
                    </Button>
                </div>
            </AuthWrapper>
        );
    }
}

export default EmailPassword;