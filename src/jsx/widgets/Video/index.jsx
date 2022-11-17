import React from 'react';
import './index.scss';

function VideoWidget({ config }) {
    return <section className="video-page">
        <div className="container">
            <h3>{config.title}</h3>
            {/* <div className="video-page__content"> */}

                {/* <img src={`https://mland.olit.su${config.image}`} alt=""/> */}
                <iframe src={config.embed} frameborder="0"></iframe>
            {/* </div> */}
        </div>
    </section>
}

export default VideoWidget