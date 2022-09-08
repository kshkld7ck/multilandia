import React from 'react';
import { Link } from 'wouter';
import './index.scss';

function Breadcrumbs({ config }) {
    return <section id="breadcrumbs" className="breadcrumbs">
        <div className="container">
            <div className="breadcrumbs__list">
                {[{
                    url: "/",
                    title: "Главная",
                }].concat(config.items).map((el) => {
                    return el.url ? <Link className="breadcrumbs__item" to={el.url}>{el.title}</Link> : <span className="breadcrumbs__item">{el.title}</span>
                })}
            </div>
        </div>
    </section>
}

export default Breadcrumbs