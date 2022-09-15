import React, { useState, useEffect } from 'react';
import { Link } from 'wouter';
import './index.scss';
import useLocation from "wouter/use-location";

import Slider from "react-slick";
import Accordion from 'react-bootstrap/Accordion';
import Icon1 from '../../../assets/images/evening.svg';
import Icon2 from '../../../assets/images/sunrise.svg';
import Icon3 from '../../../assets/images/obed.svg';
import Icon4 from '../../../assets/images/night.svg';
import AccordionIcon from '../../../assets/images/accordionButton.svg';
import Axios from "axios";
import classNames from 'classnames';
import Preloader from '../../components/Preloader'

function Programms({ config }) {
    const [location] = useLocation();
    const [clickHandled, setClickHandled] = useState(false);
    const [isFetching, setIsFetching] = useState(false);
    // const [activeKey, setActiveKey] = useState("0")
    const [items, setItems] = useState(config.items)
    // const [activeDay, setActiveDay] = useState(config)
    console.log(config.items.fil)
    let startDayIndex = 0;
    let activeDay = 0;
    let activeKey = 0;
    config.dates.forEach((el, index) => {
        if (el.active) {
            startDayIndex = index;
            activeDay = index;
        }
    })

    const handleClick = (date, i) => {
        setIsFetching(true)
        Axios.get(`/api/guide/${date}`).then(function (response) {
            if (response.data) {
                // setData(response.data)
                console.log(response.data)
                setItems(response.data)
                activeDay = i;
                console.log('active', activeDay)
                setIsFetching(false)
            }
        })
    }

    items.forEach((el, index) => {
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
                <div
                    className={classNames({
                        "programms__dates": true,
                    })}
                // className="programms__dates"
                >
                    <Slider {...settings}>
                        {config.dates.map((el, i) => {
                            {/* */ }
                            return <>
                                <input type="radio" onChange={() => {
                                    setClickHandled(true)
                                    console.log('handl', clickHandled)
                                }} id={`programDate_${i}`} name="programDate" defaultChecked={i == activeDay} />
                                <label
                                    htmlFor={`programDate_${i}`}
                                    onClick={() => handleClick(el.datetime, i)}
                                    className={classNames({
                                        "programms__dates-item": true,
                                        "active": el.active && !clickHandled,
                                    })}
                                // className={`programms__dates-item ${el.active && !clickHandled ? 'active' : ''}`}
                                >
                                    <div className="programms__date-heading">
                                        {el.title}
                                    </div>
                                    <div className="programms__date-subheading">
                                        {el.date}
                                    </div>
                                </label></>
                        })}
                    </Slider>
                </div>
                <div className="programms__list">
                    {isFetching ? <Preloader /> : <Accordion alwaysOpen defaultActiveKey={activeKey.toString()}>
                        {items.map((el, i) => {
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
                    }
                </div>

            </div>
        </div >
    </section >
}

export default Programms