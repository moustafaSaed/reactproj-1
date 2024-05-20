import React from 'react';
import { Helmet } from 'react-helmet-async';


const Home = () => {
    return (
        <>
            <Helmet>
                <title>Mous | Home</title>
                <meta name="description" content="this is small react proj home page" />
            </Helmet>
            <div className="container cntnt">
                <h2>Home</h2>
            </div>
        </>
    )
}

export default Home;