
import App from 'next/app';

import 'bootstrap/dist/css/bootstrap.min.css';
import {GET_LOGIN_PLATFORM_REQUEST} from "../config/event/eventName/userEvent";

import wrapper from '../store/store-wrapper'

function str_obj(str) {
    let result = {};
    str = str.split('; ');
    for (let i = 0; i < str.length; i++) {
        let cur = str[i].split('=');
        result[cur[0]] = cur[1];
    }
    return result;
}

class MyApp extends App {
    static getInitialProps = wrapper.getInitialAppProps(store => async ({Component, ctx}) => {

        if(
            !ctx.req.url.includes("login") &&
            !ctx.req.url.includes("signup")
        ) {
            store.dispatch({
                type: GET_LOGIN_PLATFORM_REQUEST,
                data: str_obj(ctx.req.headers.cookie)["platform"]
            })
        }

        return {
            pageProps: {
                // Call page-level getInitialProps
                // DON'T FORGET TO PROVIDE STORE TO PAGE
                ...(Component.getInitialProps ? await Component.getInitialProps({...ctx, store}) : {}),
                // Some custom thing for all pages
                pathname: ctx.pathname,
            },
        };

    });

    render() {
        const {Component, pageProps} = this.props;

        return (
            <Component {...pageProps} />
        );
    }
}

export default wrapper.withRedux(MyApp);