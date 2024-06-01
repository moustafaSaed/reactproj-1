import React, { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import Header from '../../Components/General/Header/Header';
import Footer from '../../Components/General/Footer/Footer';
import "./login.css";
import { Link, useNavigate } from 'react-router-dom';
import { sendPasswordResetEmail, signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../../firebase/config';

const SignIn = () => {
    // HOOKS
    const navigate = useNavigate();
    const [email, setMail] = useState('');
    const [resetMail, setResetMail] = useState('');
    const [password, setPass] = useState('');
    const [errorState, setErrState] = useState(false);
    const [errCode, setErrCode] = useState("");
    const [classM, setClass] = useState("");
    const [ClassForm, setClassForm] = useState("hide");
    const [resetErr, setResetErr] = useState(false);
    useEffect(() => { // to reset when refresh ..
        setClass('');
        setClassForm('hide');
    },[])
    // FUNCTIONS
    const passResetFunc = (e)=>{
        e.preventDefault();
        setClass('show');

        sendPasswordResetEmail(auth, resetMail)
            .then(() => {
                // Password reset email sent!
                setTimeout(() => {
                    window.location.reload();
                }, 4000);
                // ..
            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                console.log(errorCode);
                console.log(errorMessage);
                setErrCode(errorCode);
                setResetErr(true);
                setTimeout(() => {
                    window.location.reload();
                }, 4000);
                // ..
            });
    }
    const signInFunc = (e)=>{
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
                    case "auth/missing-password":
                        setErrCode("Error Mous : Please Write Your Password");
                        break;
                    default:
                        setErrCode(errorCode);
                        break;
                }
            });
    }

    return (
        <div className='sign-in'>
            <Helmet>
                <title>Muslim | Sign In</title>
            </Helmet>
            <Header />
            <div className='flx-center main' style={{ height: "84vh" }}>
                {/* FORGOT PASSWORD FORM */}
                <form action="" className={`forgot ${ClassForm}`}>
                    <div className="close-icn">
                        <i className="fa-regular fa-rectangle-xmark" onClick={() => setClassForm('hide')}></i>
                    </div>
                    <input onChange={(e) => { setResetMail(e.target.value) }} required type="email" placeholder='Ex: a@b.com' />
                    <button className='btn' onClick={(e) => passResetFunc(e)}>reset</button>
                    {resetErr&&<div style={{backgroundColor:'indianred'}} className={`mess ${classM}`}>Mous Error : {errCode}</div>}
                    {!resetErr&&<div className={`mess ${classM}`}>Please Check you email to reset your password</div>}

                    
                </form>
                {/* MAIN SIGN IN FORM */}
                {!errorState && <form className='sign-in' action="">
                    <h2>sign in <span className="logo-txt">muslim</span></h2>
                    <input onChange={(e) => { setMail(e.target.value) }} required type="email" placeholder='Ex: a@b.com' />
                    <input onChange={(e) => { setPass(e.target.value) }} required type="password" placeholder='Password' />
                    <input onClick={(e) => signInFunc(e)} className='' type="button" value="sign in" />
                    <div className="forget-link" onClick={() => setClassForm('show')}>forget my pass</div>
                </form>}
                {!errorState && <div className='out-lnk'>
                    <p>don't have an account ? </p>
                    <Link to='/signup'>
                        sign up
                        <i className="fa-solid fa-arrow-up-right-from-square"></i>
                    </Link>
                </div>}
                {errorState && // WHEN AN ERROR OCCUR
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

export default SignIn;