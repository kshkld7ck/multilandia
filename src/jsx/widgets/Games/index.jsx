import React from 'react';
import './index.scss';
import Slider from "react-slick";
import { Link } from 'wouter';
function Games({ config }) {
    const settings = {
        infinite: true,
        speed: 500,
        arrow: true,

        slidesToScroll: 1,
        slidesToShow: 6,
        // centerPadding: "30px",
        responsive: [
            {
              breakpoint: 1800,
              settings: {
                slidesToShow: 4,
                slidesToScroll: 1,
              }
            },
           
          ]
    };

    return <section className="games">
        <div className="container">
            <div className="games__content">
                <h3>{config.title}</h3>
                <Slider {...settings}>
                    {config.items.map((el) => {
                        return <div className="games__item">
                            <img src={`https://mland.olit.su/${el.image}`} className="games__image" />
                            {el.title && <div className="games__title">{el.title}</div>}
                            {el.text && <div className="games__text">{el.text}</div>}
                            {el.sub && <div className="games__sub">{el.sub}</div>}
                        </div>
                    })}
                </Slider>
                {config.all_games && <div className="games__footer">
                    <Link to={config.all_games.url} ><div className={`btn btn_primary btn_outline`}><span>{config.all_games.label}</span></div></Link>
                </div>}
            </div>
        </div>
    </section>
}

export default Games