import React, { useState } from 'react';
import { Link } from 'wouter';
import './index.scss';
import Slider from "react-slick";
import Accordion from 'react-bootstrap/Accordion';
import Icon1 from '../../../assets/images/evening.svg';
import Icon2 from '../../../assets/images/sunrise.svg';
import Icon3 from '../../../assets/images/obed.svg';
import FiltersKinds from './filtersKinds';
import Form from 'react-bootstrap/Form';
import SearchIcon from '../../../assets/images/search.svg'
function MoviesPage({ config }) {
    const [filters, setFilters] = useState(config.filters)
    return <section className="movies-page">
        <div className="container">
            <h3>{config.title}</h3>

            <div className="movies-page__content">
                <div className="movies-page__list">
                    {config.items.map((el) => {
                        return <Link to={`/movies/${el.url}`} className="movies-page__item" key={el.id}>
                            <img src={`https://mland.olit.su/${el.img}`} className="movies-page__item-image" />
                            {el.age && <div className="movies-page__item-age">{el.age}</div>}
                            <div className="movies-page__item-title">{el.title}</div>
                            <Link className="movies-page__item-hashtag" to={el.hashtag.url}>{el.hashtag.title}</Link>
                        </Link>
                    })}
                </div>
                <div className="movies-page__filters">
                    {Object.entries(filters).map((el, i) => {
                        if (el[1].name == 'search') {
                            return <Form.Group className="movies-page__search" controlId="formBasicEmail">
                                <Form.Control type="email" placeholder="ПОИСК" />
                                <img src={SearchIcon} alt="" className="movies-page__search-icon" />
                            </Form.Group>
                        }
                        return <Accordion defaultActiveKey={i}>
                            <Accordion.Item eventKey={i}>
                                <Accordion.Header>
                                    {el[1].title}
                                </Accordion.Header>
                                <Accordion.Body>
                                    <FiltersKinds value={el[1]} />
                                </Accordion.Body>
                            </Accordion.Item>
                        </Accordion>
                    })}
                </div>
            </div>
        </div>
    </section >
}

export default MoviesPage