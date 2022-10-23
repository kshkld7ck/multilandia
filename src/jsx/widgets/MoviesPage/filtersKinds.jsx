import React from 'react';
import './filters.scss'
import Form from 'react-bootstrap/Form';

function CheckboxComponent(value, handler, activeFilters) {
    return <div className="filters__item-wrapper">
        {value.items.map((el, i) => {

            return <Form.Check
                inline
                label={el.val}
                name={value.name}
                type="checkbox"
                value={el.id}
                checked={activeFilters[value.name]?.includes("" + el.id)}
                onChange={(e) => handler(e)}
                id={`filter-${el.id}-${i}`}
            />
        })}

    </div>
}
function RadioComponent(value, handler, activeFilters) {
    return <div className="filters__item-wrapper">
        {value.items.map((el, i) => {
            return <Form.Check
                inline
                label={el.title}
                name={value.name}
                type="radio"
                value={el.value}
                checked={activeFilters[value.name] == el.value}
                onChange={(e) => handler(e)}
                id={`filter-${value.name}-${i}`}
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

    if (props.value.type == 'checkbox') {
        return CheckboxComponent(props.value, (event) => props.handleChange(event), props.activeFilters)
    } else if (props.value.type == 'radio') {
        return RadioComponent(props.value, (event) => props.handleChange(event), props.activeFilters)
    }

    return null
}

export default FiltersKinds