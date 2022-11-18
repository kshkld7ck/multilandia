import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'wouter';
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
import FiltersIcon from '../../../assets/images/filters.svg'
import Arrow from '../../../assets/images/arrowPrimary.svg'

function MoviesPage({ config }) {
    const getFilters = () => {
        let currentUrl = window.location.href;
        let newFilters = {};
        const url = new URL(currentUrl);
        for (let pair of url.searchParams.entries()) {
            const urlKey = pair[0];
            const urlValue = pair[1];
            if (urlValue.includes("=")) {

                urlValue.split("&").forEach((el) => {
                    // const elKey = el.split("=")[0];
                    // const elValue = el.split("=")[1];

                    // if (el[1].includes("true") || el[1].includes("false")) {
                    //     self.activeFilters.set(urlKey, { [elKey]: elValue[0] });
                    // } else {
                    //     self.activeFilters.set(
                    //         urlKey,
                    //         parentElement ? parentElement.merge({ [elKey]: elValue }) : { [elKey]: elValue },
                    //     );
                    // }
                });
            } else {
                if (urlValue.includes(',')) {
                    newFilters[urlKey] = urlValue.split(',')

                } else if (config.filters[urlKey]?.type == 'checkbox') {
                    newFilters[urlKey] = [urlValue]
                } else {
                    newFilters[urlKey] = urlValue
                }

                setActiveFilters(newFilters)
                // if (urlValue == "false" || urlValue == "true") {
                //     self.activeFilters.set(urlKey, urlValue == "true" ? true : false);
                // } else {
                //     self.activeFilters.set(urlKey, urlValue.split(","));
                // }
            }
        }
    }
    const [filters, setFilters] = useState(config.filters)
    const [items, setItems] = useState(config.items)
    const [active, setActive] = useState(false);

    const [activeFilters, setActiveFilters] = useState({})
    const [location, setLocation] = useLocation()
    const getUrl = () => {
        let { protocol, host, pathname } = window.location;
        return new URL(`${protocol}//${host}${pathname}`);
    }
    useEffect(() => {
        getFilters()
    }, [])
    const changeFilters = (event) => {
        const checked = event.target.checked;
        const name = event.target.name;
        const value = event.target.value;
        const type = event.target.type;
        let data = activeFilters;
        if (type == 'checkbox') {
            if (Array.isArray(data[name])) {
                if (checked) {
                    data[name] = data[name].concat([value])
                } else {
                    let newData = data[name].filter((el) => el !== value);
                    if (newData?.length > 0) {
                        data[name] = newData
                    } else {
                        delete data[name]
                    }


                }
            } else {
                data[name] = [value]
            }
        } else if (type == 'radio') {
            if (checked) {
                data[name] = value
            }
        } else if (type == 'text') {
            if (value.length > 0) {
                data[name] = value;

            } else {
                delete data[name]
            }
        }

        setActiveFilters({ ...data })
        const filters = data;
        const location = window.location;
        let currentUrl = new URL(location.href);
        let url = getUrl();
        Object.entries(filters).forEach((el) => {
            const urlKey = el[0];
            const urlValue = el[1];
            if (typeof urlValue !== "object" || Array.isArray(urlValue)) {
                url.searchParams.set(urlKey, urlValue);
            } else {
                url.searchParams.set(urlKey, new URLSearchParams(urlValue).toString());
            }
        });
        setLocation(url)
        console.log('url', url)
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
            <div className="movies-page__filters-button" onClick={() => setActive(true)}>Фильтры <img src={FiltersIcon} alt="" /></div>
            <div className="movies-page__content">
                {items?.length > 0 ? <div className="movies-page__list">
                    {items.map((el) => {
                        return <Link to={`/movies/${el.url}`} className="movies-page__item" key={el.id}>
                            <img src={`https://mland.olit.su/${el.img}`} className="movies-page__item-image" loading="lazy"/>
                            {el.age && <div className="movies-page__item-age">{el.age}</div>}
                            <div className="movies-page__item-title">{el.title}</div>
                            <Link className="movies-page__item-hashtag" to={el.hashtag.url}>{el.hashtag.title}</Link>
                        </Link>
                    })}
                </div> : <div className="no-content">Не найдено ни одного мультфильма</div>}
                <div className={`movies-page__filters ${active ? "active" : ""}`}>
                    <h4><img src={Arrow} alt="" onClick={() => setActive(false)} /> Фильтры</h4>
                    {Object.entries(filters).map((el, i) => {
                        if (el[1].name == 'search') {
                            return <Form.Group className="movies-page__search" controlId="formBasicEmail">
                                <Form.Control type="text" name="text" value={activeFilters['text']} placeholder="ПОИСК" onChange={(e) => changeFilters(e)} />
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