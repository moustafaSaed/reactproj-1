import React, { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import Header from '../../Components/General/Header/Header';
import Footer from '../../Components/General/Footer/Footer';
import "./login.css";
import { Link, useNavigate } from 'react-router-dom';
import { sendPasswordResetEmail, signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../../firebase/config';
import { useTranslation } from 'react-i18next';

const SignIn = () => {
    // HOOKS
    const { t, i18n } = useTranslation(); // new
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
    }, [])
    // FUNCTIONS
    const passResetFunc = (e) => {
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
    const signInFunc = (e) => {
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
                {i18n.language === 'en' && <title>Muslim | Sign In</title>}
                {i18n.language === 'ar' && <title>مُـسـلِـم  |  تسجيل الدخول</title>}
            </Helmet>
            <Header />
            <main>
                <div className='overlay flx-center'>
                    {/* FORGOT PASSWORD FORM */}
                    <form action="" className={`flx-center forgot ${ClassForm}`}>
                        <div className="close-icn">
                            <i className="fa-regular fa-rectangle-xmark" onClick={() => setClassForm('hide')}></i>
                        </div>
                        {i18n.language === 'en' &&<p>write your email to send you mess to easily reset your password ..</p>}
                        {i18n.language === 'ar' &&<p>برجاء إدخال ايميلك لنرسل لك رسالة تحقيق لسهولة إستعادة كلمة السر</p>}
                        <input onChange={(e) => { setResetMail(e.target.value) }} required type="email" placeholder='Ex: a@b.com' />
                        <button className='btn' onClick={(e) => passResetFunc(e)}>{t('reset')}</button>
                        {resetErr && <div style={{ backgroundColor: 'indianred' }} className={`mess ${classM}`}>Mous Error : {errCode}</div>}
                        {!resetErr && <div className={`mess ${classM}`}>
                            {i18n.language == 'en' && <p>Please Check you email inbox to reset your password</p>}
                            {i18n.language == 'ar' && <p>أرجوك تفقّد رسائل الإيميل الخاص بك لإستعادة كلمة المرور</p>}
                        </div>}


                    </form>
                    {/* MAIN SIGN IN FORM */}
                    {!errorState && <form className='sign-in' action="">
                        <h2>{t('signin')}</h2>
                        <input onChange={(e) => { setMail(e.target.value) }} required type="email" placeholder={t('emailEx')} />
                        <input onChange={(e) => { setPass(e.target.value) }} required type="password" placeholder={t('password')} />
                        <input onClick={(e) => signInFunc(e)} className='btn' type="button" value={t('signin')} />
                        <div className="forget-link" onClick={() => setClassForm('show')}>
                            {i18n.language === 'en' && <p>forget password</p>}
                            {i18n.language === 'ar' && <p>نسيت كلمة السر</p>}
                        </div>
                    </form>}
                    {!errorState && <div className='out-lnk'>
                        {i18n.language === 'ar' && <p>هل بالفعل تمتلك حساباً ؟ </p>}
                        {i18n.language === 'en' && <p>already have an account ? </p>}
                        <Link to='/signup'>
                            {t('signup')}
                            <i style={{ margin: 'auto 15px' }} className="fa-solid fa-arrow-up-right-from-square"></i>
                        </Link>
                    </div>}
                    {errorState && // WHEN AN ERROR OCCUR
                        <div className="err">
                            {errCode}
                            <div className='btn try-again' onClick={() => setErrState(false)}>{i18n.language == 'en' ? 'try again ..' : 'حاول مرّة أخرى ..'}</div>
                        </div>
                    }

                </div>
            </main>
            <Footer />
        </div>
    )
}

export default SignIn;