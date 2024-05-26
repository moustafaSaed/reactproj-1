import React from 'react';
import Header from '../Components/General/Header/Header';
import Footer from '../Components/General/Footer/Footer';
import { Helmet } from 'react-helmet-async';



const Html = () => {
    return (
        <div>
            <Helmet>
                <title>Muslim | Html</title>
            </Helmet>
            <Header />
            <div className='flx-center' style={{height:"84vh"}}>
                <h1>Html</h1>
            </div>
            <Footer />
        </div>
    )
}

export default Html;