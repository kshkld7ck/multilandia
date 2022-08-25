import React from "react";
import './index.scss'
import { Link } from "wouter";
import Picture1 from '../../../assets/images/footer_cloud.png'
import Logo from '../../../assets/images/footer_logo.svg'
import YT from '../../../assets/images/yt.svg';
import VK from '../../../assets/images/vk.svg';
function Footer(props) {
    const { data } = props;
    const { footer } = data.data
    console.log(footer)
    return (
        <>
            <footer className="footer">
                <div className="container">
                    <div className="footer__row">

                        <img src={Logo} className="footer__logo" alt="" />

                        <div className="footer__main-nav">
                            {footer.menu.map((el) => {
                                return <Link to={el.url}>{el.label}</Link>
                            })}
                        </div>
                        <div className="footer__row-end footer__cloud">
                            <img src={Picture1} alt="" />
                        </div>
                    </div>
                    <div className="footer__nav-wrapper">

                        <div className="footer__nav">
                            <div className="footer__nav-title">
                                {footer.menu2.title}
                            </div>
                            <div className="footer__nav-list">
                                {footer.menu2.items.map((el) => {
                                    return <Link to={el.url}>{el.label}</Link>
                                })}
                            </div>
                        </div>
                        <div className="footer__nav">
                            <div className="footer__nav-title">
                                {footer.menu3.title}
                            </div>
                            <div className="footer__nav-list">
                                {footer.menu3.items.map((el) => {
                                    return <Link to={el.url}>{el.label}</Link>
                                })}
                            </div>
                        </div>
                    </div>

                </div>
                <div className="footer__end">
                    <div className="container">
                        <div className="footer__socials">
                            {footer.social_icons.vk && <a href={footer.social_icons.vk}><img src={VK} alt="" /></a>}
                            {footer.social_icons.youtube && <a href={footer.social_icons.youtube}><img src={YT} alt="" /></a>}
                        </div>
                        {footer.email && <div className="footer__mail">
                            <p>e-mail</p>
                            <a href={`mailto: ${footer.email.value}`}>{footer.email.value}</a>
                        </div>}
                    </div>
                </div>
                <div className="container"><p className="footer__copyright">© 2022, ООО «Киномания ТВ». Все права защищены. Полное или частичное копирование материалов запрещено.</p>
                </div>
            </footer>
        </>
    )
}

export default Footer;
