import React from 'react';
import './index.scss';
import Slider from "react-slick";
import { Link } from 'wouter';


function Contests({ config }) {

    const settings = {
        infinite: true,
        speed: 500,
        arrow: true,

        slidesToScroll: 4,
        slidesToShow: 4,
        // centerPadding: "30px",
        responsive: [
            {
                breakpoint: 1800,
                settings: {
                    slidesToShow: 3,
                    slidesToScroll: 3,
                }
            },

        ]
    };

    console.log(config)

    return <section className={`movies-block movies-block_theme_movies movies-block_theme_contests`}>
        <div className="container">
            <div className="movies__content">
                <h3>{config.title}</h3>
                <Slider {...settings}>
                    {config.items.map((el) => {
                        return <div className="movies__item">
                            <img src={`https://mland.olit.su/${el.image}`} className="movies__image" loading="lazy" />
                            {el.title && <div className="movies__title">{el.title}</div>}
                            {el.text && <div className="movies__text">{el.text}</div>}
                            {el.sub && <div className="movies__sub">{el.sub}</div>}
                        </div>
                    })}
                </Slider>
                {config.all_contests && <div className="movies__footer">
                    <Link to={config.all_contests.url} ><div className="btn btn_white btn_outline"><span>{config.all_contests.label}</span></div></Link>
                </div>}
            </div>
        </div>
    </section>
}

export default Contests