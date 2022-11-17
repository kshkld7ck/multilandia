import React from 'react';
import { Link } from 'wouter';
import './index.scss';

function ErrorPage({ config }) {
    return <section className="error-page">
        <div className="container">
            <div className="error-page__content">
                <h2>404</h2>

                <div className="error-page__info">
                    <h5>Упс... <br />
                        Что-то пошло не так!</h5>
                    <p>Страница, которую вы ищите не существует</p>
                    <div className="error-page__button"><Link to={'/'} className="btn btn_primary btn_outline">ВЕРНУТЬСЯ НА ГЛАВНУЮ</Link></div>
                </div>
            </div>
        </div>
    </section>
}

export default ErrorPage