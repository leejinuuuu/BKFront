import React, {useCallback, useEffect, useLayoutEffect, useState} from 'react';
import axios from "axios";
import {GET_RECOMMEND_ACCOUNT_REQUEST, LOAD_USER_REQUEST} from "../config/event/eventName/userEvent";
import {END} from "redux-saga";
import wrapper from "../store/store-wrapper";
import {connect, useDispatch, useSelector} from "react-redux";
import {useRouter} from "next/router";
import Router from 'next/router'
import AppLayout from "../component/AppLayout";
import {Col, Image, Row} from "react-bootstrap";
import RecommendAccount from "../component/RecommendAccount";
import Post from "../component/Post";
import {LOAD_ALL_POST_REQUEST} from "../config/event/eventName/postEvent";
import useWindowSize from "../utils/useWindowSize";
import {useCookies} from "react-cookie";
import {useSession} from "next-auth/client";

const home = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const [cookies, setCookie] = useCookies(['user']);
  const [session, loadingSession] = useSession();

  const [width, height] = useWindowSize();

  const { user, LoadingUserError} = useSelector(state => state.userReducer)

  if (session) {
    if(LoadingUserError) {
      router.push("/signup?google="+ session.user.name)
    }

    dispatch({
      type: LOAD_USER_REQUEST,
      params: {
        username: session.user.name,
        email: session.user.email
      }
    })
  }

  return (
    <div>
      <AppLayout>
        <Row style={{marginTop: "5%"}}>
          <Post/>
        </Row>
      </AppLayout>
      {
        width > 1400 && user !== null && user !== "" ?
          <div style={{position: "fixed", top: "10%", left: "6%"}}>
            <div style={{marginLeft: "30px"}}>추천</div>
            <RecommendAccount accounts={user.recommends}/>
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

      if(cookie.includes("accessToken")) {
        store.dispatch({
          type: LOAD_USER_REQUEST,
          params: {
            username: "None",
            email: "None",
          }
        });

        store.dispatch({
          type: LOAD_ALL_POST_REQUEST,
          params: {
            offset: 0,
            limit: 10
          }
        });
      }
    }

    store.dispatch(END);
    await store.sagaTask.toPromise();
  }
);


export default connect(state => state)(home);