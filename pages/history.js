import React from 'react'
import AppLayout from "../component/AppLayout";
import wrapper from "../store/store-wrapper";
import axios from "axios";
import {LOAD_USER_REQUEST} from "../config/event/eventName/userEvent";
import {END} from "redux-saga";
import {useSelector} from "react-redux";
import {Badge, Button, ListGroup} from "react-bootstrap";
import Link from 'next/link'

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
              <Link href={"/post/" + v.postId}>
                <ListGroup.Item style={{cursor: "pointer"}}>{v.content + "/" + v.createdAt}</ListGroup.Item>
              </Link>

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
      store.dispatch({
        type: LOAD_USER_REQUEST,
        params: {
          username: "None",
          email: "None",
        }
      });
    }
    store.dispatch(END);
    await store.sagaTask.toPromise();
  }
);

export default history;