// @ts-nocheck
import React, { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import Header from '../../Components/General/Header/Header';
import Footer from '../../Components/General/Footer/Footer';
import '../../firebase/config';
import { Link, useNavigate } from 'react-router-dom';
import { getAuth, createUserWithEmailAndPassword, updateProfile, sendEmailVerification } from "firebase/auth";
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '../../firebase/config';
import './login.css';



const SignUp = () => {
    const [errCode, setErrCode] = useState("");
    const [errorMess, setErr] = useState("");
    const [errorState, setErrState] = useState(false);
    const navigate = useNavigate();
    const [email, setMail] = useState("");
    const [password, setPass] = useState("");
    const [name, setName] = useState("");
    const [phone, setPhone] = useState(``);
    const [user, loading, error] = useAuthState(auth);

    const signUpFunc = (e) => {
        e.preventDefault();
        createUserWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                // Signed up 
                const user = userCredential.user;

                const auth = getAuth();
                sendEmailVerification(auth.currentUser)
                    .then(() => {
                        // Email verification sent!
                        // ...
                    });

                updateProfile(auth.currentUser, {
                    displayName: name,
                }).then(() => {
                    // Profile updated!

                }).catch((error) => {
                    // An error occurred
                    // ...
                });
                console.log("Doneeeeeeeeeeeeee");
                navigate("/");
                // ...
            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                setErrState(true);
                switch (errorCode) {
                    case "auth/email-already-in-use":
                        setErrCode(`Error Mous : please try another email because ${email} is already in use`);
                        break;
                    case "auth/invalid-email":
                        setErrCode(`Error Mous : check the email: may be invalid or empty`);
                        break;
                    case "auth/weak-password":
                        setErrCode(`Error Mous : weak password; your password should be at least 6 characters`);
                        break;
                    case "auth/missing-password":
                        setErrCode(`Error Mous : you can't sign up without writing a password`);
                        break;
                    case "auth/missing-email":
                        setErrCode(`Error Mous : you can't sign up without writing an email`);
                        break;
                    default:
                        setErrCode(errorCode);
                        break;
                }
                // ..
            });
    }

    // 1- WHEN LOADING
    if (loading) {
        return (
            <div>
                <Helmet>
                    <title>Muslim | Sign Up</title>
                </Helmet>
                <Header />
                <div className='flx-center main' style={{ height: "84vh" }}>
                    <div className="loading">Mous :: Loading ..</div>
                </div>
                <Footer />
            </div>
        )
    }
    // 2- WHEN FINISH LOADING BUT NOT A USER
    if (!user) {
        return (
            <div>
                <Helmet>
                    <title>Muslim | Sign Up</title>
                </Helmet>
                <Header />
                <div className='flx-center main' style={{ height: "84vh" }}>
                    {!errorState && <form className='sign-in' action="">
                        <h2>Regist at <span className="logo-txt">muslim</span></h2>
                        <input onChange={(e) => { setName(e.target.value) }} required type="text" placeholder='Name  :' />
                        <input onChange={(e) => { setMail(e.target.value) }} required type="email" placeholder='Email  :' />
                        <input onChange={(e) => { setPass(e.target.value) }} required type="password" placeholder='password  :' />
                        <input className='' type="button" value="regist" onClick={(e) => signUpFunc(e)} />
                    </form>}
                    {!errorState && <div className='out-lnk'>
                        <p>already have an account ? </p>
                        <Link to='/signin'>
                            sign in
                            <i className="fa-solid fa-arrow-up-right-from-square"></i>
                        </Link>
                    </div>}
                    {errorState &&
                        <div className="err">
                            {errCode}
                            <div className='try-again' onClick={() => setErrState(false)}>try again ..</div>
                        </div>
                    }
                </div>
                <Footer />
            </div>
        )
    }

    // 3- WHEN USER 
    if (user) {
        // 3- not verifiet yet ..
        if (!user.emailVerified) {
            return (
                <div>
                    <Helmet>
                        <title>Muslim | Sign Up</title>
                    </Helmet>
                    <Header />
                    <div className='flx-center main' style={{ height: "84vh" }}>
                        <h1>welcome {user.displayName}</h1>
                        <p>please verify your email before browsing </p>
                        <div className="btn light-btn">Resend Verfication Email</div>
                    </div>
                    <Footer />
                </div>
            )
        }
        if (user.emailVerified) {
            navigate('/');
        }
    }

}

export default SignUp;