import React from 'react';
import { Link } from 'wouter';
import './index.scss';

function ProfileTabs({ config }) {
    return <section className="profile-tabs">
        <div className="container">
            <div className="profile-tabs__content">
                {config.items.map((el) => {
                    return <Link to={el.url} className={`profile-tabs__item ${el.active ? "active" : ""}`}>{el.title}</Link>
                })}
            </div>
        </div>
    </section>
}

export default ProfileTabs
