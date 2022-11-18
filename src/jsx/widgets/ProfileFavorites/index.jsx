import React from 'react';
import { Link } from 'wouter';
import './index.scss';

function ProfileFavorites({ config }) {
    return <section className="movies-page movies-page_favorites">
        <div className="container">
            <div className="movies-page__content">
                <div className="movies-page__list">
                    {config.items.map((el) => {
                        return <Link to={`/movies/${el.url}`} className="movies-page__item" key={el.id}>
                            <img src={`https://mland.olit.su/${el.img}`} className="movies-page__item-image" loading="lazy"/>
                            {el.age && <div className="movies-page__item-age">{el.age}</div>}
                            <div className="movies-page__item-title">{el.title}</div>
                            {/* <div className="movies-page__item-hashtag" >{el.hashtag.title}</div> */}
                        </Link>
                    })}
                </div>
            </div>
        </div>
    </section>
}

export default ProfileFavorites