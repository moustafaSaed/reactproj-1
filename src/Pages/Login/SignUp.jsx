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
import { useTranslation } from 'react-i18next';
import  ReactLoading  from 'react-loading';



const SignUp = () => {
    const { t, i18n } = useTranslation(); // new
    const [errCode, setErrCode] = useState("");
    const [errorState, setErrState] = useState(false);
    const navigate = useNavigate();
    const [email, setMail] = useState("");
    const [password, setPass] = useState("");
    const [name, setName] = useState("");
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
                    {i18n.language === 'en' && <title>Muslim | Sign Up</title>}
                    {i18n.language === 'ar' && <title>مُـسـلِـم  |  إنشاء حساب</title>}
                </Helmet>
                <Header />
                <div className='flx-center main' style={{ height: "84vh" }}>
                    <ReactLoading type={'bubbles'} color={'var(--brwn)'} height={55} width={55} />
                </div>
                <Footer />
            </div>
        )
    }
    // 2- WHEN FINISH LOADING BUT NOT A USER
    if (!user) {
        return (
            <div className='sign-up'>
                <Helmet>
                    {i18n.language === 'en' && <title>Muslim | Sign Up</title>}
                    {i18n.language === 'ar' && <title>مُـسـلِـم  |  إنشاء حساب</title>}
                </Helmet>
                <Header />
                <main>
                    <div className='overlay flx-center'>
                        {!errorState && <form className='sign-in' action="">
                            <h2>{t('regist')}</h2>
                            <input onChange={(e) => { setName(e.target.value) }} required type="text" placeholder={t('name')} />
                            <input onChange={(e) => { setMail(e.target.value) }} required type="email" placeholder={t('emailEx')} />
                            <input onChange={(e) => { setPass(e.target.value) }} required type="password" placeholder={t('password')} />
                            <input className='btn' type="button" value={t('regist')} onClick={(e) => signUpFunc(e)} />
                        </form>}
                        {!errorState && <div className='out-lnk'>
                            {i18n.language === 'ar' && <p>هل بالفعل تمتلك حساباً ؟ </p>}
                            {i18n.language === 'en' && <p>already have an account ? </p>}
                            <Link to='/signin'>
                                {t('signin')}
                                <i style={{margin:'auto 15px'}} className="fa-solid fa-arrow-up-right-from-square"></i>
                            </Link>
                        </div>}
                        {errorState &&
                            <div className="err">
                                {errCode}
                                <div className='btn try-again' onClick={() => setErrState(false)}>{i18n.language=='en'?'try again ..':'حاول مرّة أخرى ..'}</div>
                            </div>
                        }
                    </div>
                </main>
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