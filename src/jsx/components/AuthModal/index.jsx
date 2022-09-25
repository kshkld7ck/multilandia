import React from 'react';
import './index.scss';
import Rodal from 'rodal';
import 'rodal/lib/rodal.css';
import Vk from '../../../assets/images/vkAuth.svg'


function AuthModal(props) {
    const { visible, onClose } = props;
    return <Rodal visible={visible} onClose={() => onClose()}>
        <div className="auth-modal__content">
            <h3>Вход в личный кабинет </h3>
            <p>Для входа используйте социальные сети</p>
            <div className="auth-modal__links">
                <a href="https://mland.olit.su/api/user/vk"><img src={Vk} alt="" /></a>
            </div>
        </div>

    </Rodal>
}

export default AuthModal