import React from 'react';
import './index.scss';
import Slider from "react-slick";
import { Link } from 'wouter';
function News({ config }) {
    const settings = {
        infinite: true,
        speed: 500,
        arrow: true,

        slidesToScroll: 1,
        slidesToShow: 3,
        // centerPadding: "30px",
    };

    return <section className="news">
        <div className="container">
            <div className="news__content">
                <h3>{config.title}</h3>
                <Slider {...settings}>
                    {config.items.map((el) => {
                        return <div className="news__item">
                            <img src={`https://mland.olit.su/${el.image}`} className="news__image" />
                            {el.title && <Link to={el.url} className="news__title">{el.title}</Link>}
                            {el.sub && <div className="news__sub">{el.sub}</div>}
                        </div>
                    })}
                </Slider>
                {config.all_games && <div className="news__footer">
                    <Link to={config.all_games.url} ><div className={`btn btn_primary btn_outline`}><span>{config.all_games.label}</span></div></Link>
                </div>}
            </div>
        </div>
    </section>
}

export default News