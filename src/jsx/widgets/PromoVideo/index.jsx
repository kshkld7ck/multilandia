import React from 'react';
import './index.scss';
import Slider from "react-slick";
import { Link } from 'wouter';
import Arrow from '../../../assets/images/arrow.svg'
function PromoVideo({ config }) {

    return <section className="promo-video">
        <div className="container">
            <div className="promo-video__content">
                <img className="promo-video__item-image" src={`https://multilandia.tv:4433/${config.image}`} alt="" />
                <div className="promo-video__item-info">
                    <div className="promo-video__item-title">
                        {config.title}
                    </div>
                    <div className="promo-video__item-text">
                        {config.sub}
                    </div>

                    {config.detail?.url && <Link to={config.detail.url} className="btn btn_primary btn_outline">{config.detail.label}</Link>}
                </div>
                {/* {config.items.map((el) => {
                    return <div className="promo-video__item">
                        <div className="banners__item-info">
                            <div className="banners__item-title">
                                {el.title}
                            </div>
                            <div className="banners__item-text">
                                {el.text}
                            </div>
                        </div>
                 
                        <Link to={el.button.url} className="btn btn_primary btn_outline">{el.button.text}</Link>
                        <img className="banners__item-image" src={`https://multilandia.tv:4433/${el.image}`} alt="" />
                    </div>
                })} */}
            </div>
        </div>
    </section>
}

export default PromoVideo