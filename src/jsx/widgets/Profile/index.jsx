import React, { useEffect, useState } from 'react';
import './index.scss';
import Form from 'react-bootstrap/Form';
import EditIcon from '../../../assets/images/edit.svg'
import Axios from 'axios';
import toast from 'react-hot-toast';
import { useLocation } from "wouter";

function Profile({ config }) {
    const [items, setItems] = useState(config.items);
    const [avatar, setAvatar] = useState(config.avatar);
    const [location, setLocation] = useLocation();

    const handleChange = (value, itemName, title) => {
        let newItems = items;

        newItems[itemName] = {
            title: title,
            value: value
        }
        setItems(newItems)
    }

    // useEffect(() => {
    //     setAvatar(config.avatar)
    // }, [config])
    const handleSubmit = () => {
        let data = new FormData()
        let headers = {
            headers: {
                enctype: "application/x-www-form-urlencoded"
            }
        }
        Object.entries(items).map((el) => {
            // data[el[0]] = el[1].value
            data.append(el[0], el[1].value)
        })
        // const formData = new FormData()
        Axios.post(`/api/user/edit`, data, headers)
            .then(res => {
                console.log(res.data);
                toast.success("Данные изменены")

            })
    }

    const changeAvatar = (event) => {
        let headers = {
            headers: {
                enctype: "application/x-www-form-urlencoded"
            }
        }
        console.log(event.target.files[0])
        const data = new FormData()
        data.append('file', event.target.files[0])
        Axios.post(`/api/user/change-avatar`, data, headers)
            .then(res => {
                // if (res.data?.img) {
                toast.success("Аватар изменен")
                setAvatar(res.data?.img)
                // }
            }).catch(err => {
                toast.error("Произошла ошибка")
            })
    }

    const logOut = () => {
        Axios.get(`/api/user/logout`)
            .then(res => {
                if (res.data) {
                    setLocation('/')
                }
            }).catch(err => {
                toast.error("Произошла ошибка")
            })
    }
    return <section className="profile">
        <div className="container">
            <div className="profile__content">
                <div className="profile__image">

                    <img src={`https://mland.olit.su/${avatar}`} className="profile__image-item" />
                    <label htmlFor="avatar"><img src={EditIcon} alt="" className="profile__image-file" /></label>
                    <input type="file" id="avatar" onChange={(event) => changeAvatar(event)} />
                </div>
                <div className="profile__info">
                    <div className="profile__info-items">
                        {Object.entries(items).map((el, i) => {
                            console.log('el', el[1])
                            return <Form.Group className="profile__info-item" controlId={`${el[1].title}_${i}`}>
                                {el[1].title && <Form.Label>{el[1].title}</Form.Label>}

                                <Form.Control type="text" placeholder={el[1].title} defaultValue={el[1].value} onChange={(e) => handleChange(e.target.value, el[0], el[1].title)} />
                                <img onClick={() => handleSubmit()} src={EditIcon} alt="" className="form-control__icon" />
                            </Form.Group>
                        })}
                    </div>
                    <button className="btn btn_white btn_outline" onClick={()=> logOut()}>Выйти из профиля</button>
                </div>

            </div>

        </div>
    </section>
}

export default Profile