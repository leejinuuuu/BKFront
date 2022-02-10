import App from 'next/app';

import 'bootstrap/dist/css/bootstrap.min.css';
import 'semantic-ui-css/semantic.min.css'
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import wrapper from '../store/store-wrapper'

import "../css/scrollbar.css"
import {SSRProvider} from "react-bootstrap";
import {CookiesProvider} from "react-cookie";
import { Provider } from "next-auth/client"

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
          <Provider session={pageProps.session}>
            <Component {...pageProps} />
          </Provider>
        </SSRProvider>
      </CookiesProvider>
    );
  }
}

export default wrapper.withRedux(MyApp);