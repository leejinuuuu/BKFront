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
import {LOAD_ALL_POST_REQUEST, LOAD_TOP20_LIKED_POST_REQUEST} from "../config/event/eventName/postEvent";
import {useSession} from "next-auth/client";

const home = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const [session, loadingSession] = useSession();
  const [width, setWidth] = useState(true);
  const [postOffset, setPostOffset] = useState(1);

  const { user, LoadingUserError} = useSelector(state => state.userReducer)

  const handleResize = () => {
    if(window.innerWidth > 1400 && !width) {
      setWidth(true);
    } else if(width && window.innerWidth < 1400) {
      setWidth(false);
    }
  }


  const onScroll = () => {
    let temp = window.scrollY + document.documentElement.clientHeight === document.documentElement.scrollHeight
    if(temp) {
      setPostOffset(postOffset + 1)
      dispatch({
        type: LOAD_ALL_POST_REQUEST,
        params: {
          offset: postOffset,
          limit: 9
        }
      })
    }
  }

  useEffect(() => {
    window.addEventListener('scroll', onScroll);
    return () => {
      window.removeEventListener('scroll', onScroll);
    };
  }, [postOffset]);

  useEffect(() => {
    window.addEventListener('resize', handleResize)

    if(window.innerWidth > 1400) setWidth(true);
    else setWidth(false)

    return () => {
      window.removeEventListener('resize', handleResize)
    }
  }, [width, session])

  return (
    <div>
      <AppLayout>
        <Row style={{marginTop: "2%"}}>
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
    if (req) {
      if (cookie) {
        axios.defaults.headers.Cookie = cookie;

        const cookieMap = new Map()
        cookie.split("; ").map(v => v.split("=")).map(v => {
          cookieMap.set(v[0], v[1])
        })
        if(cookieMap.get("SUID")) {
          store.dispatch({
            type: LOAD_USER_REQUEST
          });
        }
      }
      store.dispatch({
        type: LOAD_ALL_POST_REQUEST,
        params: {
          offset: 0,
          limit: 9,
          type: "image"
        }
      });

      store.dispatch({
        type: LOAD_TOP20_LIKED_POST_REQUEST
      })
    }
    store.dispatch(END);
    await store.sagaTask.toPromise();
  }
);

export default home;