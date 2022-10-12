import React, { useState, useRef } from 'react';
import { Link } from 'wouter';
import './index.scss';
import classNames from 'classnames';
import Dropdown from 'react-bootstrap/Dropdown';
import { useOutsideAlerter } from '../../layouts/Header';

function About({ config }) {
    const wrapperRef = useRef(null);

    const [show, setShow] = useState(false)
    useOutsideAlerter(wrapperRef, () => setShow(false));

    return <section className="about">
        <div className="container">
            <h3>{config.title}</h3>
            <div className="about__dropdown" ref={wrapperRef}>
                <div className="about__dropdown-value" onClick={() => setShow(!show)}>
                    <span>{config.title}</span>
                    <svg width="15" height="9" viewBox="0 0 15 9" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M6.19287 7.88852L1.19862 3.34174C-0.0499424 2.20504 -0.46613 0.5 0.643703 0.5C1.75354 0.5 2.30845 1.06835 5.08304 3.91009C7.85762 6.75183 8.18269 5.85056 8.96745 5.04678C10.6322 3.34174 11.6532 0.5 13.8729 0.5C15.6486 0.5 14.8866 2.20504 14.5166 2.77339L10.0773 7.32018C8.30155 9.13889 6.74779 8.45687 6.19287 7.88852Z" fill="#5B4670" />
                    </svg>

                </div>
                <div className={`about__dropdown-wrapper ${show ? 'active' : ''}`}>
                    {config.menu.map((el) => {
                        return <div className="about__dropdown-list">
                            <Link
                                className={classNames({
                                    "about__sidebar-main-link": true,
                                    "active": el?.active,
                                })}
                                to={el.url}
                                onClick={() => setShow(false)}
                            >{el.title}</Link>

                            {el.items.map((item) => {

                                return <Link
                                    className={classNames({
                                        "about__sidebar-link": true,
                                        "active": item?.active,
                                    })}
                                    onClick={() => setShow(false)}
                                    to={item.url}>{item.title}</Link>
                            })}
                        </div>
                    })}

                </div>
            </div>
            <div className="about__content">
                <div className="about__content-inner" dangerouslySetInnerHTML={{ __html: config.html }}>

                </div>
                <aside className="about__sidebar">
                    {config.menu.map((el) => {
                        return <div className="about__sidebar-list">
                            <Link
                                className={classNames({
                                    "about__sidebar-main-link": true,
                                    "active": el?.active,
                                })}
                                to={el.url}>{el.title}</Link>

                            {el.items.map((item) => {

                                return <Link
                                    className={classNames({
                                        "about__sidebar-link": true,
                                        "active": item?.active,
                                    })}
                                    to={item.url}>{item.title}</Link>
                            })}
                        </div>
                    })}

                </aside>
            </div>
        </div>
    </section >
}

export default About