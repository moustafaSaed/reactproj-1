import React, { useState } from 'react';
import SectionHdr from '../Components/General/SectionHdr';
import { Helmet } from 'react-helmet-async';


const Counter = () => {
    const [x, setX] = useState(0)
    return (
        <div className='counter'>
            <Helmet>
                <title>Mous | Counter</title>
                <meta name="description" content="this is small react proj about counter" />
            </Helmet>
            <div className="container cntnt">
                <SectionHdr name={'counter'}/>
                <div className="box">
                    <h3 className='res'>{x}</h3>
                    <div className="btns flx-center gap-10">
                        <div className="btn drk-btn" onClick={()=> setX(x+1)}>add one</div>
                        <div className="btn light-btn" onClick={()=> setX(x-1)}>sub one</div>
                        <div className="btn drk-btn" onClick={()=> setX(x*2)}>double</div>
                        <div className="btn light-btn" onClick={()=> setX(x*3)}>trible</div>
                        <div className="btn drk-btn" onClick={()=> setX(0)}>reset</div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Counter;