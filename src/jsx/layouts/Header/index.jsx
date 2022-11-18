import React, { useState, useEffect, useRef, useLayoutEffect } from 'react';
import './index.scss';
import { Link } from 'wouter';
import { useLocalStorage } from '../../core/utils';
import classNames from 'classnames';
import Logo from '../../../assets/images/logo_big.svg'
import LogoTablet from '../../../assets/images/logo_medium.svg'
import LogoMobile from '../../../assets/images/logo_small.svg'
import SearchIcon from '../../../assets/images/Exclude.svg';
import AuthModal from '../../components/AuthModal';
import YT from '../../../assets/images/yt.svg';
import VK from '../../../assets/images/vk.svg';
export const useOutsideAlerter = (ref, callback) => {
    useEffect(() => {
        function handleClickOutside(event) {
            if (ref.current && !ref.current.contains(event.target)) {
                callback();
            }
        }

        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [ref]);
}
export const useWindowSize = () => {
    const [size, setSize] = useState([0, 0]);
    useLayoutEffect(() => {
        function updateSize() {
            setSize([window.innerWidth, document.documentElement.offsetHeight]);
        }
        window.addEventListener("resize", updateSize);
        updateSize();
        return () => window.removeEventListener("resize", updateSize);
    }, []);
    return size;
};
function Header(props) {
    const [city, setCity] = useLocalStorage('city', null);
    const [active, setActive] = useState(false);
    const [visible, setVisible] = useState(false);
    const wrapperRef = useRef(null);
    useOutsideAlerter(wrapperRef, () => setActive(false));
    const [showMenu, setShowMenu] = useState(false);
    const handleOpen = (item) => {
        setVisible(true);
    }
    const size = useWindowSize()[0];

    const handleClose = () => { setVisible(false) }
    const { data } = props;
    const { header } = data.data
    console.log('header', header)
    const renderImages = (windowSize) => {
        if (windowSize > 1199) {
            return Logo
        }
        if (windowSize > 767) {
            return LogoTablet
        }
        if (windowSize < 768) {
            return LogoMobile;
        }
        return Logo;
    };
    return <>
        <header className="header">
            <div className="container">
                <div className="header__content">
                    <Link to="/"><img src={renderImages(size)} alt="logo" className="header__logo" /></Link>
                    <nav className="header__nav">
                        {Object.values(header?.menu)?.map((el) => {
                            return <Link to={el.url}>{el.name}</Link>
                        })}
                    </nav>
                    <div className="header__controls">
                        <div className={`header__search ${active ? "active" : ""}`} ref={wrapperRef}>
                            <img src={SearchIcon} alt="" onClick={() => setActive(!active)} />
                            <input type="search" placeholder="Поиск" />
                        </div>
                        {header.isLogged ? <Link to={'/profile'} className="btn btn_primary btn_outline"  >Профиль</Link>
                            : <button id="auth_button" className="btn btn_primary btn_outline" onClick={() => handleOpen()}>Вход</button>}
                        <div className={`header__toggler ${showMenu ? 'active' : ''}`} onClick={(() => setShowMenu(!showMenu))}>
                            <span></span><span></span><span></span>
                        </div>
                    </div>
                </div>
            </div>
        </header>
        <div className="auth-modal-wrapper"><AuthModal header={header} visible={visible} onClose={() => handleClose()} /></div>



        <div className={`mobile-menu ${showMenu ? 'active' : ''}`}>
            <div className="mobile-menu__wrapper">
                <div className="mobile-menu__search">
                    <img src={SearchIcon} alt="" onClick={() => setActive(!active)} />
                    <input type="search" placeholder="Поиск" />
                </div>
                <div className="mobile-menu__list">
                    {Object.values(header?.menu)?.map((el, i) => {
                        return <Link to={el.url} onClick={() => setShowMenu(false)}><div className="mobile-menu__number">0{i + 1}</div> <span>{el.name}</span></Link>
                    })}
                </div>
                <div className="footer__end">
                    <div className="footer__socials">
                        {data.data.footer.social_icons.vk && <a href={data.data.footer.social_icons.vk}><img src={VK} alt="" /></a>}
                        {data.data.footer.social_icons.youtube && <a href={data.data.footer.social_icons.youtube}><img src={YT} alt="" /></a>}
                    </div>
                    {data.data.footer.email && <div className="footer__mail">
                        <p>e-mail</p>
                        <a href={`mailto: ${data.data.footer.email.value}`}>{data.data.footer.email.value}</a>
                    </div>}
                </div>
            </div>
        </div>
    </>
}

export default Header
