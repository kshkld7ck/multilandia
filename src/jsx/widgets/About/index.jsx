import React from 'react';
import { Link } from 'wouter';
import './index.scss';
import classNames from 'classnames';

function About({ config }) {
    return <section className="about">
        <div className="container">
            <h3>{config.title}</h3>
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
    </section>
}

export default About