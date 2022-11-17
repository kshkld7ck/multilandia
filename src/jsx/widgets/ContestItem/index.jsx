import React, { useState, useEffect } from 'react';
import './index.scss';
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import EventModal from './EventModal';
import Rodal from 'rodal';
import Foxy from '../../../assets/images/eventsuccess.svg'
const useCountdown = (targetDate) => {
    const countDownDate = new Date(targetDate).getTime();

    const [countDown, setCountDown] = useState(
        countDownDate - new Date().getTime()
    );

    useEffect(() => {
        const interval = setInterval(() => {
            setCountDown(countDownDate - new Date().getTime());
        }, 1000);

        return () => clearInterval(interval);
    }, [countDownDate]);

    return getReturnValues(countDown);
};

const getReturnValues = (countDown) => {
    // calculate time left
    const days = Math.floor(countDown / (1000 * 60 * 60 * 24));
    const hours = Math.floor(
        (countDown % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
    );
    const minutes = Math.floor((countDown % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((countDown % (1000 * 60)) / 1000);

    return [days, hours, minutes, seconds];
};

export { useCountdown };
function ContestItem({ config, data }) {
    const [days, hours, minutes, seconds] = useCountdown(config.date_end);
    const [visible, setVisible] = useState(false);
    const [successVisible, setSuccessVisible] = useState(false);
    const handleOpen = () => {
        setVisible(true);
    }

    const handleClose = () => { setVisible(false) }
    const handleSuccessClose = () => { setSuccessVisible(false) }
    const handleSuccess = () => {
        setSuccessVisible(true);
        handleClose()
    }

    let now = +new Date();
    let configDate = +new Date(config.date_end)
    // console.log('data', data.data.header.isLogged)
    return <seciton className="contest-item">
        <div className="container">
            <h3>{config.title}</h3>
            <div className="contest-item__content">
                {config.images?.length > 0 && <img src={`https://mland.olit.su${config.images[0]}`} className="contest-item__image" />}
                <div className="contest-item__time">
                    <div className="contests-carousel__counter">
                        {!config.status && <h4>Конкурс завершен</h4>}
                        <p>Прием работ: {config.date}</p>
                        {config.date_end && now < configDate && <><div className="contests-carousel__counter-items">
                            <div className="contests-carousel__counter-item">
                                <CircularProgressbar value={100 * days / 30} text={hours} className="circle-bar"
                                    styles={buildStyles({
                                        strokeLinecap: 'butt', pathColor: '#fff', trailColor: ' rgba(255, 255, 255, 0.2);', backgroundColor: '#000'
                                    })} />
                                <span>дн</span>
                            </div>
                            <div className="contests-carousel__counter-item">
                                <CircularProgressbar value={100 * hours / 24} text={hours} className="circle-bar"
                                    styles={buildStyles({
                                        strokeLinecap: 'butt', pathColor: '#fff', trailColor: ' rgba(255, 255, 255, 0.2);', backgroundColor: '#000'
                                    })} />
                                <span>ч</span>
                            </div>

                            <div className="contests-carousel__counter-item">
                                <CircularProgressbar value={100 * minutes / 60} text={minutes} className="circle-bar"
                                    styles={buildStyles({
                                        strokeLinecap: 'butt', pathColor: '#fff', trailColor: ' rgba(255, 255, 255, 0.2);', backgroundColor: '#000'
                                    })} />
                                <span>мин</span>
                            </div>
                            <div className="contests-carousel__counter-item">
                                <CircularProgressbar value={100 * seconds / 60} text={seconds} className="circle-bar"
                                    styles={buildStyles({
                                        strokeLinecap: 'butt', pathColor: '#fff', trailColor: ' rgba(255, 255, 255, 0.2);', backgroundColor: '#000'
                                    })} />
                                <span>сек</span>
                            </div>
                            {data.data.header.isLogged && <button className="btn btn_primary btn_outline" onClick={() => handleOpen()}>Принять участие</button>}
                        </div></>}
                    </div>
                </div>
            </div>
            <div className="contest-item__text" dangerouslySetInnerHTML={{ __html: config.text }} />
            <div className="event-modal__wrapper">
                {visible && <EventModal handleClose={() => handleClose()} handleSuccess={() => handleSuccess()} config={config} />}
            </div>
            <div className="success-event-modal__wrapper">
                {successVisible && <Rodal visible={true} onClose={() => handleSuccessClose()}>
                    {/* <img src={Foxy} className="success-event-modal__image" alt="" /> */}
                    <div className="event-modal">
                        <h3>Ваша заявка успешно отправлена</h3>
                    </div>
                </Rodal>}
            </div>
        </div>
    </seciton>
}

export default ContestItem