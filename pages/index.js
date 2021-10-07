import React, {useCallback, useEffect, useState} from 'react';
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

const home = () => {
  return (
      <div>
        <AppLayout>
          <Row style={{marginTop: "5%"}}>
            <Col xs={"9"} >
              <Post/>
            </Col>
            <Col xs={"3"} style={{marginLeft: "-15px"}}>
              <div style={{marginLeft: "30px"}}>추천</div>
              <RecommendAccount/>
            </Col>
          </Row>
        </AppLayout>
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
    }
    store.dispatch({
        type: LOAD_USER_REQUEST
    });

    store.dispatch({
      type: LOAD_ALL_POST_REQUEST
    });

    store.dispatch(END);
    await store.sagaTask.toPromise();
  }
);


export default connect(state => state)(home);