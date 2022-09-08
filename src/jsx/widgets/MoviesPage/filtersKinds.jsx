import React from 'react';
import './filters.scss'
import Form from 'react-bootstrap/Form';

function CheckboxComponent(props) {
    return <div className="filters__item-wrapper">
        {props.items.map((el, i) => {
            return <Form.Check
                inline
                label={el}
                name={props.name}
                type="checkbox"
                value={el}
                id={`filter-${props.name}-${i}`}
            />
        })}

    </div>
}
function RadioComponent(props) {
    return <div className="filters__item-wrapper">
        {props.items.map((el, i) => {
            return <Form.Check
                inline
                label={el.title}
                name={props.name}
                type="radio"
                value={el.value}
                id={`filter-${props.name}-${i}`}
            />
        })}

    </div>
}

function InputComponent(props) {
    return <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>Email address</Form.Label>
        <Form.Control type="email" placeholder="Enter email" />
        <Form.Text className="text-muted">
            We'll never share your email with anyone else.
        </Form.Text>
    </Form.Group>
}

function FiltersKinds(props) {
    console.log(props)
    if (props.value.type == 'checkbox') {
        return CheckboxComponent(props.value)
    } else if (props.value.type == 'radio') {
        return RadioComponent(props.value)
    } 

    return null
}

export default FiltersKinds