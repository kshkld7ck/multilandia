import React, { useEffect, useState } from 'react';
import { Link } from 'wouter';
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';

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

export default function RenderItem(el) {
    let now = +new Date();
    let configDate = +new Date(el.end)
    console.log('qwe', now > configDate)
    console.log('qwe', now)
    console.log('qwe', configDate)
    const [days, hours, minutes, seconds] = useCountdown(el.end);
    return <Link to={el.url} className="contests-carousel__item" key={el.id}>
        <img src={`https://mland.olit.su${el.image}`} className="contests-carousel__image" />
        {el.title && <div className="contests-carousel__title">{el.title}</div>}
        {el.text && <div className="contests-carousel__text">{el.text}</div>}
        {el.end && now < configDate && <div className="contests-carousel__counter">
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
        </div>}
    </Link>
}