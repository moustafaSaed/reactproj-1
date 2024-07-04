// @ts-nocheck
import React, { useEffect, useState } from 'react';
import Header from '../Components/General/Header/Header';
import Footer from '../Components/General/Footer/Footer';
import { Helmet } from 'react-helmet-async';
import { auth } from '../firebase/config';
import { Link } from 'react-router-dom';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useTranslation } from 'react-i18next';
import ReactLoading from 'react-loading';
import '../Pages/home.css';


const Home = () => {
    const { t, i18n } = useTranslation(); // new
    const [user, loading, error] = useAuthState(auth);

    const [text, setText] = useState('');

    const content = " ... " + t('motiv'); // The text you want to display

    useEffect(() => {
        let currentIndex = 0;
        const typingInterval = setInterval(() => {
            if (currentIndex === content.length) {
                clearInterval(typingInterval);
            } else {
                setText(content.slice(0, currentIndex + 1));
                currentIndex++;
            }
        }, 100); // Adjust the typing speed by changing the interval duration

        return () => clearInterval(typingInterval); // Cleanup the interval on component unmount
    }, [content]);


    // console.log(user);  needed when test
    if (error) {
        return (
            <div>
                <Helmet>
                    <title>Muslim | Error</title>
                </Helmet>
                <Header />
                <div className='preLogin flx-center' style={{ height: "84vh" }}>
                    <div className="err">Mous Error : {error}</div>
                </div>
                <Footer />
            </div>
        )
    }
    if (loading) {
        return (
            <div>
                <Helmet>
                    {i18n.language === 'en' && <title>Muslim | Loading</title>}
                    {i18n.language === 'ar' && <title>مُـسـلِـم  |  تحميــل</title>}
                </Helmet>
                <Header />
                <div className='preLogin flx-center' style={{ height: "84vh" }}>
                    <ReactLoading type={'spin'} color={'#795548'} height={55} width={55} />
                </div>
                <Footer />
            </div>
        )
    }
    if (!user) {
        return (
            <div>
                <Helmet>
                    {i18n.language === 'en' && <title>Muslim | Home</title>}
                    {i18n.language === 'ar' && <title>مُـسـلِـم  |  الرئيسية</title>}
                </Helmet>
                <Header />
                <main>
                    <div className='pre-login overlay flx-center'>
                        <Link to='signin'><div className="btn in">{t('signin')}</div></Link>
                        <Link to='signup'><div className="btn up">{t('signup')}</div></Link>
                    </div>
                </main>
                <Footer />
            </div>
        )
    }
    if (user) {
        if (!user.emailVerified) {
            return (
                <div>
                    <Helmet>
                        {i18n.language === 'en' && <title>Muslim | Home</title>}
                        {i18n.language === 'ar' && <title>مُـسـلِـم  |  الرئيسية</title>}
                    </Helmet>
                    <Header />
                    <main>
                        <div className='preLogin not-verify overlay flx-center'>
                            <h1>{t('hello')} {user.displayName}</h1>
                            {i18n.language == 'en' && <p className='info'>please verify your email firstly <i class="fa-solid fa-circle-info"></i></p>}
                            {i18n.language == 'ar' && <p className='info'>أرجوك قُم بتأكيد إيميلك أولاً<i class="fa-solid fa-circle-info"></i></p>}
                            <div className='note'>{t("verMess")}</div>
                            <div className="btn">
                                {i18n.language == 'en' && <p>ٌResend Email Verif.</p>}
                                {i18n.language == 'ar' && <p>إعادة إرسال رسالة التأكيد</p>}
                            </div>
                        </div>
                    </main>
                    <Footer />
                </div>
            )
        }
        // MAIN CONTENT OF HOME PAGE
        if (user.emailVerified) {
            return (
                <div>
                    <Helmet>
                        {i18n.language === 'en' && <title>Muslim | Home</title>}
                        {i18n.language === 'ar' && <title>مُـسـلِـم  |  الرئيسية</title>}
                    </Helmet>
                    <Header />
                    {user &&
                        <main className='home' style={{ height: "84vh" }}>
                            <div className="overlay container">
                                <h1>{t('hello') + user.displayName + text}</h1>
                                <Link to="/todo" className='go-app'>
                                    <div className="btn flx-between">
                                        <p>{t("goApp")}</p>
                                        <i class="fa-solid fa-table-list"></i>
                                    </div>
                                </Link>
                            </div>
                        </main>
                    }
                    {!user &&
                        <div className='preLogin flx-center' style={{ height: "84vh" }}>
                            <Link to='signin'><div className="btnX in">{t('signin')}</div></Link>
                            <Link to='signup'><div className="btnX up">{t('signup')}</div></Link>
                        </div>
                    }
                    <Footer />

                </div>
            )
        }
    }
}

export default Home;