import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import M from "materialize-css/dist/js/materialize.min.js" 
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';
import { useNavigate } from "react-router-dom";
import {setEmail as setEmailInStore} from './loginSlice';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    let navigate = useNavigate();
    const dispatch = useDispatch();

    const handleOnChange = (e) => {
        if (e.target.id === "email") {
            setEmail(e.target.value);
        } else if (e.target.id === "password") {
            setPassword(e.target.value);
        }
    }

    const  handleOnSubmit = (e) => {
        const authentication = getAuth();
          signInWithEmailAndPassword(authentication, email, password)
            .then((response) => {
              sessionStorage.setItem('Auth Token', response._tokenResponse.refreshToken);
              dispatch(setEmailInStore(email));
              navigate('/')
            })
            .catch((error) => {
              console.log(error.code)
              if (error.code === 'auth/wrong-password') {
                M.toast({html: 'Please check the Password'});
              }
              if (error.code === 'auth/user-not-found') {
                M.toast({html: 'Please check the Email'});
              }
            })
    }
    return (
        <div>
            <h3>Login</h3>
            <div class="row">
                <div class="input-field col s12">
                    <input id="email" type="email" class="validate" value={email} onChange={handleOnChange} />
                    <label for="email">Email</label>
                </div>
            </div>
            <div class="row">
                <div class="input-field col s12">
                    <input id="password" type="password" class="validate"  value={password} onChange={handleOnChange} />
                    <label for="password">Password</label>
                </div>
            </div>
            <button class="btn waves-effect waves-light" type="submit" name="action" onClick={handleOnSubmit}>Login
                <i class="material-icons right">send</i>
            </button>
        </div>
    )
}
export default Login;
