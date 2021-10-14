import React, {useCallback, useEffect, useLayoutEffect, useState} from 'react';
import axios from "axios";
import {LOAD_USER_REQUEST} from "../config/event/eventName/userEvent";
import {END} from "redux-saga";
import wrapper from "../store/store-wrapper";
import {connect, useDispatch, useSelector} from "react-redux";
import {useRouter} from "next/router";
import AppLayout from "../component/AppLayout";
import {Col, Image, Row} from "react-bootstrap";
import RecommendAccount from "../component/RecommendAccount";
import Post from "../component/Post";
import PostModal from "../component/PostModal";
import {LOAD_ALL_POST_REQUEST} from "../config/event/eventName/postEvent";
import PreferenceCard from "../component/PreferenceCard";
import useWindowSize from "../utils/useWindowSize";

const home = () => {
  const [width, height] = useWindowSize();

  return (
    <div>
      <AppLayout>
        <Row style={{marginTop: "5%"}}>
          <Post/>
        </Row>
      </AppLayout>
      {
        width > 1400 ?
          <div style={{position: "fixed", top: "10%", left: "6%"}}>
            <div style={{marginLeft: "30px"}}>추천</div>
            <RecommendAccount/>
          </div> : null
      }
    </div>
  )
};

export const getServerSideProps = wrapper.getServerSideProps(store =>
  async ({ req, res, ...etc}) => {
    const cookie = req ? req.headers.cookie : '';
    axios.defaults.headers.Cookie = '';
    axios.defaults.withCredentials = true;

    if (req && cookie) {
      axios.defaults.headers.Cookie = cookie;

      if(cookie.includes("access_token")) {
        store.dispatch({
          type: LOAD_USER_REQUEST
        });

        store.dispatch({
          type: LOAD_ALL_POST_REQUEST
        });
      }
    }

    store.dispatch(END);
    await store.sagaTask.toPromise();
  }
);


export default connect(state => state)(home);