import React, { useState } from 'react';
//import {registerUser} from './RegistrationService';
import { collection, doc, setDoc } from "firebase/firestore";
import M from "materialize-css/dist/js/materialize.min.js" 
import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth';
import { useNavigate } from "react-router-dom";
import { db } from '../../helpers/firebaseHelper';


export default function Registration() {
    const [fname, setFname] = useState('');
    const [lname, setLname] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [cpassword, setCPassword] = useState('');
    let navigate = useNavigate();
    const usersRef = collection(db, "users")
    

    const handleOnChange = (e) => {
        if (e.target.id === "first_name") {
            setFname(e.target.value);
        } else if (e.target.id === "last_name") {
            setLname(e.target.value);
        } else if (e.target.id === "email") {
            setEmail(e.target.value);
        } else if (e.target.id === "password") {
            setPassword(e.target.value);
        } else if (e.target.id === "cpassword") {
            setCPassword(e.target.value);
        }
    }

    const  handleOnSubmit = (e) => {
        e.preventDefault();
        if (password !== cpassword) {
            M.toast({html: 'password and confirm password did not match'})
            alert("password and confirm password did not match");
        } else if(!fname || !lname || !email || !password) {
            M.toast({html: 'enter all the details'});
        } else {
            const authentication = getAuth();
            createUserWithEmailAndPassword(authentication, email, password)
                .then(async (response) => {
                    console.log(response);
                    await setDoc(doc(usersRef, email), {
                        fname: fname,
                        lname: lname,
                        email: email
                      });
                    sessionStorage.setItem('Auth Token', response._tokenResponse.refreshToken);
                    navigate('/login');
                }).catch((error) => {
                    const errorCode = error.code;
                    const errorMessage = error.message;
                    console.log(errorCode, errorMessage);
                    M.toast({html: errorMessage});
                  });
        }
    }

    return (
        <div>
            <h3>Registration</h3>
            <div class="row">
                <form class="col s12">
                    <div class="row">
                        <div class="input-field col s6">
                            <i class="material-icons prefix">account_circle</i>
                            <input id="first_name" type="text" class="validate" value={fname} onChange={handleOnChange} />
                            <label for="first_name">First Name</label>
                        </div>
                        <div class="input-field col s6">
                            <input id="last_name" type="text" class="validate" value={lname} onChange={handleOnChange}/>
                            <label for="last_name">Last Name</label>
                        </div>

                        <div class="row">
                            <div class="input-field col s12">
                                <input id="email" type="email" class="validate" value={email} onChange={handleOnChange} />
                                <label for="email">Email</label>
                            </div>
                        </div>
                        <div class="row">
                            <div class="input-field col s12">
                                <input id="password" type="password" class="validate" value={password} onChange={handleOnChange}/>
                                <label for="password">Password</label>
                            </div>
                        </div>
                        <div class="row">
                            <div class="input-field col s12">
                                <input id="cpassword" type="password" class="validate" value={cpassword} onChange={handleOnChange}/>
                                <label for="cpassword">Confirm Password</label>
                            </div>
                        </div>
                        <button class="btn waves-effect waves-light" onClick={handleOnSubmit}>Submit
                            <i class="material-icons right">send</i>
                        </button>
                    </div>
                </form>
            </div>
        </div>

    )
}
