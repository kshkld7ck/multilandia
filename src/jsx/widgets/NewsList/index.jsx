import React, { useState, useEffect } from 'react';
import { Link } from 'wouter';
import SortBlock from '../SortBlock';
import './index.scss';
import Axios from "axios";
import useLocation from "wouter/use-location";
import Pagination from '../../components/Pagination';

function NewsList({ config }) {
    const [location] = useLocation();
    const [activePage, setActivePage] = useState(config.pagination.page);
    const [pages, setPages] = useState(config.pagination.pages)
    const [items, setItems] = useState(config.items);
    const [activeId, setActiveId] = useState(config.filter?.items?.filter((el) => location.includes(el.id))[0]?.id);
    const handleCallback = (id) => {
        setActiveId(id);
        // console.log(window.history.pushState("", "", id));
    }
    // console.log('test1', config.filter?.items?.filter((el) => !!location.includes(el.id))[0].id)
    // console.log('test', config?.filter.items)

    useEffect(() => {
        const params = {
            url: `${config.filter.url.replace("{ID}", activeId)}&full=0&page=${activePage}`
        }
        

        console.log('params', params.url)
        Axios.get(`/api${params.url}`).then(function (response) {
            if (response.data) {
                setItems(response.data.items)
                // console.log('data', response.data.items)
                // setActivePage()
                setPages(response.data?.pagination?.pages)
            }
        })
    }, [activeId, activePage])
    return <section className="news-list">
        <div className="container">
            <div className="news-list__content">
                <h3>{config.title}</h3>
                {config?.filter?.items?.length > 0 && <SortBlock items={config.filter.items} activeId={activeId} callback={handleCallback} />}
                <div className="news-list__items">
                    {items?.length > 0 && items.map((el) => {
                        return <Link href={el.url || '/'} className="news__item">
                            <img src={`https://mland.olit.su${el.image}`} className="news__image" loading="lazy" />
                            {el.title && <div className="news__title">{el.title}</div>}
                            {el.text && <div className="news__text">{el.text}</div>}
                            {el.sub && <div className="news__sub">{el.sub}</div>}
                        </Link>
                    })}
                </div>
            </div>
            {config.pagination.pages > 1 && <Pagination nPages={config.pagination.pages} currentPage={activePage} setCurrentPage={(item) => setActivePage(item.selected)} />}
        </div>
    </section>
}

export default NewsList