import React from 'react';
import Header from '../Components/General/Header/Header';
import Footer from '../Components/General/Footer/Footer';
import { Helmet } from 'react-helmet-async';
import { auth } from '../firebase/config';
import { Link } from 'react-router-dom';
import { useAuthState } from 'react-firebase-hooks/auth';


const Home = () => {
    const [user, loading, error] = useAuthState(auth);
    return (
        <div>
            <Helmet>
                <title>Muslim | Home</title>
            </Helmet>
            <Header />
            {user &&<div className='flx-center' style={{ height: "84vh" }}>
                <h1>Home</h1>
            </div>}
                {!user && 
                    <div className='preLogin flx-center' style={{ height: "84vh" }}>
                            <Link to='signin'><div className="btnX in">sign in</div></Link>
                            <Link to='signup'><div className="btnX up">sign up</div></Link>
                    </div>
                }
            <Footer />

        </div>
    )
}

export default Home;