import React from 'react';
import './index.scss';

function ProgrammsMovie({ config }) {
    return <section className="programms programms-movie">
        <div className="container">
            {config.title && <h3>{config.title}</h3>}
            <div className="programms__list">
                {config.items.map((el) => {
                    return <div className={`programms__item ${el.active ? 'active' : ''}`} key={el.id}>
                        <div className="programms__item-time">
                            <span>{el.date.date}</span>
                            <p>{el.date.time}</p>
                        </div>
                        <img src={`https://mland.olit.su/${el.image}`} className="programms__item-image" alt=""  loading="lazy"/>
                        <div className="programms__item-info">
                            <div className="programms__item-name">{el.title}</div>
                            <div className="programms__item-tags">
                                {el.series.map((item) => <span>{item.replace(el.title + '.', "")}</span>)}
                            </div>
                        </div>
                    </div>
                })}
            </div>
        </div>
    </section>
}

export default ProgrammsMovie