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



const Profile = () => {
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
                <div className='profile' style={{ height: "84vh" }}>
                    <div className="container">
                        <h1>Profile Info</h1>
                        <div className="info">
                            <div>Name : <span className='info-res'>{user.displayName}</span></div>
                            <div>Phone : <span className='info-res'>{user.phoneNumber}</span></div>
                            <div>Email : <span className='info-res'>{user.email}</span></div>
                            <div>Creation Time : <span className='info-res'>{user.metadata.creationTime}</span></div>
                            <div>Last Sign in : <span className='info-res'>{user.metadata.lastSignInTime}</span></div>
                            <div>Email Status : {user.emailVerified ? (<span style={{ color: "green" }} className='info-res'>Verified</span>) : (<span style={{ color: "red" }} className='info-res un-ver'>Not Verified</span>)}</div>
                            <span className="btn danger-btn" onClick={() => {
                                deleteUser(userX).then(() => {
                                    // User deleted.
                                    console.log("Deleted")
                                }).catch((error) => {
                                    // An error ocurred
                                    console.log("Cann't Delete")
                                    // ...
                                });
                            }}>Delete Account</span>
                        </div>
                    </div>
                </div>
                <Footer />
            </div>
        );
    }

    // return (
    //     <div>
    //         <Helmet>
    //             <title>Muslim | Profile</title>
    //         </Helmet>
    //         <Header />
    //         <div className='profile' style={{ height: "84vh" }}>
    //             <div className="container">
    //                 <h1>Profile Info</h1>
    //                 <div className="info">
    //                     <div>Name : <span className='info-res'>{user.displayName}</span></div>
    //                     <div>Phone : <span className='info-res'>{user.phoneNumber}</span></div>
    //                     <div>Email : <span className='info-res'>{user.email}</span></div>
    //                     <div>Creation Time : <span className='info-res'>{user.metadata.creationTime}</span></div>
    //                     <div>Last Sign in : <span className='info-res'>{user.metadata.lastSignInTime}</span></div>
    //                     <div>Email Status : {user.emailVerified ? (<span style={{ color: "green" }} className='info-res'>Verified</span>) : (<span style={{ color: "red" }} className='info-res un-ver'>Not Verified</span>)}</div>
    //                 </div>
    //             </div>
    //         </div>
    //         <Footer />
    //     </div>
    // )
}

export default Profile;