import React, { useState, useEffect } from 'react';
import { Link } from 'wouter';
import SortBlock from '../SortBlock';
import './index.scss';
import Axios from "axios";
import useLocation from "wouter/use-location";
import Pagination from '../../components/Pagination';
import Preloader from '../../components/Preloader';

function NewsList({ config }) {
    const [location] = useLocation();
    const [activePage, setActivePage] = useState(config.pagination.page);
    const [pages, setPages] = useState(config.pagination.pages)
    const [items, setItems] = useState(config.items);
    const [isLoading, setLoading] = useState(false)
    const defaultActive = config.filter?.items?.filter((el) => location.includes(el.id))
    const [activeId, setActiveId] = useState(defaultActive?.length > 0 ? defaultActive[0]?.id : config.filter.items[0]?.id);
    const handleCallback = (id, url) => {
        setActiveId(id);
        console.log(window.history.pushState("", "", url));
    }
    // console.log('test1', config.filter?.items?.filter((el) => !!location.includes(el.id))[0].id)
    // console.log('test', config?.filter.items)

    useEffect(() => {
        const params = {
            url: `${config.filter.url.replace("{ID}", activeId)}&full=0&page=${activePage}`
        }

        setItems([])
        setLoading(true)
        console.log('params', params.url)
        Axios.get(`/api${params.url}`).then(function (response) {
            if (response.data) {
                setItems(response.data.items)
                // console.log('data', response.data.items)
                // setActivePage()
                setLoading(false)
                setPages(response.data?.pagination?.pages)
            }
        })
    }, [activeId, activePage])

    useEffect(() => {
        setItems(config.items)
    }, [config.items])
    return <section className="news-list">
        <div className="container">
            <div className="news-list__content">
                <h3>{config.title}</h3>
                {isLoading ? <Preloader /> : <>
                    {config?.filter?.items?.length > 0 && <SortBlock items={config.filter.items} activeId={activeId} callback={handleCallback} />}
                    <div className="news-list__items">
                        {items?.length > 0 ? items.map((el) => {
                            return <Link href={el.url || '/'} className="news__item">
                                <img src={`https://mland.olit.su${el.image}`} className="news__image" loading="lazy" />
                                {el.title && <div className="news__title">{el.title}</div>}
                                {el.text && <div className="news__text">{el.text}</div>}
                                {el.sub && <div className="news__sub">{el.sub}</div>}
                            </Link>
                        }) : <div className="no-content">???? ?????????????? ?????????????? ?????? ????????????</div>}
                    </div>
                </>}
            </div>
            {pages > 1 && <Pagination nPages={pages} currentPage={activePage} setCurrentPage={(item) => setActivePage(item.selected)} />}
        </div>
    </section>
}

export default NewsList