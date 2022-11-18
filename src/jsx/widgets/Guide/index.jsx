import React, { useLayoutEffect, useState, useEffect } from 'react';
import './index.scss';
import Slider from "react-slick";
import { Link } from 'wouter';

function Guide({ config }) {
    const useWindowSize = () => {
        const [size, setSize] = useState([0, 0]);
        useLayoutEffect(() => {
            function updateSize() {
                setSize([window.innerWidth, document.documentElement.offsetHeight]);
            }
            window.addEventListener("resize", updateSize);
            updateSize();
            return () => window.removeEventListener("resize", updateSize);
        }, []);
        return size;
    };
    const windowSize = useWindowSize()[0];
    const [slideIndex, setSlideIndex] = useState(0)
    const [sliderRef, setSliderRef] = useState(null)
    const settings = {
        dots: false,
        infinite: false,
        speed: 500,
        slidesToShow: 4,
        slidesToScroll: 4,
        // variableWidth: true,
        // afterChange: () =>
        // this.setState(state => ({ updateCount: state.updateCount + 1 })),
        beforeChange: (current, next) => setSlideIndex(next),
        responsive: [
            {
                breakpoint: 1800,
                settings: {
                    slidesToShow: 3,
                    slidesToScroll: 3,
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
    }
    return <section className="guide">
        < div className="container" >
            <div className="guide__content">
                <div className="guide__header">
                    <h3>{config.title}</h3>
                    {config.all_guides && <Link className="btn btn_primary btn_outline guide__all-button" to={config.all_guides.url}>{config.all_guides.label}</Link>}
                </div>
                <Slider ref={(slider) => setSliderRef(slider)} {...settings}>
                    {config.items.map((el) => {
                        return <div className="guide__item">
                            <img src={`https://mland.olit.su${el.image}`} className="guide__image" loading="lazy" />
                            <p className="guide__title">{el.title}</p>
                            <span className="guide__time"><span>{el.time}</span></span>
                            <span className="guide__age">{el.age}</span>
                        </div>
                    })}
                </Slider>
                <input
                    onChange={e => sliderRef.slickGoTo(e.target.value)}
                    value={slideIndex}
                    type="range"
                    min={0}
                    max={windowSize < 1800 ? config.items.length - 3 : config.items.length - 4}
                />
            </div>
        </div >
    </section >
}

export default Guide