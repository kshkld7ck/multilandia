import React from 'react';
import './index.scss';
import Slider from "react-slick";
import { Link } from 'wouter';
import Arrow from '../../../assets/images/arrow2.svg'
function Banners({ config }) {
    function SampleNextArrow(props) {
        const { className, style, onClick } = props;
        return (
            <div
                className={className}
                onClick={onClick}
            ><img src={Arrow} alt="" /></div>
        );
    }

    function SamplePrevArrow(props) {
        const { className, style, onClick } = props;
        return (
            <div
                className={className}
                onClick={onClick}
            ><img src={Arrow} alt="" /></div>
        );
    }

    const settings = {
        infinite: true,
        speed: 500,
        dots: true,
        arrow: true,
        className: "center",
        centerMode: true,
        slidesToScroll: 1,
        slidesToShow: 1,
        centerPadding: "30px",
        responsive: [
            {
                breakpoint: 767,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                    centerPadding: "10px",


                }
            },

        ]
    };
    return <section className="banners">
        <div className="banners__content">
            <Slider {...settings}>
                {config.items.map((el) => {
                    return <div className="banners__item">
                        <div className="banners__item-info">
                            <div className="banners__item-title">
                                {el.title}
                            </div>
                            <div className="banners__item-text">
                                {el.text}
                            </div>
                        </div>
                        {/* <SamplePrevArrow className="banners__arrow" /> */}
                        <Link to={el.button.url} className="btn btn_primary btn_outline">{el.button.text}</Link>
                        <img className="banners__item-image" src={`https://mland.olit.su${el.image}`} alt="" />
                    </div>
                })}
            </Slider>
            <div className="banners__item-arrows">
                <SamplePrevArrow className="banners__arrow banners__arrow_prev" onClick={() => document.querySelector('.banners .slick-arrow.slick-prev').click()} />
                <SampleNextArrow className="banners__arrow" onClick={() => document.querySelector('.banners .slick-arrow.slick-next').click()} />
            </div>
        </div>
    </section>
}

export default Banners