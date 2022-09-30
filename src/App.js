import React, { useEffect, useState } from "react";
import Router from './jsx/core/router'
import useLocation from "wouter/use-location";

import Axios from "axios";
import { useLocalStorage } from "./jsx/core/utils";
import { Toaster } from 'react-hot-toast';
import ScrollToTop from "react-scroll-to-top";

function App() {
  const [location] = useLocation();
  const [data, setData] = useState([])
  const [city, setCity] = useLocalStorage('city', null);


  useEffect(() => {
    const params = {
      url: location
    }

    // if (location.includes('kzn')) {
    // setCity({ id: 1, name: "Казань" })
    // if (city) {
    //   params['id_city'] = 1
    // }
    //   Axios.get("/api/main", { params: params }).then(function (response) {
    //     if (response.data) {
    //       setData(response.data)
    //     }
    //   })
    // } else {
    //   if (city) {
    //     params['id_city'] = city.id
    //   }
    Axios.get(`/api${location == '/' ? '' : location}`).then(function (response) {
      if (response.data) {
        setData(response.data)
      }
    })
    // Axios.get(`/api/user/edit`).then(function (response) {
    //   if (response.data) {
        
    //   }
    // })
  }, [location])

  return (<>      
  {/* <ScrollToTop smooth color="#5ccf54" /> */}

    <div className="page">
      {Object.keys(data)?.length > 0 && <Router data={data} />}
    </div>
    <div><Toaster position="top-right"
      reverseOrder={false} /></div>
  </>
  );
}

export default App;
