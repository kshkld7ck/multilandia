import React, { useState, useEffect } from 'react';
import { Link } from 'wouter';
import './index.scss';
import Slider from "react-slick";
import Accordion from 'react-bootstrap/Accordion';
import Icon1 from '../../../assets/images/evening.svg';
import Icon2 from '../../../assets/images/sunrise.svg';
import Icon3 from '../../../assets/images/obed.svg';
import Icon4 from '../../../assets/images/night.svg';
import AccordionIcon from '../../../assets/images/accordionButton.svg';
function Programms({ config }) {
    // const [activeKey, setActiveKey] = useState("0")
    console.log(config.items.fil)
    let startDayIndex = 0;
    let activeKey = 0;
    config.dates.forEach((el, index) => {
        if (el.active) {
            startDayIndex = index;
        }
    })

    config.items.forEach((el, index) => {
        if (el.active) {
            activeKey = index;
        }
    })

    console.log(activeKey)
    const settings = {
        infinite: true,
        speed: 500,
        arrow: true,

        slidesToScroll: 1,
        slidesToShow: 7,
        initialSlide: startDayIndex,
        // centerPadding: "30px",
        responsive: [
            {
                breakpoint: 1800,
                settings: {
                    // variableWidth: true,

                    slidesToShow: 6,
                    slidesToScroll: 1,
                }
            },
            {
                breakpoint: 1200,
                settings: {
                    // variableWidth: true,

                    slidesToShow: 4,
                    slidesToScroll: 1,
                }
            },

        ]
    };

    const icons = {
        "Утро": Icon2,
        "День": Icon3,
        "Вечер": Icon1,
        "Ночь": Icon4
    }
    return <section className="programms">
        <div className="container">
            <h3>{config.title}</h3>

            <div className="programms__content">
                <div className="programms__dates">
                    <Slider {...settings}>
                        {config.dates.map((el) => {
                            return <Link to={"/"} className={`programms__dates-item ${el.active ? 'active' : ''}`}>
                                <div className="programms__date-heading">
                                    {el.title}
                                </div>
                                <div className="programms__date-subheading">
                                    {el.date}
                                </div>
                            </Link>
                        })}
                    </Slider>
                </div>
                <div className="programms__list">
                    <Accordion alwaysOpen defaultActiveKey={activeKey.toString()}>
                        {config.items.map((el, i) => {
                            return el.childrens?.length > 0 && <Accordion.Item eventKey={i.toString()} >
                                <Accordion.Header>
                                    <div className="programms__accordion-header">
                                        <div>
                                            <img src={icons[el.title]} alt="" /> <span>{el.title}</span>
                                        </div>
                                        <img src={AccordionIcon} className="programms__accordion-toggler" alt="" />
                                    </div>
                                </Accordion.Header>
                                <Accordion.Body>
                                    {el.childrens.map((el) => {
                                        return <div className={`programms__item ${el.active ? 'active' : ''}`} key={el.id}>
                                            <div className="programms__item-time">{el.time} </div>
                                            <img src={`https://mland.olit.su/${el.image}`} className="programms__item-image" alt="" />
                                            <div className="programms__item-info">
                                                <div className="programms__item-name">{el.title}</div>
                                                <div className="programms__item-tags">
                                                    {el.series.map((item) => <span>{item.replace(el.title + '.', "")}</span>)}
                                                </div>
                                            </div>
                                        </div>
                                    })}
                                </Accordion.Body>
                            </Accordion.Item>
                        })}


                    </Accordion>
                </div>

            </div>
        </div>
    </section >
}

export default Programms