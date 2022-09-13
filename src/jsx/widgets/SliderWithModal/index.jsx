import React, { useState } from 'react';
import './index.scss';
import Slider from "react-slick";
import { Link } from 'wouter';
import Rodal from 'rodal';
import 'rodal/lib/rodal.css';

function SliderWithModal({ config }) {
    const [visible, setVisible] = useState(false);
    const [activeItem, setActiveItem] = useState({})
    const handleOpen = (item) => {
        setVisible(true);
        setActiveItem(item)
    }
    const handleClose = () => { setVisible(false) }
    const settings = {
        infinite: true,
        speed: 500,
        arrow: true,

        slidesToScroll: 1,
        slidesToShow: 6,
        responsive: [
            {
                breakpoint: 1800,
                settings: {
                    slidesToShow: 5,
                    slidesToScroll: 1,
                }
            },
            {
                breakpoint: 1200,
                settings: {
                    slidesToShow: 4,
                    slidesToScroll: 1,
                }
            },

        ]
    };

    return <section className="news news_with_slider">
        <div className="container">
            <div className="news__content">
                <h3>{config.title}</h3>
                <Slider {...settings}>
                    {config.items.map((el) => {
                        return <div className="news__item" onClick={() => handleOpen(el)}>
                            <img src={`https://mland.olit.su/${el.image}`} className="news__image" />
                            {el.title && <div className="news__title">{el.title}</div>}
                            {el.sub && <div className="news__sub">{el.sub}</div>}
                        </div>
                    })}
                </Slider>
                {config.all_games ? <div className="news__footer">
                    <Link to={config.all_games.url}>
                        <div className={`btn btn_${config.all_games.style} btn_outline`}>
                            <span>{config.all_games.label}</span>
                        </div>
                    </Link>
                </div> : <div className="news__footer">
                    <div className={`btn btn_outline btn_hidden`}><span>"скрыто"</span></div>
                </div>}
            </div>
        </div>
        <Rodal visible={visible} onClose={() => handleClose()}>
            <div className="slider-extra__modal">
                <img src={`https://mland.olit.su/${activeItem.image}`} className="slider-extra__image" />
                <div className="slider-extra__content">
                    {activeItem.title && <h6 className="">{activeItem.title}</h6>}
                    {activeItem.text && <div dangerouslySetInnerHTML={{ __html: activeItem.text }}></div>}
                </div>
            </div>
        </Rodal>
    </section>
}

export default SliderWithModal