import React from 'react';
import { Link } from 'wouter';
import './index.scss';
import Slider from "react-slick";
import { useWindowSize } from '../../layouts/Header/index'
function MoviePage({ config }) {
    const settings = {
        infinite: true,
        speed: 500,
        arrow: true,
        slidesToScroll: 1,
        slidesToShow: 1,
        lazyLoad: true,

    };

    return <section className="movie-page">
        <div className="container">
            <h3>{config.title} <button className="btn btn_primary btn_favorite"><svg width="23" height="21" viewBox="0 0 23 21" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M14.2994 4.46715C14.9876 5.93025 15.7987 6.40222 17.6913 6.61461C18.2402 6.70901 19.9132 6.96859 22.2138 7.25178C25.0895 7.60575 19.2152 11.8535 18.3549 12.7974C17.4946 13.7413 18.8711 18.5554 18.9448 20.3725C19.0185 22.1896 13.2425 19.0038 12.1364 18.343C11.0304 17.6823 8.25298 19.8061 5.35267 20.8681C2.45236 21.93 4.86109 16.29 4.93483 14.3549C5.00857 12.4198 1.9362 11.0747 0.264841 8.97446C-1.40652 6.8742 5.32809 6.49663 6.63077 6.35503C7.93345 6.21344 9.08866 2.90965 10.3668 0.620603C11.6449 -1.66845 13.6112 3.00405 14.2994 4.46715Z" fill="white" />
            </svg>
                В избранное
            </button>
            </h3>

            <div className="movie-page__content">
                <img src={`https://mland.olit.su/${config.img}`} alt="" className="movie-page__image" loading="lazy" />

                <div className="movie-page__info">
                    {Object.values(config.properties).map((el) => {
                        return <div className="movie-page__info-item">
                            <div className="movie-page__info-key">
                                {el.title}
                            </div>
                            <div className="movie-page__info-value">
                                {el.items.map((item, i) => <Link to={item.url || "/"}>{item.name}</Link>)}
                            </div>
                        </div>
                    })}
                </div>


            </div>
            <button className="btn btn_primary btn_favorite"><svg width="23" height="21" viewBox="0 0 23 21" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M14.2994 4.46715C14.9876 5.93025 15.7987 6.40222 17.6913 6.61461C18.2402 6.70901 19.9132 6.96859 22.2138 7.25178C25.0895 7.60575 19.2152 11.8535 18.3549 12.7974C17.4946 13.7413 18.8711 18.5554 18.9448 20.3725C19.0185 22.1896 13.2425 19.0038 12.1364 18.343C11.0304 17.6823 8.25298 19.8061 5.35267 20.8681C2.45236 21.93 4.86109 16.29 4.93483 14.3549C5.00857 12.4198 1.9362 11.0747 0.264841 8.97446C-1.40652 6.8742 5.32809 6.49663 6.63077 6.35503C7.93345 6.21344 9.08866 2.90965 10.3668 0.620603C11.6449 -1.66845 13.6112 3.00405 14.2994 4.46715Z" fill="white" />
            </svg>
                В избранное</button>
            <div className="movie-page__videos">
                <Slider {...settings}>
                    {config.videos.map((el) => {
                        return <div className="movie-page__videos-item">
                            <iframe src={el.embed} frameborder="0"></iframe>
                            <div className="movie-page__videos-title">{el.title}</div>
                        </div>
                    })}
                </Slider>
                <div className="movie-page__videos-info">

                </div>
            </div>
            {config.text && <div className="movie-page__about">
                <h4>О мультфильме</h4>
                <p>{config.text}</p>
            </div>
            }
        </div>
    </section>
}

export default MoviePage