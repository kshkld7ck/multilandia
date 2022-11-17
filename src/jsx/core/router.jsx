import React from "react";
import { Route } from "wouter";
import Layout from "../layouts";
import Widgets from '../widgets'

function Router(data) {
    return (
        <>
            <Layout data={data}>
                {data?.data?.widgets?.map((el) => {
                    const Component = Widgets[el.kind];
                    if (Component) {
                        return <Component config={el} data={data} />
                    }
                    return null
                })}
            </Layout>
        </>
    )

}
export default Router