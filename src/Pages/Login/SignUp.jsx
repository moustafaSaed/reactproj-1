import React, { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import Header from '../../Components/General/Header/Header';
import Footer from '../../Components/General/Footer/Footer';
import '../../firebase/config';
import { Link, useNavigate } from 'react-router-dom';
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";

const auth = getAuth();


const SignUp = () => {
    const [errCode, setErrCode] = useState("");
    const [errorMess, setErr] = useState("");
    const [errorState, setErrState] = useState(false);
    const navigate = useNavigate();
    const [email, setMail] = useState("");
    const [password, setPass] = useState("");
    return (
        <div>
            <Helmet>
                <title>Muslim | Sign Up</title>
            </Helmet>
            <Header />
            <div className='flx-center main' style={{ height: "84vh" }}>
               {!errorState && <form action="">
                    <h2>Regist at <span className="logo-txt">muslim</span></h2>
                    {/* <input type="text" placeholder='username: omarkhattab114' /> */}
                    <input onChange={(e) => {setMail(e.target.value)}} required type="email" placeholder='Ex: a@b.com' />
                    <input onChange={(e) => {setPass(e.target.value)}} required type="password" placeholder='Password' />
                    {/* <input type="password" placeholder='Confirm Password' /> */}
                    <input className='' type="button" value="regist" onClick={(e) => {
                        e.preventDefault();
                        createUserWithEmailAndPassword(auth, email, password)
                            .then((userCredential) => {
                                // Signed up 
                                const user = userCredential.user;
                                console.log("Doneeeeeeeeeeeeee");
                                navigate("/");
                                // ...
                            })
                            .catch((error) => { 
                                const errorCode = error.code;
                                const errorMessage = error.message;
                                setErrState(true);
                                switch (errorCode) {
                                    case "auth/email-already-in-use":
                                        setErrCode(`Error Mous : please try another email because ${email} is already in use`);
                                        break;
                                    case "auth/invalid-email":
                                        setErrCode(`Error Mous : check the email: may be invalid or empty`);
                                        break;
                                    case "auth/weak-password":
                                        setErrCode(`Error Mous : weak password; your password should be at least 6 characters`);
                                        break;
                                    default:
                                        setErrCode(errorCode);
                                        break;
                                }
                                // ..
                            });
                    }} />
                </form> }
                {!errorState && <div className='out-lnk'>
                    <p>already have an account ? </p>
                    <Link to='/signin'>
                        sign in
                        <i className="fa-solid fa-arrow-up-right-from-square"></i>
                    </Link>
                </div> }
                {errorState && 
                    <div className="err">
                        {errCode}
                    </div>
                }
            </div>
            <Footer />
        </div>
    )
}

export default SignUp;