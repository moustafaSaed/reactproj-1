import React from 'react';
import "./footer.css"
import { useTranslation } from 'react-i18next';

const Footer = () => {
    const { t, i18n } = useTranslation(); // new
    return (
        <footer>
            <div className="container flx-center">
                {i18n.language==='en' && <span>made with love by <a href="https://moustafaportfolio114.web.app" className='my-name'>Moustafa Saeed</a></span>}
                {i18n.language==='ar' && <span>تم إنشـَـاء الموقع بواسطة  <a href="https://moustafaportfolio114.web.app" className='my-name ar'>مُـصـطـفى بن سَـعِـيـد</a></span>}
                <i className='fa-solid fa-heart'></i>
            </div>
        </footer>
    )
}


export default Footer;