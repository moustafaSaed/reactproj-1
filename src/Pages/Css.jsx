import React, { useState } from 'react';
import SectionHdr from '../Components/General/SectionHdr';
import { Helmet } from 'react-helmet-async';


const Css = () => {
    const [clrVlu, setClrVlu] = useState('black');
    const [fntSizVlu, setFntSizVlu] = useState(16);
    const [bkgClr, setBkgClr] = useState('unset');
    const reset = ()=> {
        setClrVlu('black');
        setFntSizVlu(16);
        setBkgClr('unset');
    }
    return (
        <div className='css'>
            <Helmet>
                <title>Mous | Css</title>
                <meta name="description" content="this is small react proj about changing css styles" />
            </Helmet>
            <div className="container cntnt">
                <SectionHdr name={'change styles'}/>
                <form action="#">
                    <div>
                        <label htmlFor="">color</label>
                        <input className='clr-inp' type="text" value={clrVlu}  onChange={(e)=> setClrVlu(e.target.value)}/>
                    </div>
                    <div>
                        <label htmlFor="">bachground color</label>
                        <input className='clr-inp' type="text" value={bkgClr}  onChange={(e)=> setBkgClr(e.target.value)}/>
                    </div>
                    <div>
                        <label htmlFor="">font size</label>
                        <div className="inp">
                            <input className='size-inp' type="number" value={fntSizVlu} onChange={(e)=> setFntSizVlu(e.target.value)}/>px
                        </div>
                    </div>
                    <input type="reset" value="reset" className='btn drk-btn' onClick={()=> reset()}/>
                </form>
                <div className="res" style={{color: clrVlu, fontSize: fntSizVlu+'px', backgroundColor: bkgClr}}>
                    iam a text for testing ..
                </div>
            </div>
        </div>
    )
}

export default Css;