import React from 'react';
import Header from '../Components/General/Header/Header';
import Footer from '../Components/General/Footer/Footer';
import { Helmet } from 'react-helmet-async';

const Js = () => {
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