import React from 'react';
import { Link } from 'wouter';
import './index.scss';

function About({ config }) {
    return <section className="about">
        <div className="container">
            <h3>{config.title}</h3>
            <div className="about__content">
                <div className="about__content-inner" dangerouslySetInnerHTML={{__html: config.html}}>

                </div>
                <aside className="about__sidebar">
                    {config.menu.map((el) => {
                        return <div className="about__sidebar-list">
                            <Link className="about__sidebar-main-link" to={el.url}>{el.title}</Link>

                            {el.items.map((item) => {

                                return  <Link className="about__sidebar-link" to={item.url}>{item.title}</Link>
                            })}
                        </div>
                    })}

                </aside>
            </div>
        </div>
    </section>
}

export default About