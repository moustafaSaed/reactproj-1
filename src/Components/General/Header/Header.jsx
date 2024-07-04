// @ts-ignore
import React, { useContext, useState } from 'react';
import "./header.css"
import DataContext from '../../../Context/Context';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { useAuthState } from 'react-firebase-hooks/auth'
import { auth } from '../../../firebase/config';
import { signOut } from "firebase/auth";
import { useTranslation } from 'react-i18next';


const Header = () => {
    // VARIABLES
    const { t, i18n } = useTranslation(); // new
    const go = useNavigate();
    const [user, loading, error] = useAuthState(auth);
    const [x, setX] = useState('hide');
    const toggleMenu = () => {
        x == 'hide' ? setX('show') : setX('hide');
    }
    // @ts-ignore
    const { mode, sun, changeMode, toggleSun } = useContext(DataContext); 
    // FUNCTIONS
    const signOutFunc = () => {
        {
            signOut(auth).then(() => {
                // Sign-out successful.
                go("/");
            }).catch((error) => {
                console.log(error);
            });
        }
    }
    const drkIcnHandler = () => {
        changeMode(mode === "Light" ? "Dark" : "Light");
                    toggleSun(sun === 'fa-solid' ? "fa-regular" : 'fa-solid');
    }

    return (
        <header>
            <div className="container flx-between">
                {/* ----------- LOGO ----------- */}
                <Link to="/"><div className="logo">{t('muslim')}</div></Link>
                <div className="darkmode-icon" onClick={() => drkIcnHandler()}>
                    <i className={`${sun} fa-sun`}></i>
                </div>
                <div className='flx-between'>
                    <ul className="nav flx-between gap-10">
                        {/* if not a user yet  */}
                        {!user && <li><NavLink to="/signin">{t('signin')}</NavLink></li>}
                        {!user && <li><NavLink to="/signup">{t('signup')}</NavLink></li>}
                        
                        <li className='lang'>
                            <p>{t('langs')}</p>
                            <ul className='lang-opt'>
                                <li onClick={() => {i18n.changeLanguage("en");}} >{t('english')}</li>
                                <li onClick={() => {i18n.changeLanguage("ar");}} >{t('arabic')}</li>
                            </ul>
                        </li>
                        {/* if user */}
                        {/* NAVBAR LINKS IN BIG SCREENS  */}
                        {user && <li><NavLink to="/todo" className={({ isActive, isPending }) =>
                            isPending ? "pending" : isActive ? "active" : ""
                        }>{t('todo')}</NavLink></li>}
                        {user && <li><NavLink to="/profile" className={({ isActive, isPending }) =>
                            isPending ? "pending" : isActive ? "active" : ""
                        }>{t('profile')}</NavLink></li>}
                        {user &&<Link onClick={() => signOutFunc()} className='logout-icn' to={''}>
                                {t('logout')}
                                <i className="fa-solid fa-arrow-right-to-bracket"></i>
                            </Link>}
                    </ul>
                </div>
                <div className="icon" onClick={() => toggleMenu()}>
                    <i className="fa-regular fa-square-caret-left"></i>
                </div>
            </div>
            {/* NAVBAR LINKS IN SMALL SCREENS  */}
            <ul className={`nav-when-small ${x}`}>
                {/* IF NOT A USER */}
                {!user && <li><NavLink to="/signin">{t('signin')}</NavLink></li>}
                {!user && <li><NavLink to="/signup">{t('signup')}</NavLink></li>}

                {/* IF BECOME A USER  */}
                {user && <li><NavLink to="/todo" className={({ isActive, isPending }) =>
                    isPending ? "pending" : isActive ? "active" : ""
                }>{t('todo')}</NavLink></li>}
                {user && <li><NavLink to="/profile" className={({ isActive, isPending }) =>
                    isPending ? "pending" : isActive ? "active" : ""
                }>{t('profile')}</NavLink></li>}
                {true && <li className='lang'><NavLink to={""}>
                    <p>{t('langs')}</p>
                    <ul className='lang-opt'>
                        <li onClick={() => {
                            i18n.changeLanguage("en");
                        }} >{t('english')}</li>
                        <li onClick={() => {
                            i18n.changeLanguage("ar");
                        }} >{t('arabic')}</li>
                    </ul>
                </NavLink></li>}
                {user && <Link onClick={() => signOutFunc()} className='logout-icn' to={''}>
                        {t('logout')}
                        <i className="fa-solid fa-arrow-right-to-bracket"></i>
                    </Link>}
            </ul>
        </header>
    )
}


export default Header;