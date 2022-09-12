import React from 'react';
import './index.scss';
import Rainbow from '../../../assets/images/rainbow.svg'
function Preloader(props) {

    return <section className="preloader">
        <div className="preloader__block">
            <img src={Rainbow} alt="" />
            <span>Подождите, идет загрузка</span>
        </div>
    </section>
}

export default Preloader