import React, { useEffect, useState } from 'react';
import './index.scss';
import Slider from "react-slick";
import renderItem from './item';




function ContestsCarousel({ config }) {

    const settings = {
        speed: 500,
        arrow: true,
        infinite: false,
        slidesToScroll: 1,
        // slidesToShow: 3,
        variableWidth: true,
        // centerPadding: "30px",
        responsive: [
            {
                breakpoint: 767,
                settings: {
                    variableWidth: false,
                    slidesToShow: 1,
                    slidesToScroll: 1,
                }
            },

        ]
    };


    return <section className="contests-carousel">
        <div className="container">
            <h3>{config.title}</h3>
            <div className="contests-carousel__content">
                {config.items?.length > 1 ? <Slider {...settings}>
                    {config.items.map((el) => {
                        return renderItem(el);
                    })}
                </Slider> : <>
                    {config.items.map((el) => {
                        return renderItem(el)
                    })}
                </>}

            </div>
        </div>
    </section>
}

export default ContestsCarousel