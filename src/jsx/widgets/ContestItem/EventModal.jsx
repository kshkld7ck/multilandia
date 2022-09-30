import React, { useState } from 'react';
import './index.scss';
import Rodal from 'rodal';
import { FileUploader } from "react-drag-drop-files";
import Axios from 'axios';
import toast from 'react-hot-toast';
import Form from 'react-bootstrap/Form';

function EventModal(props) {
    const { visible, handleClose, handleSuccess, config } = props;
    const [file, setFile] = useState(null);
    const [checked, setChecked] = useState(true)
    const [items, setItems] = useState({
        "name": {
            label: "Имя и Фамилия ребенка*",
            value: "",
            as: 'input',
            type: 'text',
        },
        "email": {
            label: "Email*",
            value: "",
            as: 'input',
            type: 'email',
        },
        "text": {
            label: "Описание работы*",
            value: "",
            as: 'textarea',
            type: 'text',
        }
    })
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
        data.append('id', config.id_contest)
        if (file) {
            data.append('file', file[0])
        } else {
            toast.error("Добавьте фото работы");
            return
        }

        // const formData = new FormData()
        Axios.post(`/api/contests/set`, data, headers)
            .then(res => {
                console.log(res.data);
                toast.success("Заявка отправлена")
                handleSuccess()

            })
    }
    const handleChange = (value, name, as, type, label) => {
        let newItems = items;

        newItems[name] = {
            label: label,
            value: value,
            as: as,
            type: type,
        }
        setItems(newItems)
    }
    const handleFileChange = (item) => {
        setFile(item);
        console.log('file', file)
    };
    return <Rodal visible={true} onClose={() => handleClose()}>
        <div className="event-modal">

            <h3>{config.title}</h3>
            <div className="event-modal__form">
                {Object.entries(items).map((el, i) => {
                    return <Form.Group className="event-modal__item" controlId={`${el[0]}`}>
                        {el[1].label && <Form.Label>{el[1].label}</Form.Label>}

                        <Form.Control required as={el[1].as} type={el[1].type} defaultValue={el[1].value} onChange={(e) => handleChange(e.target.value, el[0], el[1].as, el[1].type, el[1].label)} />

                    </Form.Group>
                })}
                {/* <Form.Group className="event-modal__item" controlId={`file`}> */}
                <Form.Label>Фото работы*</Form.Label>

                <FileUploader
                    multiple={true}
                    handleChange={handleFileChange}
                    name="file"
                    types={["JPEG", "JPG", "PNG", "GIF"]}
                    label="Выберите файл или перетащите сюда"
                />
                <p>{file && `Выбранный файл: ${file[0]?.name}`}</p>


                <div className="form-checkbox"><Form.Check
                    inline
                    name={'checked'}
                    type="checkbox"
                    value={checked}
                    defaultChecked={checked}
                    id={`checked`}
                    onChange={e => setChecked(e.target.checked)}
                />
                    <label htmlFor="checked"  className="form-check-label">
                        Нажимая кнопку “Отправить” вы соглашаетесь с <a>правилами конкурса</a>
                    </label>
                </div>
                <button className="btn btn_primary btn_outline" disabled={!checked} onClick={() => handleSubmit()}>Отправить</button>
            </div>
        </div>
    </Rodal>
}

export default EventModal