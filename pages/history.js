import React, {useState} from 'react'
import AppLayout from "../component/AppLayout";
import wrapper from "../store/store-wrapper";
import axios from "axios";
import {LOAD_USER_REQUEST} from "../config/event/eventName/userEvent";
import {LOAD_ALL_POST_REQUEST} from "../config/event/eventName/postEvent";
import {END} from "redux-saga";
import {connect, useSelector} from "react-redux";
import {Badge, Button, ListGroup} from "react-bootstrap";

const history = () => {
  const { user } = useSelector(state => state.userReducer)

  return(
    <AppLayout>
      <div>
        <Button style={{width: "100px", marginTop: "10%"}} variant="primary">
          History <Badge bg="secondary">{user.history.length}</Badge>
          <span className="visually-hidden">unread messages</span>
        </Button>
        <ListGroup style={{marginTop: "2%"}}>
          {user.history.map(v => {
            return (
              <ListGroup.Item>{v}</ListGroup.Item>
            )
          })}
        </ListGroup>
      </div>
    </AppLayout>
  )
}

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
      }
    }

    store.dispatch(END);
    await store.sagaTask.toPromise();
  }
);

export default connect(state => state)(history);