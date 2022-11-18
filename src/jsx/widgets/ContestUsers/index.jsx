import React, { useState } from 'react';
import './index.scss';
import Rodal from 'rodal';
import Arrow from '../../../assets/images/arrow.svg';
import '../FavoriteContests/index.scss';
import Axios from "axios";

function ContestsUsers({ config }) {
    const [item, setItem] = useState({});
    const [items, setItems] = useState(config.items)
    const [visible, setVisible] = useState(false);
    const [votedIds, setVotedIds] = useState([])

    const [itemIndex, setItemIndex] = useState(0);
    const handleOpen = (item, index) => {
        setVisible(true);
        setItem(item)
        setItemIndex(index)
    }
    const handleClose = () => { setVisible(false) }
    const voteFor = (id) => {
        const params = {
            id: id
        }
        return Axios.get(`/api/contests/vote`, { params: params }).then(function (response) {
            if (response.data) {
                // let newItems = items.map((el) => {
                //     return el.id == id ? { ...el, vote: 1, voites: el.voites++ } : el
                // })
                // console.log(newItems)
                setItems(response.data.items)
                response.data.items.find((el) => el.id == id) && setItem(response.data.items.find((el) => el.id == id))
            }
        })
    }
    const deleteVote = (id) => {
        const params = {
            id: id
        }
        return Axios.get(`/api/contests/vote`, { params: params }).then(function (response) {
            if (response.data) {
                // let newIds = votedIds;
                // newIds.filter(e => e !== id)
                // setVotedIds(newIds)
                // setItems([])
                // setItems(config.items)
                // let newItems = items.map((el) => {
                //     const newId
                //     return el.id == id ? { ...el, vote: 0, voites: el.voites - 1 } : el
                // })
                // console.log(res.dat)
                setItems(response.data.items)
                // console.log('id', response.data.items.find((el) => el.id == id))
                // console.log('ids', votedIds)
                response.data.items.find((el) => el.id == id) && setItem(response.data.items.find((el) => el.id == id))
            }
        })
    }
    const renderButton = (vote, id) => {
        console.log('votedIds.includes', votedIds.includes(id))
        if ((vote === 1)) {
            return <button className="btn btn_white btn_rounded btn_outline" onClick={() => deleteVote(id)}>Отменить голос</button>
        } else if (vote === 0) {
            return <button className="btn btn_white btn_rounded btn_outline" onClick={() => voteFor(id)}>Проголосовать</button>
        }
    }
    return <section className="contests-winners contests-winners_without_bg contests-winners_users" style={{ marginTop: '100px', marginBottom: '100px' }}>
        <div className="container">
            <h3>{config.title}</h3>
            {config.items?.length > 0 ?<div className="fav-contests__list">
                {items.map((el, i) => {
                    return <div className="contests-winners__item">
                        <div className="contest-winners__item-inner" onClick={() => {
                            handleOpen(el, i)
                        }}>
                            <div className="contests-winners__image">
                                <img src={`https://mland.olit.su/${el.img}`} className=""  loading="lazy"/>
                                {el.is_winner == 1 && <div className="contests-winners__badge">ПОБЕДИТЕЛЬ</div>}
                            </div>
                            {el.name && <div className="contests-winners__name">{el.name}</div>}
                            {el.voites && <div className="contests-winners__votes">Голосов: {el.voites}</div>}
                        </div>
                        {!!el.button && renderButton(el.vote, el.id)}
                    </div>
                })}
            </div> : <div className="no-content">Пока не загружено ни одной работы</div>}
        </div>
        <Rodal visible={visible} onClose={() => handleClose()}>
            <div className="contests-modal">
                <div className="contests-modal__image">
                {item?.img && <img src={`https://mland.olit.su/${item.img}`} className="contests-modal__image-item" loading="lazy" />}
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
                        {item.name}
                    </div>
                    {item.voites && <div className="contest-modal__votes">
                        Голосов: {item.voites}
                    </div>}
                    {!!item.button && renderButton(item.vote, item.id)}
                </div>
            </div>
        </Rodal>
    </section>
}

export default ContestsUsers