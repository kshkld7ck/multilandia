import React, { useState, useEffect } from 'react';
import { Link } from 'wouter';
import Axios from "axios";

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
    const [items, setItems] = useState(config.items)
    const [active, setActive] = useState(false);
    const [activeFilters, setActiveFilters] = useState({})

    const submitFilters = (data) => {
        return Axios.get(`/api/movies/search`, {
            params: {
                age: data['age']
            }
        }).then(function (response) {
            if (response.data) {
                // setItems(response.data.items)
                // setFilters(response.data.filters)
            }
        })
    }
    const changeFilters = (event) => {
        const checked = event.target.checked;
        const name = event.target.name;
        const value = event.target.value;
        let data = activeFilters;
        console.log(data[name])

        if (Array.isArray(data[name])) {
            if (checked) {
                data[name] = data[name].concat([value])
            } else {
                data[name] = data[name].filter((el) => el !== value)
                console.log('map', data[name].filter((el) => el !== value))
            }
        } else {
            data[name] = [value]
        }
        console.log('data', data)
        setActiveFilters({ ...data })
        console.log('activeFilters', activeFilters)
        // submitFilters(data)
    }
    useEffect(() => {
        Axios.get(`/api/movies/search`, {
            params: activeFilters
        }).then(function (response) {
            if (response.data) {
                setItems(response.data.items)
                // setFilters(response.data.filters)
            }
        })
    }, [activeFilters])

    return <section className="movies-page">
        <div className="container">
            <h3>{config.title}</h3>

            <div className="movies-page__content">
                <div className="movies-page__list">
                    {items.map((el) => {
                        return <Link to={`/movies/${el.url}`} className="movies-page__item" key={el.id}>
                            <img src={`https://mland.olit.su/${el.img}`} className="movies-page__item-image" />
                            {el.age && <div className="movies-page__item-age">{el.age}</div>}
                            <div className="movies-page__item-title">{el.title}</div>
                            <Link className="movies-page__item-hashtag" to={el.hashtag.url}>{el.hashtag.title}</Link>
                        </Link>
                    })}
                </div>
                <div className={`movies-page__filters ${active ? "active" : ""}`}>
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
                                    <FiltersKinds value={el[1]} handleChange={(event) => changeFilters(event)} activeFilters={activeFilters} />
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