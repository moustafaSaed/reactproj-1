import React, { useState } from 'react';
import SectionHdr from '../Components/General/SectionHdr';
import { Helmet } from 'react-helmet-async';


const Form = () => { 
    const [name, setName] = useState('');
    const [age, setAge] = useState();
    const [ques, setQues] = useState('');
    const [isSub, setIsSub] = useState(false);
    const apply = ()=> {
        if(name!='' && age!=null && ques!=''){
            setIsSub(true);
        } else {
            setIsSub(false);
        }
    };
    const reset = ()=> {
        setName('');
        setAge('');
        setQues('');
        setIsSub(false);
    }
    return (
        <div className='form-section'>
            <Helmet>
                <title>Mous | Form</title>
                <meta name="description" content="this is small react proj about changing form inputs & display it" />
            </Helmet>
            <div className="container cntnt">
                <SectionHdr name={'form'}/>
                <form action="">
                    <div>
                        <label htmlFor="">name</label>
                        <input type="text" placeholder='your name ..' value={name} onChange={(e)=> setName(e.target.value)}/>
                    </div>
                    <div>
                        <label htmlFor="">age</label>
                        <input type="number" placeholder='your age ..' value={age} onChange={(e)=> setAge(e.target.value)}/>
                    </div>
                    <div>
                        <label htmlFor="">your question</label>
                        <input type="text" placeholder='how can i .. ?' value={ques} onChange={(e)=> setQues(e.target.value)}/>
                    </div>
                    <div className="btns ">
                        <div className="btn apply drk-btn" onClick={()=> apply()}>apply</div>
                        <div className="btn reset light-btn" onClick={()=> reset()}>reset</div>
                    </div>
                </form>
                <div className="res">
                    
                    {isSub? (<h2 style={{color: 'green'}}>success ^^</h2>): ('')}
                    {isSub? (<>
                                <p>hello mr {name} i know that your age is {age} years old</p><br />
                                <p>and soon i will give you an answer about your question: || {ques} ||</p>
                            </>
                    ): (<h3 style={{color:'orangered'}}>please finish the form and submit it</h3>)}
                </div>
            </div>
        </div>
    )
}

export default Form;