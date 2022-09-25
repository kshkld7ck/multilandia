import React, { useState } from 'react';
import './index.scss';
import Rodal from 'rodal';
import Arrow from '../../../assets/images/arrow.svg';

function FavoriteContests({ config }) {
    const [item, setItem] = useState({});
    const [visible, setVisible] = useState(false);

    const [itemIndex, setItemIndex] = useState(0);
    const handleOpen = (item, index) => {
        setVisible(true);
        setItem(item)
        setItemIndex(index)
        console.log(index, "old", "new", config.items?.length)
    }
    const handleClose = () => { setVisible(false) }

    return <section className="contests-winners contests-winners_without_bg">
        <div className="container">
            <div className="fav-contests__list">
                {config.items.map((el, i) => {
                    return <div onClick={() => {
                        handleOpen(el, i)
                    }} className="contests-winners__item">
                        <div className="contests-winners__image">
                            <img src={`https://mland.olit.su/${el.img}`} className="" />
                            {el.is_winner == 1 && <div className="contests-winners__badge">ПОБЕДИТЕЛЬ</div>}
                        </div>
                        {el.title && <div className="contests-winners__name">{el.title}</div>}
                        {el.votes && <div className="contests-winners__votes">Голосов: {el.votes}</div>}
                    </div>
                })}
            </div>
        </div>
        <Rodal visible={visible} onClose={() => handleClose()}>
            <div className="contests-modal">
                <div className="contests-modal__image">
                    <img src={`https://mland.olit.su/${item.img}`} className="contests-modal__image-item" />
                    {/* <div className="contests-modal__badge">ПОБЕДИТЕЛЬ</div> */}

                    <div className={`arrow-left ${itemIndex == 0 ? 'disabled' : ''}`}>
                        <button onClick={() => {
                            setItem(config.items[itemIndex - 1])
                            setItemIndex(itemIndex - 1)
                        }}>
                            <img src={Arrow} alt="" />
                        </button>
                    </div>
                    <div className={`arrow-right ${itemIndex + 1 == config.items.length ? 'disabled' : ''}`}>
                        <button onClick={() => {
                            setItem(config.items[itemIndex + 1])
                            setItemIndex(itemIndex + 1)
                        }}>
                            <img src={Arrow} alt="" />
                        </button>
                    </div>

                </div>
                <div className="contests-modal__info">
                    <div className="contests-modal__name">
                        {item.title}
                    </div>
                    {item.votes && <div className="contest-modal__votes">
                        Голосов: {item.votes}
                    </div>}
                </div>
            </div>
        </Rodal>
    </section>
}

export default FavoriteContests