import React, { useEffect } from 'react';
import Header from '../Components/General/Header/Header';
import Footer from '../Components/General/Footer/Footer';
import { Helmet } from 'react-helmet-async';
import { useNavigate } from 'react-router-dom';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '../firebase/config';

const Js = () => {
    const go = useNavigate();
    const [user, loading, error] = useAuthState(auth);
    useEffect(()=>{
        if(!user){
            console.log("failed");
            go('/');
        }else{
            console.log("success")
        }
    },[user]);
    return (
        <div>
            <Helmet>
                <title>Muslim | JavaScript</title>
            </Helmet>
            <Header />
            <div className='flx-center' style={{height:"84vh"}}>
                <h1>Js</h1>
            </div>
            <Footer />
        </div>
    )
}

export default Js;