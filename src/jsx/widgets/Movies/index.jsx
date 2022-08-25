import React from 'react';
import './index.scss';
import Slider from "react-slick";
import { Link } from 'wouter';


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
           
          ]
    };

    console.log(config)


    return <section className={`movies-block movies-block_theme_${config.id}`}>
        <div className="container">
            <div className="movies__content">
                <h3>{config.title}</h3>
                <Slider {...settings}>
                    {config.items.map((el) => {
                        return <div className="movies__item">
                            <img src={`https://multilandia.tv:4433/${el.image}`} className="movies__image" />
                            {el.title && <div className="movies__title">{el.title}</div>}
                            {el.text && <div className="movies__text">{el.text}</div>}
                            {el.sub && <div className="movies__sub">{el.sub}</div>}
                        </div>
                    })}
                </Slider>
                {config.all_movies && <div className="movies__footer">
                    <Link to={config.all_movies.url} ><div className={`btn btn_${config.all_movies.style} btn_outline`}><span>{config.all_movies.label}</span></div></Link>
                </div>}
            </div>
        </div>
    </section>
}

export default Movies