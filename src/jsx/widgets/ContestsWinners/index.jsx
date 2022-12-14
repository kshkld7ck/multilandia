import React, { useState } from 'react';
import Slider from 'react-slick';
import { Link } from 'wouter';
import './index.scss';
import 'rodal/lib/rodal.css';
import Rodal from 'rodal';
import Arrow from '../../../assets/images/arrow.svg';

function ContestsWinners({ config }) {
    const [item, setItem] = useState({});
    const [visible, setVisible] = useState(false);
    console.log('www')
    const [itemIndex, setItemIndex] = useState(0);
    const handleOpen = (item, index) => {
        setVisible(true);
        setItem(item)
        setItemIndex(index)
        console.log(index, "old", "new", config.items?.length)
    }
    const handleClose = () => { setVisible(false) }
    const settings = {
        infinite: true,
        speed: 500,
        arrow: true,

        slidesToScroll: 1,
        slidesToShow: 6,
        // centerPadding: "30px",
        responsive: [
            {
                breakpoint: 1800,
                settings: {
                    slidesToShow: 5,
                    slidesToScroll: 1,
                }
            },
            {
                breakpoint: 991,
                settings: {
                    slidesToShow: 4,
                    slidesToScroll: 1,
                }
            },
            {
                breakpoint: 767,
                settings: {
                    slidesToShow:3 ,
                    slidesToScroll: 1,
                }
            },
            {
                breakpoint: 500,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 1,
                }
            },
            {
                breakpoint: 400,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                }
            },
        ]
    };
    return <>
        <section className="contests-winners">
            <div className="container">
                <h3>{config.title}</h3>
                {config.items?.length > 0 ? <Slider {...settings}>
                    {config.items.map((el, i) => {
                        return <div onClick={() => {
                            handleOpen(el, i)
                        }} className="contests-winners__item">
                            <div className="contests-winners__image">
                                <img src={`https://mland.olit.su/${el.img}`} className=""  loading="lazy"/>
                                <div className="contests-winners__badge">????????????????????</div>
                            </div>
                            {el.name && <div className="contests-winners__name">{el.name}</div>}
                            {el.voites && <div className="contests-winners__votes">??????????????: {el.voites}</div>}
                        </div>
                    })}
                </Slider> : <div className="no-content">???????? ???? ?????????????????? ???? ?????????? ????????????</div>}
                <div className="contests-winners__footer">
                    <div className={`btn btn_outline btn_hidden`}><span>"????????????"</span></div>
                </div>
            </div>
            <Rodal visible={visible} onClose={() => handleClose()}>
                <div className="contests-modal">
                    <div className="contests-modal__image">
                        {item?.img && <img src={`https://mland.olit.su/${item.img}`} className="contests-modal__image-item" loading="lazy" />}
                        <div className="contests-modal__badge">????????????????????</div>

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
                            ??????????????: {item.voites}
                        </div>}
                    </div>
                </div>
            </Rodal>
        </section>

    </>
}

export default ContestsWinners