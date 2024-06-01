// @ts-ignore
import React, { useContext, useState } from 'react';
import "./header.css"
import DataContext from '../../../Context/Context';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { useAuthState } from 'react-firebase-hooks/auth'
import { auth } from '../../../firebase/config';
import { signOut } from "firebase/auth";


const Header = () => {
    const go = useNavigate();
    // @ts-ignore
    const [user, loading, error] = useAuthState(auth);
    const [x, setX] = useState('hide');
    const toggleMenu = () => {
        x == 'hide' ? setX('show') : setX('hide');
    }
    // @ts-ignore
    const { mode, sun, changeMode, toggleSun } = useContext(DataContext);


    return (
        <header>
            {/* {user && <h2>Done</h2>} */}
            <div className="container flx-between">
                <Link to="/">
                    <div className="logo">Muslim</div>
                </Link>
                <div className="darkmode-icon" onClick={() => {
                    changeMode(mode === "Light" ? "Dark" : "Light");
                    toggleSun(sun === 'fa-solid' ? "fa-regular" : 'fa-solid');
                }}>
                    <i className={`${sun} fa-sun`}></i>
                </div>
                <div className='flx-between'>
                    <ul className="nav flx-between gap-10">
                        {!user && <li><NavLink to="/signin">sign in</NavLink></li>}
                        {!user && <li><NavLink to="/signup">sign up</NavLink></li>}
                        {user && <li><NavLink to="/html" className={({ isActive, isPending }) =>
                            isPending ? "pending" : isActive ? "active" : ""
                        }>html</NavLink></li>}
                        {user && <li><NavLink to="/todo" className={({ isActive, isPending }) =>
                            isPending ? "pending" : isActive ? "active" : ""
                        }>todo</NavLink></li>}
                        {/* {user && <li><NavLink to="/css" className={({ isActive, isPending }) =>
                            isPending ? "pending" : isActive ? "active" : ""
                        }>css</NavLink></li>} */}
                        {user && <li><NavLink to="/profile" className={({ isActive, isPending }) =>
                            isPending ? "pending" : isActive ? "active" : ""
                        }>Profile</NavLink></li>}
                        {/* {user &&<li><NavLink to="/js" className={({ isActive, isPending }) =>
                            isPending ? "pending" : isActive ? "active" : ""
                        }>js</NavLink></li> } */}
                        {user &&
                            <
// @ts-ignore
                            Link onClick={() => {
                                signOut(auth).then(() => {
                                    // Sign-out successful.
                                    go("/");

                                // @ts-ignore
                                }).catch((error) => {
                                    // An error happened.
                                });
                            }} className='logout-icn'>
                                log out |
                                <i className="fa-solid fa-arrow-right-to-bracket"></i>
                            </Link>
                        }
                    </ul>
                </div>
                <div className="icon" onClick={() => toggleMenu()}>
                    <i className="fa-regular fa-square-caret-left"></i>
                </div>
            </div>
            <ul className={`nav-when-small ${x}`}>
            {!user && <li><NavLink to="/signin">sign in</NavLink></li>}
                        {!user && <li><NavLink to="/signup">sign up</NavLink></li>}
                        {user && <li><NavLink to="/html" className={({ isActive, isPending }) =>
                            isPending ? "pending" : isActive ? "active" : ""
                        }>html</NavLink></li>}
                        {user && <li><NavLink to="/todo" className={({ isActive, isPending }) =>
                            isPending ? "pending" : isActive ? "active" : ""
                        }>todo</NavLink></li>}
                        {/* {user && <li><NavLink to="/css" className={({ isActive, isPending }) =>
                            isPending ? "pending" : isActive ? "active" : ""
                        }>css</NavLink></li>} */}
                        {user && <li><NavLink to="/profile" className={({ isActive, isPending }) =>
                            isPending ? "pending" : isActive ? "active" : ""
                        }>Profile</NavLink></li>}
                        {/* {user &&<li><NavLink to="/js" className={({ isActive, isPending }) =>
                            isPending ? "pending" : isActive ? "active" : ""
                        }>js</NavLink></li> } */}
                {user &&
                    <
// @ts-ignore
                    Link onClick={() => {
                        signOut(auth).then(() => {
                            // Sign-out successful.
                            go("/");

                        // @ts-ignore
                        }).catch((error) => {
                            // An error happened.
                        });
                    }} className='logout-icn'>
                        log out |
                        <i className="fa-solid fa-arrow-right-to-bracket"></i>
                    </Link>
                }
            </ul>
        </header>
    )
}


export default Header;