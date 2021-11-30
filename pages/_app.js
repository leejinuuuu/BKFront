
import App from 'next/app';

import 'bootstrap/dist/css/bootstrap.min.css';
import 'semantic-ui-css/semantic.min.css'

import wrapper from '../store/store-wrapper'

import "../css/scrollbar.css"
import {SSRProvider} from "react-bootstrap";
import {CookiesProvider} from "react-cookie";

function str_obj(str) {
  let result = {};
  if(str) {
    str = str.split('; ');
    for (let i = 0; i < str.length; i++) {
      let cur = str[i].split('=');
      result[cur[0]] = cur[1];
    }
    return result;
  } else {
    return "";
  }
}

class MyApp extends App {
  static getInitialProps = wrapper.getInitialAppProps(store => async ({Component, ctx}) => {

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
      <CookiesProvider>
        <SSRProvider>
          <Component {...pageProps} />
        </SSRProvider>
      </CookiesProvider>
    );
  }
}

export default wrapper.withRedux(MyApp);