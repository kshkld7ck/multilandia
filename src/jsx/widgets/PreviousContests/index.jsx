import React from 'react';
import { Link } from 'wouter';
import './index.scss';

function PreviousContests({ config }) {

    return <section className="prev-contests">
        <div className="container">
            <h3>{config.title}</h3>
            <div className="prev-contests__list">
                {config.items.map((el) => {
                    return <Link to={el.url} className="prev-contests__item" key={el.id}>
                        <div className="prev-contests__item-contetn">
                            <img src={`https://mland.olit.su/${el.image}`} alt="" className="prev-contests__image" />
                            <div className="prev-contests__title">
                                {el.title}
                            </div>
                            {el.text && <div className="prev-contests__text">
                                {el.text}
                            </div>}
                            <span className="prev-contests__badge">Завершен</span>

                        </div>
                        {el.date && <div className="prev-contests__date">
                            {el.date}
                        </div>}
                    </Link>
                })}
            </div>
        </div>
    </section >
}

export default PreviousContests