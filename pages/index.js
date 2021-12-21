import React, {useEffect, useState} from 'react';
import axios from "axios";
import {LOAD_USER_REQUEST} from "../config/event/eventName/userEvent";
import {END} from "redux-saga";
import wrapper from "../store/store-wrapper";
import {connect, useDispatch, useSelector} from "react-redux";
import {useRouter} from "next/router";
import AppLayout from "../component/AppLayout";
import {Row} from "react-bootstrap";
import RecommendAccount from "../component/RecommendAccount";
import Post from "../component/Post";
import {LOAD_ALL_POST_REQUEST} from "../config/event/eventName/postEvent";
import {useSession} from "next-auth/client";

const home = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const [session, loadingSession] = useSession();
  const [width, setWidth] = useState(true);

  const { user, LoadingUserError} = useSelector(state => state.userReducer)

  const handleResize = () => {
    console.log(width, window.innerWidth)
    if(window.innerWidth > 1400 && !width) {
      setWidth(true);
    } else if(width && window.innerWidth < 1400) {
      setWidth(false);
    }
  }

  useEffect(() => {
    window.addEventListener('resize', handleResize)

    if(window.innerWidth > 1400) setWidth(true);
    else setWidth(false)

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
    return () => {
      window.removeEventListener('resize', handleResize)
    }
  }, [width, session])

  return (
    <div>
      <AppLayout>
        <Row style={{marginTop: "5%"}}>
          <Post/>
        </Row>
      </AppLayout>
      {
        width && user !== null && user !== "" ?
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
      }

      store.dispatch({
        type: LOAD_ALL_POST_REQUEST,
        params: {
          offset: 0,
          limit: 10
        }
      });
    }
    store.dispatch(END);
    await store.sagaTask.toPromise();
  }
);


export default connect(state => state)(home);