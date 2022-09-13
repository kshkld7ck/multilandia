import React, { useState } from 'react';
import './index.scss';
import Form from 'react-bootstrap/Form';
import SearchIcon from '../../../assets/images/search.svg';
import classNames from 'classnames';

function SortBlock(props) {
    const { items, callback } = props;
    const [active, setActive] = useState(items.find((el, i) => el.id == 0).id)
    console.log(' el', items.find((el, i) => el.id == 0).id)
    return <section className="sort-block">
        <div className="sort-block__content">
            <div className="sort-block__items" >
                {items.map((el) => <div
                    className={classNames({
                        "sort-block__item": true,
                        "active": el.id == active,

                    })} key={el.id} onClick={() => {
                        setActive(el.id)
                        callback(el.id)
                    }}>
                    {el.title}
                </div>)}
            </div>
            <Form.Group className="sort-block__search" controlId="formBasicEmail">
                <Form.Control type="email" placeholder="ПОИСК" />
                <img src={SearchIcon} alt="" className="sort-block__search-icon" />
            </Form.Group>
        </div>
    </section>
}

export default SortBlock