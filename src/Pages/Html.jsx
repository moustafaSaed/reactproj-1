// @ts-nocheck
import React, { useEffect } from 'react';
import Header from '../Components/General/Header/Header';
import Footer from '../Components/General/Footer/Footer';
import { Helmet } from 'react-helmet-async';
import { useNavigate } from 'react-router-dom';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '../firebase/config';

const Html = () => {
    const go = useNavigate();
    const [user, loading, error] = useAuthState(auth);
    useEffect(() => {
        if (!user) {
            console.log("failed");
            go('/');
        } else {
            console.log("success")
        }
    }, [user]);
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
                    <title>Muslim | loading</title>
                </Helmet>
                <Header />
                <div className='preLogin flx-center' style={{ height: "84vh" }}>
                    <div className="loading">Mous : Loading ..</div>
                </div>
                <Footer />
            </div>
        )
    }
    if (!user) {
        return (
            <div>
                <Helmet>
                    <title>Muslim | Home</title>
                </Helmet>
                <Header />
                <div className='preLogin flx-center' style={{ height: "84vh" }}>
                    <Link to='signin'><div className="btnX in">sign in</div></Link>
                    <Link to='signup'><div className="btnX up">sign up</div></Link>
                </div>
                <Footer />
            </div>
        )
    }
    if (user) {
        if (!user.emailVerified) {
            return (
                <div>
                    <Helmet>
                        <title>Muslim | Home</title>
                    </Helmet>
                    <Header />
                    <div className='preLogin flx-center' style={{ height: "84vh" }}>
                        <h1>Hello Mr : {user.displayName}</h1>
                        <div>please verify your email firstly</div>
                        <div className="btn light-btn">Resend Email Verf</div>
                    </div>
                    <Footer />
                </div>
            )
        }
        if (user.emailVerified) {
            return (
                <div>
                    <Helmet>
                        <title>Muslim | Html</title>
                    </Helmet>
                    <Header />
                    <div className='flx-center' style={{ height: "84vh" }}>
                        <h1>Html</h1>
                    </div>
                    <Footer />
                </div>
            )
        }
    }
}

export default Html;