import React from 'react'
import {Accordion, Card, Col, Image, Row, useAccordionButton} from "react-bootstrap";
import AppLayout from "../component/AppLayout";
import RecommendAccount from "../component/RecommendAccount";
import FollowAccount from "../component/FollowAccount";
import {connect, useSelector} from "react-redux";
import wrapper from "../store/store-wrapper";
import axios from "axios";
import {LOAD_MY_PROFILE_REQUEST, LOAD_USER_REQUEST} from "../config/event/eventName/userEvent";
import {END} from "redux-saga";
import ContextAwareToggle from "../component/ContextAwareToggle";
import ThumbnailPostCard from "../component/ThumbnailPostCard";

const Profile = () => {

  const { user, myProfile } = useSelector(state => state.userReducer)

  return (
    <>
      <AppLayout/>
      <Row style={{marginTop: "-4%"}}>
        <Col>
          <div style={{maxHeight: "45%", maxWidth: "100%", overflow: "hidden"}}>
            <Image width="100%" src={"https://cdn.pixabay.com/photo/2019/08/01/12/36/illustration-4377408_960_720.png"}/>
          </div>
          <div style={{textAlign: "center"}}>
            <Image style={{marginTop: "-150px"}} width="200px" src={"http://localhost:8081/image/" + myProfile.profileImage} roundedCircle  />
            <h2>{myProfile.username}</h2>
          </div>
        </Col>
      </Row>
      <Row style={{marginLeft: "10px", marginTop: "-30%"}}>
        <Col lg={5}>
          <h3 className="ui header">Follwer / Following</h3>
          <div>
            <div className="ui segment" style={{overflowY: "scroll" , marginLeft: "-5px", height: "200px", overflowX: "hidden"}}>
              <div className="ui inverted dimmer">
                <div className="ui text loader">Loading</div>
              </div>
              <FollowAccount accounts={myProfile.follower} isFollower={true}/>
              <FollowAccount accounts={myProfile.followee} isFollower={false}/>
            </div>
          </div>
          <div style={{marginBottom: "20px", marginTop: "10px"}}>
            <h3 className="ui header">Friends</h3>
            <div className="ui segment" style={{overflowY: "scroll", marginLeft: "-5px", height: "200px", overflowX: "hidden", marginTop: "-3px"}}>
              <div className="ui inverted dimmer">
                <div className="ui text loader">Loading</div>
              </div>
              <FollowAccount accounts={myProfile.friend}/>
            </div>
          </div>
        </Col>
        <Col lg={7}>
          <Row style={{marginTop: "5%"}}>
            <Col>
              <Row>
                <Accordion defaultActiveKey="0">
                  <Accordion.Item eventKey="0">
                    <Accordion.Header><h3 className="ui header">내가 쓴 글</h3></Accordion.Header>
                    <Accordion.Body style={{padding: "2%"}}>
                      {myProfile.writePostAsAccount.map(v => <ThumbnailPostCard postInfo={v}/>)}
                    </Accordion.Body>
                  </Accordion.Item>
                  <Accordion.Item eventKey="1">
                    <Accordion.Header><h3 className="ui header">그룹이 쓴 글</h3></Accordion.Header>
                    <Accordion.Body>
                      <div style={{padding: "2%"}}>
                        {myProfile.writePostAsClan.map(v => <ThumbnailPostCard postInfo={v}/>)}
                      </div>
                    </Accordion.Body>
                  </Accordion.Item>
                </Accordion>
              </Row>
            </Col>
          </Row>

          <Row>
            <Col>
            </Col>
          </Row>

        </Col>
      </Row>
    </>
  )
}

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

    const user = await axios.get("http://localhost:8081/user").then(res => res.data)

    if(user !== null) {
      console.log("asdfasdf"+user.username)
      store.dispatch({
        type: LOAD_MY_PROFILE_REQUEST,
        params: {
          username: user.username
        }
      });
    } else {
      res.writeHead(302, { // or 301
        Location: "http://localhost:3000/login",
      });
      res.end();
    }

    store.dispatch(END);
    await store.sagaTask.toPromise();
  }
);

export default connect(state => state)(Profile);