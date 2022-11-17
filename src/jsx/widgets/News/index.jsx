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
        slidesToShow: config.id == 'heroes' ? 6 : 3,
        responsive: [
            {
                breakpoint: 1800,
                settings: {
                    slidesToShow: config.id == 'heroes' ? 5 : 3,
                    slidesToScroll: config.id == 'heroes' ? 5 : 3,
                }
            },
            {
                breakpoint: 1200,
                settings: {
                    slidesToShow: config.id == 'heroes' ? 4 : 3,
                    slidesToScroll: config.id == 'heroes' ? 4 : 3,
                }
            },
            {
                breakpoint: 991,
                settings: {
                    slidesToShow: config.id == 'heroes' ? 3 : 2,
                    slidesToScroll: config.id == 'heroes' ? 3 : 2,
                }
            },
            {
                breakpoint: 767,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                }
            },

        ]
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
                            {el.title && <Link href={el.url || '/'} className="news__title">{el.title}</Link>}
                            {el.sub && <div className="news__sub">{el.sub}</div>}
                        </div>
                    })}
                </Slider>
                {/* {config.all_games && <div className="news__footer">
                    <Link to={config.all_games.url} ><div className={`btn btn_primary btn_outline`}><span>{config.all_games.label}</span></div></Link>
                </div>} */}
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
    </section>
}

export default News