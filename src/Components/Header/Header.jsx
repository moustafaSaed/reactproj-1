import React from 'react';
import "./header.css";

const Header = () => {
    return (
            <header className="container flx-between">
                    <div className="logo"><a href="/">mous</a></div>
                    <ul className="nav flx-between gap-10">
                        <a href="/mous/counter"><li>counter</li></a>
                        <a href="/mous/css"><li>css</li></a>
                        <a href="/mous/form"><li>form</li></a>
                    </ul>
            </header>
    )
}

export default Header;