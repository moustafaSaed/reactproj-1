// @ts-nocheck
import React, { useEffect } from 'react';
import Header from '../Components/General/Header/Header';
import Footer from '../Components/General/Footer/Footer';
import { Helmet } from 'react-helmet-async';
import { useNavigate } from 'react-router-dom';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '../firebase/config';
import './profile.css';
import { deleteUser } from 'firebase/auth';
import { useTranslation } from 'react-i18next';



const Profile = () => {
    const { t, i18n } = useTranslation(); // new
    const go = useNavigate();
    const [user, loading, error] = useAuthState(auth);
    const userX = auth.currentUser;
    useEffect(() => {
        if (!user && !loading) {
            console.log("failed");
            go('/');
        } else {
            console.log("success");
        }
    }, [user]);
    console.log(userX)
    const delAccFunc = ()=> {
        deleteUser(userX).then(() => {
            // User deleted.
            console.log("Deleted")
        }).catch((error) => {
            // An error ocurred
            console.log("Cann't Delete")
            console.log(error);
            console.log(error.message);
            // ...
        });
    }

    if (loading) {
        return (
            <div>
                <Helmet>
                    <title>Muslim | Profile</title>
                </Helmet>
                <Header />
                <div className='profile' style={{ height: "84vh" }}>
                    <div className="container">
                        <h1>Profile Info</h1>
                        <p>Loading   . . .</p>
                    </div>
                </div>
                <Footer />
            </div>
        );
    }
    if (error) {
        return (
            <div>
                <Helmet>
                    <title>Muslim | Profile</title>
                </Helmet>
                <Header />
                <div className='profile' style={{ height: "84vh" }}>
                    <div className="container">
                        <h1>Profile Info</h1>
                        <p>Error  :  {error}</p>
                    </div>
                </div>
                <Footer />
            </div>
        );
    }
    if (user) {
        return (
            <div>
                <Helmet>
                    <title>Muslim | Profile</title>
                </Helmet>
                <Header />
                <main>
                    <div className='overlay profile'>
                        <div className="container">
                            <h1>{t('profileInfo')}</h1>
                            <div className="info">
                                <div>{t('name')} : <span className='info-res'>{user.displayName}</span></div>
                                <div>{t('phone')} : <span className='info-res'>{user.phoneNumber}</span></div>
                                <div>{t('email')} : <span className='info-res'>{user.email}</span></div>
                                <div>{t('timeCreat')} : <span className='info-res'>{user.metadata.creationTime}</span></div>
                                <div>{t('lastSignIn')} : <span className='info-res'>{user.metadata.lastSignInTime}</span></div>
                                <div>{t('emailStatus')} : {user.emailVerified ? (<span style={{ color: "lightgreen" }} className='info-res'>{t('verified')}</span>) : (<span style={{ color: "red" }} className='info-res un-ver'>{t('notverified')}</span>)}</div>
                                <span className="btn danger-btn" onClick={() => delAccFunc()}>
                                    {i18n.language == 'en' && <p>delete account</p>}
                                    {i18n.language == 'ar' && <p>مسح الحساب</p>}
                                </span>
                            </div>
                        </div>
                    </div>
                </main>
                <Footer />
            </div>
        );
    }
}

export default Profile;