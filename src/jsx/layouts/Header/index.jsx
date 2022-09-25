import React, { useState } from 'react';
import './index.scss';
import { Link } from 'wouter';
import { useLocalStorage } from '../../core/utils';
import classNames from 'classnames';
import Logo from '../../../assets/images/logo.svg'
import SearchIcon from '../../../assets/images/Exclude.svg';
import AuthModal from '../../components/AuthModal';

function Header(props) {
    const [city, setCity] = useLocalStorage('city', null);
    const [active, setActive] = useState(false);
    const [visible, setVisible] = useState(false);
    const handleOpen = (item) => {
        setVisible(true);
    }
    const handleClose = () => { setVisible(false) }
    const { data } = props;
    const { header } = data.data
    console.log('header', header)
    return <>
        <header className="header">
            <div className="container">
                <div className="header__content">
                    <Link to="/"><img src={Logo} alt="logo" className="header__logo" /></Link>
                    <nav className="header__nav">
                        {Object.values(header?.menu)?.map((el) => {
                            return <Link to={el.url}>{el.name}</Link>
                        })}
                    </nav>
                    <div className="header__controls">
                        <div className={`header__search ${active ? "active" : ""}`}>
                            <img src={SearchIcon} alt="" onClick={() => setActive(!active)} />
                            <input type="search" placeholder="Поиск" />
                        </div>
                        {header.isLogged ? <Link to={'/profile'} className="btn btn_primary btn_outline" >Профиль</Link>
                            : <button className="btn btn_primary btn_outline" onClick={() => handleOpen()}>Вход</button>}
                    </div>
                </div>
            </div>
        </header>
        <div className="auth-modal-wrapper"><AuthModal visible={visible} onClose={() => handleClose()} /></div>
    </>
}

export default Header
