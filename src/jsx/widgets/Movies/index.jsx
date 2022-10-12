import React from 'react';
import './index.scss';
import Slider from "react-slick";
import { Link } from 'wouter';

import classNames from 'classnames';

function Movies({ config }) {

    const settings = {
        infinite: true,
        speed: 500,
        arrow: true,

        slidesToScroll: 1,
        slidesToShow: config.slides_count,
        // centerPadding: "30px",
        responsive: [
            {
                breakpoint: 1800,
                settings: {
                    slidesToShow: 3,
                    slidesToScroll: 1,
                }
            },
            {
                breakpoint: 991,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 1,
                }
            },
            {
                breakpoint: 767,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 1,
                }
            },
            {
                breakpoint: 500,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                }
            },


        ]
    };

    console.log(config)


    return <section className={classNames({
        "movies-block": true,
        "movies-block_theme_movies": config.id == 'contests',
        [`movies-block_theme_${config.id}`]: true,
    })}
    >
        <div className="container">
            <div className="movies__content">
                <h3>{config.title} </h3>
                <Slider {...settings}>
                    {config.items.map((el) => {
                        return <Link to={el.url || '/'} className={`movies__item ${el.url ? "" : "disabled"}`}>
                            <img src={`https://mland.olit.su${el.image}`} className="movies__image" />
                            {el.title && <div className="movies__title">{el.title}</div>}
                            {el.text && <div className="movies__text">{el.text}</div>}
                            {el.sub && <div className="movies__sub">{el.sub}</div>}
                        </Link>
                    })}
                </Slider>
                {config.all_movies ? <div className="movies__footer">
                    <Link to={config.all_movies.url}>
                        <div className={`btn btn_${config.all_movies.style} btn_outline`}>
                            <span>{config.all_movies.label}</span>
                        </div>
                    </Link>
                </div> : <div className="movies__footer">
                    <div className={`btn btn_outline btn_hidden`}><span>"скрыто"</span></div>
                </div>}
            </div>
        </div>
    </section >
}

export default Movies