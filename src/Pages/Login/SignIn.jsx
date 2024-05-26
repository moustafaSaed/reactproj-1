import React, { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import Header from '../../Components/General/Header/Header';
import Footer from '../../Components/General/Footer/Footer';
import "./login.css";
import SignUp from './SignUp';
import { Link, useNavigate } from 'react-router-dom';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../../firebase/config';

const SignIn = () => {
    const navigate = useNavigate();
    const [email, setMail] = useState('');
    const [password, setPass] = useState();
    const [errorMess, setErr] = useState("");
    const [errorState, setErrState] = useState(false);
    const [errCode, setErrCode] = useState("");
    return (
        <div className='sign-in'>
            <Helmet>
                <title>Muslim | Sign In</title>
            </Helmet>
            <Header />
            <div className='flx-center main' style={{ height: "84vh" }}>
                {!errorState && <form action="">
                    <h2>sign in <span className="logo-txt">muslim</span></h2>
                    <input onChange={(e) => { setMail(e.target.value) }} required type="email" placeholder='Ex: a@b.com' />
                    <input onChange={(e) => { setPass(e.target.value) }} required type="password" placeholder='Password' />
                    <input onClick={(e) => {
                        e.preventDefault();
                        signInWithEmailAndPassword(auth, email, password)
                            .then((userCredential) => {
                                // Signed in 
                                const user = userCredential.user;
                                navigate("/");
                                // ...
                            })
                            .catch((error) => {
                                const errorCode = error.code;
                                const errorMessage = error.message;
                                setErrState(true);
                                switch (errorCode) {
                                    case "auth/invalid-email":
                                        setErrCode("Error Mous : there is a wrong in the written email");
                                        break;
                                    case "auth/invalid-credential":
                                        setErrCode("Error Mous : may be there is an error in your pass ,, check about capital and small letters, language of your keyboard, all over the password.");
                                        break;
                                    default:
                                        setErrCode(errorCode);
                                        break;
                                }
                            });
                    }} className='' type="button" value="sign in" />
                </form>}
                {!errorState && <div className='out-lnk'>
                    <p>don't have an account ? </p>
                    <Link to='/signup'>
                        sign up
                        <i class="fa-solid fa-arrow-up-right-from-square"></i>
                    </Link>
                </div>}
                {errorState &&
                    <div className="err">
                        {errCode}
                    </div>
                }

            </div>
            <Footer />
        </div>
    )
}

export default SignIn;