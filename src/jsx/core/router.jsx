import React from "react";
import Layout from "../layouts";
import Widgets from '../widgets'

function Router(data) {
    return (
        <>
            <Layout data={data}>
                {data?.data?.widgets.map((el) => {
                    const Component = Widgets[el.id];
                    if (Component) {
                        return <Component config={el} />
                    }
                    return null
                })}
            </Layout>
        </>
    )

}
export default Router