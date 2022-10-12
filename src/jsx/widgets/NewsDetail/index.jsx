import React from 'react';
import './index.scss';
import Arrow from '../../../assets/images/arrow.svg'
import Slider from "react-slick";

function NewsDetail({ config }) {
    const settings = {
        infinite: true,
        speed: 500,
        dots: true,
        arrow: true,
        className: "center",
        centerMode: true,
        slidesToScroll: 1,
        slidesToShow: 1,
        centerPadding: "0px",
    };
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


    return <section className="news-detail">
        <div className="container">
            <h3>{config.title}</h3>
            {config.pub_date && <div className="news-detail__date">
                {config.pub_date}
            </div>}
            {config.images?.length > 0 && <div className="news-detail__slider">
                <Slider {...settings}>
                    {config.images.map((el) => {
                        return <img className="news-detail__image" src={`https://mland.olit.su${el}`} alt="" />
                    })}
                </Slider>
                {config.images?.length > 1 && <div className="banners__item-arrows">
                    <SamplePrevArrow className="banners__arrow banners__arrow_prev" onClick={() => document.querySelector('.news-detail .slick-arrow.slick-prev').click()} />
                    <SampleNextArrow className="banners__arrow" onClick={() => document.querySelector('.news-detail .slick-arrow.slick-next').click()} />
                </div>}
            </div>}

            {config.text && <div className="news-detail__text" dangerouslySetInnerHTML={{ __html: config.text }}>
            </div>}
        </div>
    </section>
}

export default NewsDetail