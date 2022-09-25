import React from 'react';
import './index.scss';
import Rodal from 'rodal';
import 'rodal/lib/rodal.css';
import Vk from '../../../assets/images/vkAuth.svg'


function AuthModal(props) {
    const { visible, onClose, header } = props;
    return <Rodal visible={visible} onClose={() => onClose()}>
        <div className="auth-modal__content">
            <h3>{header.auth_title} </h3>
            {header.auth_description && <p>{header.auth_description}</p>}
            <div className="auth-modal__links">
                <a href="https://mland.olit.su/api/user/vk"><img src={Vk} alt="" /></a>
            </div>
            {header.auth_subdescription && <p className="auth-modal__sub">{header.auth_subdescription}</p>}
        </div>

    </Rodal>
}

export default AuthModal