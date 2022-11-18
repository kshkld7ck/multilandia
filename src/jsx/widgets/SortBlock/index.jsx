import React, { useState, useRef, useEffect } from 'react';
import './index.scss';
import Form from 'react-bootstrap/Form';
import SearchIcon from '../../../assets/images/search.svg';
import classNames from 'classnames';
import { useOutsideAlerter } from '../../layouts/Header';
import { useWindowSize } from '../../layouts/Header';

function SortBlock(props) {
    const { items, callback } = props;
    const wrapperRef = useRef(null);

    const [visible, setVisible] = useState(false);
    useOutsideAlerter(wrapperRef, () => setVisible(false));
    const size = useWindowSize()[0];

    const [active, setActive] = useState(items.find((el, i) => el.id == 0).id)
    useEffect(() => {
        const block = document.querySelector('.sort-block__content');
        if (size > 767) {
            setTimeout(() => {
                block.scrollTo({
                    left: 3000,
                    behavior: "smooth"
                });
            }, 200)


        } else if (size <= 767) {
            console.log('wewew')
            setTimeout(() => {
                block.scrollTo({
                    left: -500,
                    behavior: "smooth"
                });
            }, 200)
        }
    }, [visible])
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
            {/* <Form.Group ref={wrapperRef} className={`sort-block__search ${visible ? "active" : ""}`} controlId="formBasicEmail">
                <Form.Control type="email" placeholder="ПОИСК" />
                <img src={SearchIcon} alt="" className="sort-block__search-icon" onClick={() => setVisible(!visible)} />
            </Form.Group> */}
        </div>
    </section>
}

export default SortBlock