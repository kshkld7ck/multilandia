import React from 'react';
import Header from './Header';
import Footer from './Footer';
import './index.scss';

function Layout(props) {
    return <>
        <Header data={props.data} />
        {props.children}
        <Footer data={props.data} />
    </>
}

export default Layout